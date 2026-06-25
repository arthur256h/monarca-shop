"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductList, { Product } from "@/components/ProductList";
import { products } from "@/data/products"; // ✅ import corrigido

export default function Home() {
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");

    if (stored) {
      setProdutos(JSON.parse(stored));
    } else {
      // ✅ garante produtos no primeiro acesso em produção
      localStorage.setItem("products", JSON.stringify(products));
      setProdutos(products);
    }
  }, []);

  return (
    <>
      <Header />

      <main>
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="mb-4 text-4xl font-bold text-purple-400">
            Monarca Store
          </h1>

          <p className="mb-8 text-gray-300">
            Produtos gamers, eletrônicos e acessórios para elevar seu setup.
          </p>

          <ProductList products={produtos} />
        </section>
      </main>
    </>
  );
}
