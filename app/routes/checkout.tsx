import { useState } from "react";
import type { Route } from "./+types/checkout";
import { RiDeleteBin5Line } from "react-icons/ri";
//import { MobileDrawer } from "~/components/MobileDrawer/MobileDrawer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Checkout - Merch Page" },
    { name: "description", content: "Complete your purchase" },
  ];
}

export default function Checkout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-[#aa3b3b] w-full max-w-xs md:flex spa md:max-w-full md:gap-10 md:justify-center ">
      <div className="md:w-[60%]">
        <h1 className="text-4xl mb-4">Checkout</h1>
        <form>
          <div className="mb-4">
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
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <h1 className="text-[#aa3b3b] font-bold">Billing Address</h1>
            <input
              className="peer shadow appearance-none border rounded w-full py-2 px-3 text-grey"
              required
              type="Country"
              id="country"
              placeholder="Country"
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
              type="text"
              id="address"
              placeholder="Address"
            ></input>
            <div className="mb-4 flex gap-2 flex-wrap">
              <input
                className="w-[48.5%] peer shadow appearance-none border rounded  py-2 px-3 text-grey w"
                required
                type="City"
                id="city"
                placeholder="City"
              ></input>
              <input
                className="w-[48.5%] peer shadow appearance-none border rounded py-2 px-3 text-grey"
                required
                type="text"
                id="state"
                placeholder="State/Province"
              ></input>
              <input
                className="peer shadow appearance-none border rounded w-[48.5%] py-2 px-3 text-grey"
                required
                type="text"
                id="postal"
                placeholder="Postal Code"
              ></input>
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <h1 className="text-[#aa3b3b] font-bold">Payment Information</h1>
            <input
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

          <button
            onClick={() => setOpen(true)}
            className="w-full text-white bg-[#aa3b3b] p-4 rounded-3xl cursor-pointer md:hidden"
          >
            Summary
          </button>
          {/* <MobileDrawer open={open} setOpen={setOpen}>
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              nulla voluptas est numquam accusantium fuga odit saepe possimus
              officiis earum voluptates ut quis, obcaecati asperiores distinctio
              optio atque a omnis.
            </h1>
          </MobileDrawer> */}
        </form>
      </div>
      <div className=" md:bg-slate-50 md:w-[40%] md: flex md:flex-col md:items-center">
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
