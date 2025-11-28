import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useOrder } from "~/context/order-context";
import { AnimatePresence, motion } from "motion/react";

interface OrderItem {
  color: string;
  size: string;
}

interface OrderItemProps {
  orderItem: OrderItem;
}

export const SummaryContent: React.FC<OrderItemProps> = ({ orderItem }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const { clearOrder } = useOrder();

  const handleDelete = async () => {
    setIsRemoving(true);
    setTimeout(() => {
      clearOrder();
    }, 300);
  };

  return (
    <>
      {/* Displays Cart content*/}
      <div className="w-full h-full flex flex-col bg-white shadow-lg rounded-2xl p-8 border border-gray-100 mt-6 mb-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Order Summary
        </h1>
        {/* Animates deletion of item so that it doesn't just vanish refer to motion docs for more info*/}
        <AnimatePresence>
          {!isRemoving && (
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              className="flex items-center justify-between py-4 border-b border-gray-200"
            >
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 duration-100 hover:cursor-pointer hover:scale-110 transition-transform"
                onClick={handleDelete}
              >
                <RiDeleteBin5Line size={26} />
              </button>
              <div className="flex-1 px-4">
                <p className="text-gray-800 font-medium">
                  {orderItem.color.charAt(0).toUpperCase() +
                    orderItem.color.slice(1)}
                </p>
                <p className="text-gray-600 text-sm">Size: {orderItem.size}</p>
              </div>
              <h1 className="tex-lg font-semibold text-gray-900">$45.00</h1>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between pt-5 text-lg font-medium text-gray-800 mt-auto">
          <span>Subtotal:</span>
          {/* Displays 0 dollars if cart is empty other wise displays hoodie price */}
          {isRemoving ? <span>$0.00</span> : <span>$45.00</span>}
        </div>
      </div>
    </>
  );
};
