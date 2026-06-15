"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";

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
    async function carregarProdutos() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProdutos(data);
    }

    carregarProdutos();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-purple-400">Produtos</h1>

        <ProductList products={produtos} />
      </section>
    </main>
  );
}
