"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  function handleAddToCart() {
    addToCart(product);
    showToast("Produto adicionado ao carrinho.", "success");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
    >
      <ShoppingCart size={18} />
      Adicionar ao carrinho
    </button>
  );
}
