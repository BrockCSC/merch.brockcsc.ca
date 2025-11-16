import type { Route } from "./+types/success";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order Success - Merch Page" },
    { name: "description", content: "Your order has been placed successfully" },
  ];
}

export default function Success() {
  return (
    <div>Success</div>
  );
}

