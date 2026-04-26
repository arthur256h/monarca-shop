"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/getAllProducts";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    setProdutos(getAllProducts());
  }, []);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-purple-400">Produtos</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {produtos.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
