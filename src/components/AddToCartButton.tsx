"use client";

import { ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  return (
    <a
      href={`/carrinho?add=${product.id}`}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 font-semibold text-[#E5E7EB] shadow-lg transition duration-300 hover:border-[#8B5CF6] hover:bg-[#1A2230] active:scale-[0.98]"
    >
      <span className="relative flex items-center gap-2">
        <ShoppingCart size={18} />
        <span>Adicionar ao carrinho</span>
      </span>
    </a>
  );
}
