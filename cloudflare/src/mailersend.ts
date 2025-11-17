import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import * as dotenv from "dotenv";

dotenv.config();

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY!, 
});

const sentFrom = new Sender(
  "MS_9P6ggf@test-p7kx4xw9w32g9yjr.mlsender.net",
  "brockcsc"
);

const recipientEmail = "jayshah3616@gmail.com";

const recipients = [
  new Recipient(recipientEmail, "Your Client"),
];

const personalization = [
  {
    email: recipientEmail,
    data: {
      name: "Jay",
      paymentId: "999",
    },
  },
];


const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("This is a Subject")
  .setTemplateId("o65qngkm01dlwr12")
  .setPersonalization(personalization);

export async function sendMail() {
  console.log("Sending email...");
  await mailerSend.email.send(emailParams);
  console.log("Email sent!");
}

// ✅ Automatically run the function
(async () => {
  try {
    await sendMail();
  } catch (err) {
    console.error("Error sending mail:", err);
  }
})();
