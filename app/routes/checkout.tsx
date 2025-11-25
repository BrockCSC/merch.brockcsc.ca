import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '~/components/Checkout/Checkout';
import { useEffect, useState } from 'react';
import { data } from 'react-router';

import { useState } from "react";
import { useOrder } from "~/context/order-context";

const stripePromise = loadStripe(
  "pk_test_51SPYUmDKE3K4RyLKzWjFmmmg21dXrHI29a7i1WqZ77MZVkKedmLDL82bLZ9Kh5btk57s9AMZcNadITQkZhYvyr9200YOB8snWx"
);
export default function CheckoutRoute() {
  const stripePromise = loadStripe(
    'pk_live_51SPYUmDKE3K4RyLK3etexVTMhi70dd9zd3q5IIEobhRvFU8qTjSgGB5w2C7cm4sq5zhohbUufsYB14z3PMl7Gt2Q00G61mdg2k'
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://merch-backend.brockcsc.workers.dev/', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret));
    console.log(data);
  }, []);
  console.log(clientSecret);
  //if (!clientSecret) return <p>Loading payment info...</p>;

    setTimeout(() => {
      console.log(data.clientSecret);
      console.log(clientSecret);
    }, 10000);
  };
  return (
    <div className="w-full md:flex spa md:max-w-full md:gap-10 md:justify-center ">
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-4xl my-4">Checkout</h1>
        <form id="payment-form" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex justify-between relative left-0.5 right-0.5 ml-[-13vw] w-screen bg-[#aa3b3b] px-12 py-4 md:hidden">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center text-white cursor-pointer md:hidden"
              >
                Order Summary <MdKeyboardArrowUp />
              </button>
              <h1 className="text-white">$60.00</h1>
            </div>
            <h1 className="text-[#aa3b3b] font-bold mb-2">
              Contact Information
            </h1>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="stdNum"
              value={stdNum}
              placeholder="Student Number"
              onChange={(e) => setStdNum(e.target.value)}
            ></input>
            {!clientSecret && (
              <button
                type="submit"
                className="w-full text-white bg-[#aa3b3b] p-4 rounded-3xl cursor-pointer"
              >
                Complete Order
              </button>
            )}
          </div>
        </form>
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <Checkout />
          </Elements>
        )}
        <MobileDrawer open={open} setOpen={setOpen}>
          <div className="h-full">
            <div className="flex flex-col w-full h-full">
              <h1 className="text-4xl my-4 text-center">Order Summary</h1>
              <div className="flex flex-col justify-between h-full">
                <div className="w-full flex justify-around items-center">
                  <button className="cursor-hover">
                    <RiDeleteBin5Line size={24} />
                  </button>
                  <div>
                    <h1>Colour: {orderItem.color}</h1>
                    <h3>Size: {orderItem.size}</h3>
                  </div>
                  <h1>$60.00</h1>
                </div>
                <div className="flex flex-col justify-end px-4 pb-6 gap-2">
                  <div className="flex justify-between">
                    <h1>Subtotal:</h1>
                    <div>60.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MobileDrawer>
      </div>
      <div className="hidden md:bg-slate-50 md:w-[60%] md:flex md:flex-col md:items-center ">
        <div className="flex flex-col w-full h-full">
          <h1 className="text-4xl my-4 text-center">Order Summary</h1>
          <div className="flex flex-col justify-between h-full">
            <div className="w-full flex justify-around items-center">
              <button className="cursor-hover">
                <RiDeleteBin5Line size={24} />
              </button>
              <img className="bg-gray-500 rounded-4xl p-6"></img>
              <div>
                <h1>Item 1</h1>
                <h3>Size: M</h3>
              </div>
              <h1>$500.00</h1>
            </div>
            <div className="flex flex-col justify-end px-4 pb-6 gap-2">
              <div className="flex justify-between">
                <h1>Subtotal</h1>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
