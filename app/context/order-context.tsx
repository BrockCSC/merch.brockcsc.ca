import { createContext, useContext, useState, type ReactNode } from "react";

export type OrderItem = {
  color: string;
  size: string;
};

type OrderContextType = {
  orderItem: OrderItem | null;
  setOrderItem: (item: OrderItem) => void;
  clearOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);

  const clearOrder = () => {
    setOrderItem(null);
  };

  return (
    <OrderContext.Provider
      value={{
        orderItem,
        setOrderItem,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
}
