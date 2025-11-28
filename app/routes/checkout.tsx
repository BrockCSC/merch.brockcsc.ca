import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '~/components/Stripe/StripeForm';

import { MdKeyboardArrowUp } from 'react-icons/md';
import { MobileDrawer } from '~/components/MobileDrawer/MobileDrawer';

import { useNavigate } from 'react-router';
import { RiShoppingBagLine } from 'react-icons/ri';

import { useState } from 'react';
import { useOrder } from '~/context/order-context';
import { SummaryContent } from '~/components/SummaryContent/SummaryContent';

const stripePromise = loadStripe(
  'pk_test_51SPYUmDKE3K4RyLKzWjFmmmg21dXrHI29a7i1WqZ77MZVkKedmLDL82bLZ9Kh5btk57s9AMZcNadITQkZhYvyr9200YOB8snWx'
);

export default function CheckoutRoute() {
  const { orderItem } = useOrder();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stdNum, setStdNum] = useState('');

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // 🛒 EMPTY CART STATE
  if (!orderItem) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-10 text-center space-y-6 border border-gray-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#aa3b3b]/10">
            <RiShoppingBagLine className="h-10 w-10 text-[#aa3b3b]" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Your cart is empty
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            Please choose your hoodie first before checking out.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-[#aa3b3b] px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-[#8a3030] transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            Browse Merch
          </button>
        </div>
      </div>
    );
  }

  // 🧾 FORM SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !stdNum || !orderItem) return;

    const payload = {
      name,
      studentId: parseInt(stdNum),
      email,
      color: orderItem.color,
      size: orderItem.size,
    };

    try {
      const response = await fetch(
        'https://merch-backend.brockcsc.workers.dev/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData || response.statusText);
        alert('something went wrong while creating payment. Please try again.');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error('Network or unexpected error:', err);
      alert('Network error - please check your connection and try again');
    }
  };

  return (
    <div className="w-full mx-auto md:flex md:gap-10 md:justify-center max-w-6xl p-4 md:p-0">
      {/* LEFT SIDE — FORM */}
      <div className="w-full flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Checkout</h1>
        <p className="text-gray-500 mt-1 mb-6">Complete your purchase below.</p>
        <div className="fixed bottom-0 left-0 right-0 z-20 ml-[-13vw] md:hidden bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setOpen(true)}
            className="w-full flex items-center  justify-center pl-12 py-4 text-gray-900 active:scale-[0.98] transition cursor-pointer "
          >
            Order Summary{' '}
            <MdKeyboardArrowUp className="text-xl text-[#aa3b3b]" />
          </button>
          <h1 className="text-white">$60.00</h1>
        </div>

        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-[#aa3b3b] font-bold text-xl">
              Contact Information
            </h2>

            <input
              className="shadow border border-gray-300 rounded-xl w-full py-3 px-4 focus:ring-2 focus:ring-[#aa3b3b] outline-none"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="shadow border border-gray-300 rounded-xl w-full py-3 px-4 focus:ring-2 focus:ring-[#aa3b3b] outline-none"
              required
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="shadow border border-gray-300 rounded-xl w-full py-3 px-4 focus:ring-2 focus:ring-[#aa3b3b] outline-none"
              required
              type="text"
              placeholder="Student Number"
              value={stdNum}
              onChange={(e) => setStdNum(e.target.value)}
            />
          </div>

          {/* Button before Stripe loads */}
          {!clientSecret && (
            <button
              type="submit"
              className="w-full text-white bg-[#aa3b3b] p-4 rounded-xl font-semibold shadow-md hover:bg-[#8a3030] transition"
            >
              Proceed to Payment
            </button>
          )}

          {/* Stripe Payment Element */}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Checkout />
            </Elements>
          )}
        </form>

        {/* MOBILE DRAWER SUMMARY */}
        <MobileDrawer open={open} setOpen={setOpen}>
          <div className="h-full">
            <SummaryContent orderItem={orderItem} />
          </div>
        </MobileDrawer>
      </div>

      {/* RIGHT SIDE — DESKTOP SUMMARY */}
      <div className="hidden md:block md:w-1/2">
        <SummaryContent orderItem={orderItem} />
      </div>
    </div>
  );
}
