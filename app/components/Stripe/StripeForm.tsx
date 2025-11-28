import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message ?? 'Something went wrong');
    }
    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-[#aa3b3b]">
          Payment Information
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        id="submit"
        disabled={isLoading || !stripe || !elements}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 text-white font-semibold shadow-md transition 
          ${
            isLoading
              ? 'bg-[#922f2f]/70 cursor-not-allowed'
              : 'bg-[#aa3b3b] hover:bg-[#8a3030] active:scale-[0.98]'
          }
        `}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-30"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-80"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 00-10 10h4z"
            />
          </svg>
        ) : (
          'Complete Payment'
        )}
      </button>

      {/* Error Message */}
      {message && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
          {message}
        </div>
      )}
    </form>
  );
}
