"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { products as localProducts } from "@/data/products";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function Home() {
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    // Simula carregamento como se fosse API
    setProdutos(localProducts);
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
