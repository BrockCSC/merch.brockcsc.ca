import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MobileDrawer } from "~/components/MobileDrawer/MobileDrawer";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

//* DISREGARD COMMENTED CODE PUSHED TO REPO IN ORDER TO PULL TO GET THE REACT CONTEXT FUNCTIONALITY

export default function Checkout() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const stripe = useStripe();
  // const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!stripe || !elements) {
    //   return;
    // }

    setIsLoading(true);

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "http://localhost:3000/success",
    //   },
    // });

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message ?? "Something went wrong");
    // } else {
    // }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
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
                Order Summary <MdKeyboardArrowDown />
              </button>
              <h1 className="text-white">Total</h1>
            </div>
            <h1 className="text-[#aa3b3b] font-bold mb-2">
              Contact Information
            </h1>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="Email"
              id="email"
              placeholder="Email"
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="name"
              placeholder="Name"
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="Country"
              id="country"
              placeholder="Student Number"
            ></input>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <h1 className="text-[#aa3b3b] font-bold">Payment Information</h1>
            //Commented out to allow for styling of non-stripe components
            {/* <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
            /> */}
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="expiry"
              placeholder="MM/YY"
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="cvc"
              placeholder="CVC"
            ></input>
          </div>
          <button className="w-full text-white bg-[#aa3b3b] p-4 rounded-3xl cursor-pointer">
            Complete Order
          </button>
        </form>
        //Will be removed just a copy of previous code just in case need to
        refer to for styling purposes
        {/* <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="cardNum"
              placeholder="Card Number"
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="expiry"
              placeholder="MM/YY"
            ></input>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="text"
              id="cvc"
              placeholder="CVC"
            ></input>
          </div>
          <button className="w-full text-white bg-[#aa3b3b] p-4 rounded-3xl cursor-pointer">
            Complete Order
          </button>
        </form>
        <div className="bg-[#aa3b3b] w-full p-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center text-white cursor-pointer md:hidden"
          >
            Order Summary <MdKeyboardArrowDown />
          </button> 
          </div>*/}
        <MobileDrawer open={open} setOpen={setOpen}>
          <div className="h-full">
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
                    <h1>Tax</h1>
                    <h1>$$$</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1>Subtotal</h1>
                    <div>$$$</div>
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
                <h1>Tax</h1>
                <h1>$$$</h1>
              </div>
              <div className="flex justify-between">
                <h1>Subtotal</h1>
                <div>$$$</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
