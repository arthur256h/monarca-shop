"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["Todos", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [products, search, selectedCategory, sort]);

  return (
    <>
      {/* FILTROS */}
      <div className="mb-8 rounded-2xl bg-[#1e293b] p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-purple-300">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Digite o nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a] px-4 py-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-purple-300">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a] px-4 py-2 text-white outline-none"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-purple-300">
              Ordenar
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl bg-[#0f172a] px-4 py-2 text-white outline-none"
            >
              <option value="default">Padrão</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="name">Nome A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* LISTA */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-[#1e293b] p-6 text-center">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
