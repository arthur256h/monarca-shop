"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritosPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-purple-400">Favoritos</h1>

        {favorites.length === 0 ? (
          <div className="rounded-2xl bg-[#1e293b] p-6 text-center shadow-lg">
            <p className="text-lg text-gray-300">
              Você ainda não adicionou produtos aos favoritos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
