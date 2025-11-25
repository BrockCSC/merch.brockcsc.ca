import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

//* DISREGARD COMMENTED CODE PUSHED TO REPO IN ORDER TO PULL TO GET THE REACT CONTEXT FUNCTIONALITY

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "Something went wrong");
    } else {
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="text-[#aa3b3b] font-bold">Payment Information</h1>
        <div className="shadow border rounded-md p-3 bg-white">
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>

        <button
          id="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full text-white bg-[#aa3b3b] p-4 rounded-3xl cursor-pointer hover:bg-[#922f2f] transition"
        >
          Complete Order
        </button>
        {message && <div>{message}</div>}
      </div>
    </form>
  );
}
