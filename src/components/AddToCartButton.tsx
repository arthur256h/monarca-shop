"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleAddToCart() {
    addToCart(product);
    sessionStorage.setItem("addedToCart", "true");
    router.push("/carrinho");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700"
    >
      Adicionar ao carrinho
    </button>
  );
}
