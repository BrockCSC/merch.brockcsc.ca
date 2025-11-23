// author: Jay
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { type Order, type Env } from './types';

export async function sendConfirmationEmail(
  order: Order,
  env: Env
): Promise<boolean> {
  if (!env.MAIL_API_KEY) {
    console.error('MAIL_API_KEY is not set. Cannot send email.');
    return false;
  }

  const mailerSend = new MailerSend({
    apiKey: env.MAIL_API_KEY,
  });

  const sentFrom = new Sender(env.SENDER_EMAIL, env.SENDER_NAME);
  const recipients = [new Recipient(order.email, order.name)];

  // These keys (e.g., 'name', 'student_id') must match the variables in your template.
  const personalization = [
    {
      email: order.email,
      data: {
        name: order.name,
        student_id: order.studentId,
        color: order.color,
        size: order.size,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('BrockCSC Merch Order Confirmation')
    .setTemplateId(env.TEMPLATE_ID)
    .setPersonalization(personalization);

  try {
    await mailerSend.email.send(emailParams);
    console.log(`Confirmation email sent successfully to ${order.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
}
