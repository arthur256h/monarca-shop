"use client";

import { Heart } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/context/ToastContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function ProductActions({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorite = isFavorite(product.id);

  function handleToggleFavorite() {
    const wasFavorite = isFavorite(product.id);

    toggleFavorite(product);

    if (wasFavorite) {
      showToast("Produto removido dos favoritos.", "error");
    } else {
      showToast("Produto adicionado aos favoritos.", "success");
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleToggleFavorite}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${
          favorite
            ? "bg-pink-600 text-white hover:bg-pink-700"
            : "bg-[#334155] text-white hover:bg-[#475569]"
        }`}
      >
        <Heart
          size={20}
          className={favorite ? "fill-white text-white" : "text-white"}
        />
        <span>
          {favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        </span>
      </button>

      <AddToCartButton product={product} />
    </div>
  );
}
