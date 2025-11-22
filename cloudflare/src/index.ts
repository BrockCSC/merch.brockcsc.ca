import { processPayment } from "./payments";
import { writeOrderToDB } from "./data";
import { sendConfirmationEmail } from "./mailer";
import { type Env } from "./types";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://brockcsc.ca",
  "https://volunteer.brockcsc.ca",
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    //CORS preflight
    if (request.method == "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    //POST only
    if (request.method != "POST") {
      return new Response(
        JSON.stringify({ success: false, message: "Method Not Allowed" }),
        { status: 405 }
      );
    }

    //Allowed origin
    const referer = request.headers.get("Referer") || "";
    if (!ALLOWED_ORIGINS.some((o) => referer.startsWith(o))) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid origin" }),
        { status: 403 }
      );
    }

    //Parse JSON
    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid JSON" }),
        { status: 400 }
      );
    }

    try {
      //process payment
      const payment = await processPayment(data, env);
      //write order to DB
      const order = await writeOrderToDB(
        { ...data, paymentId: payment.paymentId },
        env
      );
      //send confirmation email
      await sendConfirmationEmail(order, env);

      return new Response(
        JSON.stringify({
          success: true,
          orderId: order._id.toString(),
          message: "Order complete",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          success: false,
          message: err.message || "Something went wrong",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};
