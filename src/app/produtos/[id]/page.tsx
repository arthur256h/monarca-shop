"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductActions from "@/components/ProductActions";
import { getAllProducts } from "@/lib/getAllProducts";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = Number(params.id);
    const products = getAllProducts();

    const foundProduct = products.find((item: Product) => item.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    }

    setLoaded(true);
  }, [params.id]);

  if (loaded && !product) {
    notFound();
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-gray-300">Carregando produto...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 rounded-3xl bg-[#1e293b] p-6 shadow-xl md:grid-cols-2 md:p-10">
          <div className="overflow-hidden rounded-2xl bg-[#0f172a] p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-300">
              Produto em destaque
            </p>

            <h1 className="mb-4 text-4xl font-bold text-white">
              {product.name}
            </h1>

            <p className="mb-6 text-base leading-7 text-gray-300">
              {product.description}
            </p>

            <div className="mb-6 flex items-center gap-4">
              <span className="text-4xl font-bold text-green-400">
                R$ {product.price.toFixed(2)}
              </span>

              <span className="rounded-full bg-purple-600/20 px-3 py-1 text-sm font-semibold text-purple-300">
                {product.category}
              </span>
            </div>

            <div className="mb-6 rounded-2xl bg-[#0f172a] p-5">
              <h2 className="mb-3 text-lg font-semibold text-purple-400">
                Informações do produto
              </h2>

              <ul className="space-y-2 text-gray-300">
                <li>• Produto com visual moderno</li>
                <li>• Adição rápida ao carrinho</li>
                <li>• Sistema de favoritos ativo</li>
                <li>• Experiência simulando loja real</li>
              </ul>
            </div>

            <ProductActions product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
