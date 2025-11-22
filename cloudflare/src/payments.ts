import Stripe from  'stripe';
import {type Env} from './types'

interface paymentInput{
    email: string;
    name: string;
    
}

interface PaymentOutput{
    clientSecret: string;
    paymentId: string;
}

//temp variable
const HOODIE_PRICE_IN_CENTS = 6000; // $60.00 



export async function processPayment(
    data: paymentInput,
    env: Env
): Promise<PaymentOutput>{
    if(!env.PAYMENT_API_KEY){
        throw new Error("PAYMENT_API_KEY env variable is not set.")
    }


const stripe = new Stripe(env.PAYMENT_API_KEY, {
    apiVersion: '2025-10-29.clover',
});

try{
    //1: creating customer
    const customer = await stripe.customers.create({
        name: data.name,
        email: data.email,
    });



    // 2. Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: HOODIE_PRICE_IN_CENTS,
        currency: 'cad',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    if(!paymentIntent.client_secret) {
        throw new Error("Failed to create Payment Intent: client_secret is null.");
    }

    console.log(`Success : ${paymentIntent.id} for customer: ${customer.id}`)

    return {
        clientSecret: paymentIntent.client_secret,
        paymentId: paymentIntent.id,
    };
    
} catch (error: any){
    console.error(" Stripe Api error: ", error.message);
    throw new Error("Payment proccessing failed.");
}

}
