import type { Route } from "./+types/checkout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Checkout - Merch Page" },
    { name: "description", content: "Complete your purchase" },
  ];
}

export default function Checkout() {
  return (
    <div>Checkout</div>
  );
}

