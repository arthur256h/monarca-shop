"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const { addToCart } = useCart();

  const favorite = isFavorite(product.id);

  const [animateFav, setAnimateFav] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  function handleToggleFavorite() {
    setAnimateFav(true);

    toggleFavorite({
      ...product,
      category: product.category ?? "Geral",
    });

    showToast(
      favorite
        ? "Produto removido dos favoritos."
        : "Produto adicionado aos favoritos.",
      favorite ? "error" : "success",
    );

    setTimeout(() => setAnimateFav(false), 300);
  }

  function handleAddToCart() {
    if (animateCart) return;

    setAnimateCart(true);
    addToCart(product);
    showToast("Produto adicionado ao carrinho.", "success");

    setTimeout(() => setAnimateCart(false), 300);
  }

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl bg-[#1e293b]
        transition-transform duration-300
        hover:-translate-y-1 hover:scale-[1.02]
      "
    >
      {/* ❤️ FAVORITO */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white transition ${
          animateFav ? "scale-125" : "hover:scale-110"
        }`}
      >
        <Heart
          size={20}
          className={favorite ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>

      {/* 🖼️ IMAGEM DO PRODUTO */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="
            object-cover transition-transform duration-300
            group-hover:scale-110
          "
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* 📦 CONTEÚDO */}
      <div className="p-5">
        <h2 className="mb-2 text-xl font-bold text-white">{product.name}</h2>

        <p className="mb-4 line-clamp-2 text-sm text-gray-400">
          {product.description}
        </p>

        <div className="mb-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-green-400">
            R$ {product.price.toFixed(2)}
          </span>

          {product.category && (
            <span className="rounded-full bg-purple-600/20 px-3 py-1 text-xs font-semibold text-purple-300">
              {product.category}
            </span>
          )}
        </div>

        <div className="grid gap-3">
          <button
            onClick={handleAddToCart}
            disabled={animateCart}
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
