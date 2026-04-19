"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
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

export default function ProductCard({ product }: { product: Product }) {
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
    <div className="group overflow-hidden rounded-2xl border border-gray-800 bg-[#1e293b] shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          onClick={handleToggleFavorite}
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition hover:scale-110"
        >
          <Heart
            size={20}
            className={favorite ? "fill-red-500 text-red-500" : "text-white"}
          />
        </button>
      </div>

      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold text-white">{product.name}</h2>

        <p className="mb-4 line-clamp-2 text-sm text-gray-400">
          {product.description}
        </p>

        <div className="mb-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-green-400">
            R$ {product.price.toFixed(2)}
          </span>

          <span className="rounded-full bg-purple-600/20 px-3 py-1 text-xs font-semibold text-purple-300">
            {product.category}
          </span>
        </div>

        <Link
          href={`/produto/${product.id}`}
          className="block w-full rounded-xl bg-purple-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
