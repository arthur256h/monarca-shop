"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/context/CartContext";

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
  const { addToCart } = useCart();

  const favorite = isFavorite(product.id);

  // 🔹 estados locais só para animação (como antes)
  const [animateFav, setAnimateFav] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  function handleToggleFavorite() {
    const wasFavorite = favorite;

    // 🔹 animação primeiro
    setAnimateFav(true);

    toggleFavorite(product);

    if (wasFavorite) {
      showToast("Produto removido dos favoritos.", "error");
    } else {
      showToast("Produto adicionado aos favoritos.", "success");
    }

    setTimeout(() => setAnimateFav(false), 300);
  }

  function handleAddToCart() {
    // 🔹 animação no clique
    setAnimateCart(true);

    addToCart(product);
    showToast("Produto adicionado ao carrinho.", "success");

    setTimeout(() => setAnimateCart(false), 300);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition hover:-translate-y-1">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      {/* ❤️ FAVORITO */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white transition ${
          animateFav ? "scale-125" : "hover:scale-110"
        }`}
      >
        <Heart
          size={20}
          className={favorite ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>

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

        <div className="grid gap-3">
          {/* 🛒 CARRINHO */}
          <button
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition ${
              animateCart ? "scale-105 bg-green-700" : "hover:bg-green-700"
            }`}
          >
            <ShoppingCart size={20} />
            Adicionar ao carrinho
          </button>

          <Link
            href={`/produtos/${product.id}`}
            className="block w-full rounded-xl bg-purple-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
