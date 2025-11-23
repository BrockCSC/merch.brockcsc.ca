import { processPayment } from './payments';
import { writeOrderToDB } from './data';
import { sendConfirmationEmail } from './mailer';
import { type Env, Color, Size } from './types';
import Stripe from 'stripe';

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://brockcsc.ca',
  'https://volunteer.brockcsc.ca',
  'http://localhost:8000',
];

async function handleWebhook(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !env.WEBHOOK_SECRET) {
    return new Response('Bad request', { status: 400 });
  }

  const stripe = new Stripe(env.PAYMENT_API_KEY, {
    apiVersion: '2025-10-29.clover',
  });

  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      env.WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return new Response('Webhook error', { status: 400 });
  }

  console.log('Received webhook event:', event.type);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const metadata = paymentIntent.metadata;
    console.log(
      'Processing payment_intent.succeeded for:',
      paymentIntent.id,
      'Metadata:',
      metadata
    );

    const orderData = {
      name: metadata.name,
      email: metadata.email,
      studentId: parseInt(metadata.studentId),
      color: metadata.color as Color,
      size: metadata.size as Size,
      paymentId: paymentIntent.id,
    };

    const order = await writeOrderToDB(orderData, env);
    await sendConfirmationEmail(order, env);

    console.log('Order created and email sent for payment:', paymentIntent.id);
  }

  return new Response('OK', { status: 200 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/webhook') {
      return handleWebhook(request, env);
    }

    //CORS preflight
    if (request.method == 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    //POST only
    if (request.method != 'POST') {
      return new Response(
        JSON.stringify({ success: false, message: 'Method Not Allowed' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    //Allowed origin
    const referer = request.headers.get('Referer') || '';
    if (!ALLOWED_ORIGINS.some((o) => referer.startsWith(o))) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid origin' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    //Parse JSON
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid JSON' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    try {
      //process payment
      const payment = await processPayment(data, env);

      return new Response(
        JSON.stringify({
          success: true,
          clientSecret: payment.clientSecret,
          paymentId: payment.paymentId,
          message: 'Payment intent created',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          success: false,
          message: err.message || 'Something went wrong',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }
  },
};
