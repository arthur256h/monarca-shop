"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/context/ToastContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { getProducts, saveProducts } from "@/utils/products";

/* ===================== TIPOS ===================== */

type Produto = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

/* ===================== CONST ===================== */

const ADMIN_EMAIL = "admin@monarca.com";

/* Categorias fixas */
const CATEGORIAS = [
  "Periféricos",
  "Eletrônicos",
  "Acessórios",
  "Computadores",
  "Games",
];

/* ===================== COMPONENTE ===================== */

export default function AdminProdutosPage() {
  const { user, isLoggedIn } = useUser();
  const { showToast } = useToast();
  const router = useRouter();

  const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;

  const [editando, setEditando] = useState<Produto | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  /* ===================== LOAD ===================== */

  useEffect(() => {
    if (!isAdmin) return;

    const produtoEdicao = localStorage.getItem("produtoEmEdicao");

    if (produtoEdicao) {
      const produto: Produto = JSON.parse(produtoEdicao);

      setEditando(produto);
      setName(produto.name);
      setPrice(String(produto.price));
      setImage(produto.image);
      setDescription(produto.description);
      setCategory(produto.category);

      localStorage.removeItem("produtoEmEdicao");
    }
  }, [isAdmin]);

  /* ===================== SALVAR ===================== */

  function salvarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !price || !image || !description || !category) {
      showToast("Preencha todos os campos.", "error");
      return;
    }

    const produtos = getProducts();

    let atualizados: Produto[];

    if (editando) {
      atualizados = produtos.map((p) =>
        p.id === editando.id
          ? {
              ...p,
              name,
              price: Number(price),
              image,
              description,
              category,
            }
          : p,
      );
    } else {
      atualizados = [
        ...produtos,
        {
          id: Date.now(),
          name,
          price: Number(price),
          image,
          description,
          category,
        },
      ];
    }

    saveProducts(atualizados);

    showToast(
      editando
        ? "Produto atualizado com sucesso!"
        : "Produto cadastrado com sucesso!",
      "success",
    );

    router.push("/admin");
  }

  /* ===================== BLOQUEIO ===================== */

  if (!isAdmin) {
    return (
      <>
        <Header />
        <p className="p-10 text-center text-red-500">Acesso negado.</p>
      </>
    );
  }

  /* ===================== JSX ===================== */

  return (
    <>
      <Header />

      <main className="mx-auto max-w-xl px-4 py-10 text-white">
        <h1 className="mb-6 text-3xl font-bold text-purple-400">
          {editando ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <form
          onSubmit={salvarProduto}
          className="space-y-4 rounded-xl bg-[#1e293b] p-6"
        >
          <input
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3"
          />

          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3"
          />

          <input
            placeholder="URL da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3"
          />
          {image && (
            <div className="mt-2">
              <p className="mb-1 text-sm text-gray-400">Preview da imagem:</p>
              <img
                src={image}
                alt="Preview"
                className="h-40 w-full rounded object-cover border border-gray-600"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* SELECT DE CATEGORIA */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3 text-white"
          >
            <option value="">Selecione uma categoria</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3"
          />

          <button
            type="submit"
            className="w-full rounded bg-purple-600 py-3 font-semibold hover:bg-purple-700"
          >
            {editando ? "Salvar alterações" : "Cadastrar produto"}
          </button>
        </form>
      </main>
    </>
  );
}
