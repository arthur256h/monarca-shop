"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function FloatingCartButton() {
  const { cart, totalItems } = useCart();

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <Link
      href="/carrinho"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-purple-600 px-5 py-4 text-white shadow-2xl transition hover:scale-105 hover:bg-purple-700"
    >
      <div className="relative">
        <ShoppingCart size={28} />

        <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalItems}
        </span>
      </div>

      <div className="hidden flex-col leading-tight sm:flex">
        <span className="text-sm font-semibold">Ver carrinho</span>
        <span className="text-xs text-purple-100">R$ {total.toFixed(2)}</span>
      </div>
    </Link>
  );
}
