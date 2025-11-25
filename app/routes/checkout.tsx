import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '~/components/Checkout/Checkout';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MobileDrawer } from '~/components/MobileDrawer/MobileDrawer';

import { useState, useEffect } from 'react';
import { useOrder } from '~/context/order-context';
import { animate } from 'motion';

const stripePromise = loadStripe(
  'pk_test_51SPYUmDKE3K4RyLKzWjFmmmg21dXrHI29a7i1WqZ77MZVkKedmLDL82bLZ9Kh5btk57s9AMZcNadITQkZhYvyr9200YOB8snWx'
);

export default function CheckoutRoute() {
  const { orderItem } = useOrder();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [stdNum, setStdNum] = useState<string>('');

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  if (!orderItem) return <p>No order found. Please go back</p>;

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault?.();

    if (!name || !email || !stdNum || !orderItem) {
      // simple client-side validation
      return;
    }

    const payload = {
      name,
      studentId: parseInt(stdNum, 10),
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

      const data = await response.json();
      setClientSecret(data.clientSecret ?? null);
    } catch (err) {
      console.error('Failed to create payment intent', err);
    }
  };

  useEffect(() => {
    animate(
      '.checkout-title',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.2 }
    );
    animate(
      '.contact-info',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.4 }
    );
    animate(
      '.order-summary',
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.8, delay: 0.6 }
    );
  }, []);

  return (
    <div className="w-full md:flex spa md:max-w-full md:gap-10 md:justify-center ">
      <div className="w-full flex flex-col justify-center">
        <h1 className="checkout-title text-4xl my-4">Checkout</h1>

        {/* Use div instead of form to avoid nested-form/hydration issues */}
        <div id="payment-section">
          <div className="contact-info mb-4 flex flex-col gap-2">
            <div className="flex justify-between relative left-0.5 right-0.5 ml-[-13vw] w-screen bg-[#aa3b3b] px-12 py-4 md:hidden">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center text-white cursor-pointer md:hidden"
              >
                Order Summary <MdKeyboardArrowUp />
              </button>
              <h1 className="text-white">$45.00</h1>
            </div>

            <h1 className="text-[#aa3b3b] font-bold mb-2">
              Contact Information
            </h1>

            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="stdNum"
              value={stdNum}
              placeholder="Student Number"
              onChange={(e) => setStdNum(e.target.value)}
            />

            {!clientSecret && (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white bg-[#aa3b3b] p-4 rounded-3xl cursor-pointer"
              >
                Complete Order
              </button>
            )}
          </div>

          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Checkout />
            </Elements>
          )}
        </div>

        <MobileDrawer open={open} setOpen={setOpen}>
          <div className="h-full">
            <div className="flex flex-col w-full h-full">
              <h1 className="text-4xl my-4 text-center">Order Summary</h1>
              <div className="flex flex-col justify-between h-full">
                <div className="w-full flex justify-around items-center">
                  <div>
                    <h1>
                      <span className="font-bold">Color:</span>{' '}
                      {orderItem.color.charAt(0).toUpperCase() +
                        orderItem.color.slice(1)}
                    </h1>
                    <h3>
                      <span className="font-bold">Size:</span> {orderItem.size}
                    </h3>
                  </div>
                  <h1>$45.00</h1>
                </div>
                <div className="flex flex-col justify-end px-4 pb-6 gap-2">
                  <div className="flex justify-between">
                    <h1>Subtotal:</h1>
                    <div>45.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MobileDrawer>
      </div>

      <div className="order-summary hidden md:bg-slate-50 md:w-[60%] md:flex md:flex-col md:items-center ">
        <div className="flex flex-col w-full h-full">
          <h1 className="text-4xl my-4 text-center">Order Summary</h1>
          <div className="flex flex-col justify-between h-full">
            <div className="w-full flex justify-around items-center">
              <img
                src={`/merch/${orderItem.color}-${orderItem.imageIndex === 0 ? 'm' : 'f'}.png`}
                alt="Selected hoodie"
                className="w-16 h-16 rounded-4xl object-cover"
              />
              <div>
                <h1>
                  <span className="font-bold">Color:</span>{' '}
                  {orderItem.color.charAt(0).toUpperCase() +
                    orderItem.color.slice(1)}
                </h1>
                <h3>
                  <span className="font-bold">Size:</span> {orderItem.size}
                </h3>
              </div>
              <h1>$45.00</h1>
            </div>
            <div className="flex flex-col justify-end px-4 pb-6 gap-2">
              <div className="flex justify-between">
                <h1>Subtotal</h1>
                <div>$45.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
