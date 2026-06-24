"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
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

/* ===================== COMPONENTE ===================== */

export default function AdminPage() {
  const { user, isLoggedIn } = useUser();
  const { showToast } = useToast();
  const router = useRouter();

  const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;

  const [produtos, setProdutos] = useState<Produto[]>([]);

  /* ===================== LOAD ===================== */

  useEffect(() => {
    if (!isAdmin) return;

    const dados = getProducts();
    setProdutos(dados);
  }, [isAdmin]);

  /* ===================== AÇÕES ===================== */

  function excluirProduto(id: number) {
    const confirmacao = confirm("Deseja excluir este produto?");
    if (!confirmacao) return;

    const atualizados = produtos.filter((p) => p.id !== id);
    setProdutos(atualizados);
    saveProducts(atualizados);

    showToast("Produto excluído com sucesso!", "success");
  }

  function editarProduto(produto: Produto) {
    localStorage.setItem("produtoEmEdicao", JSON.stringify(produto));
    router.push("/admin/produtos");
  }

  /* ===================== BLOQUEIO ===================== */

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p>Acesso negado.</p>
      </main>
    );
  }

  /* ===================== JSX ===================== */

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 text-white">
        {/* TOPO */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-purple-400">
            Painel Administrativo
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/pedidos")}
              className="rounded bg-slate-700 px-5 py-2 font-semibold transition hover:bg-slate-600 hover:scale-105"
            >
              📦 Ver Pedidos
            </button>

            <button
              onClick={() => router.push("/admin/produtos")}
              className="rounded bg-purple-600 px-5 py-2 font-semibold transition hover:bg-purple-700 hover:scale-105"
            >
              + Adicionar Produto
            </button>
          </div>
        </div>

        {/* DASHBOARD */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-[#1e293b] p-6 transition hover:scale-105">
            <Package className="mb-2 text-purple-400" />
            <p className="text-sm text-gray-400">Produtos cadastrados</p>
            <p className="text-2xl font-bold">{produtos.length}</p>
          </div>
        </div>

        {/* LISTA DE PRODUTOS */}
        {produtos.length === 0 ? (
          <p className="text-gray-400">Nenhum produto cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="rounded-xl bg-[#1e293b] p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* IMAGEM COM ZOOM */}
                <div className="overflow-hidden rounded">
                  <img
                    src={produto.image}
                    alt={produto.name}
                    className="mb-3 h-40 w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <h2 className="text-lg font-semibold">{produto.name}</h2>
                <p className="text-sm text-gray-400">{produto.category}</p>

                <p className="mt-2 font-bold text-purple-400">
                  R$ {produto.price.toFixed(2)}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => editarProduto(produto)}
                    className="flex-1 rounded bg-blue-600 py-2 transition hover:bg-blue-700 hover:scale-105"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirProduto(produto.id)}
                    className="flex-1 rounded bg-red-600 py-2 transition hover:bg-red-700 hover:scale-105"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
