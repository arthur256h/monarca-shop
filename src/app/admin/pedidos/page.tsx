"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/context/ToastContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

type PedidoItem = {
  id: number;
  name: string;
  quantity: number;
};

type Pedido = {
  id: number;
  nome: string;
  userEmail: string;
  itens: PedidoItem[];
  total: number;
  status?: "processando" | "enviado" | "entregue" | "cancelado";
  createdAt: string;
};

/* ===================== CONST ===================== */

const ADMIN_EMAIL = "admin@monarca.com";

/* ===================== COMPONENTE ===================== */

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { showToast } = useToast();
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;

  /* ===================== PROTEÇÃO ===================== */

  useEffect(() => {
    if (!isLoggedIn) return;

    if (!isAdmin) {
      showToast("Acesso restrito ao administrador", "error");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [isLoggedIn, isAdmin, router, showToast]);

  /* ===================== LOAD ===================== */

  useEffect(() => {
    if (!isAdmin) return;

    const dados = localStorage.getItem("pedidos");
    const lista: Pedido[] = dados ? JSON.parse(dados) : [];
    setPedidos(lista);
  }, [isAdmin]);

  /* ===================== AÇÕES ===================== */

  function alterarStatus(pedidoId: number, novoStatus: Pedido["status"]) {
    const dados = localStorage.getItem("pedidos");
    if (!dados) return;

    let pedidosAtualizados: Pedido[] = JSON.parse(dados);

    if (novoStatus === "cancelado") {
      pedidosAtualizados = pedidosAtualizados.filter(
        (pedido) => pedido.id !== pedidoId,
      );

      showToast("Pedido cancelado e removido!", "success");
    } else {
      pedidosAtualizados = pedidosAtualizados.map((pedido) =>
        pedido.id === pedidoId ? { ...pedido, status: novoStatus } : pedido,
      );

      showToast("Status do pedido atualizado!", "success");
    }

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
    setPedidos(pedidosAtualizados);
  }

  /* ===================== BLOQUEIO VISUAL ===================== */

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <section className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="rounded-2xl bg-[#1e293b] p-8">
            <h1 className="mb-4 text-2xl font-bold text-red-400">
              Acesso negado
            </h1>
            <p className="text-gray-300">
              Esta área é restrita ao administrador.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /* ===================== JSX ===================== */

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-purple-400">
          Pedidos — Administração
        </h1>

        {pedidos.length === 0 ? (
          <p className="text-gray-400">Nenhum pedido no momento.</p>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="rounded-xl bg-[#1e293b] p-6">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                  <div>
                    <p className="font-bold">Pedido #{pedido.id}</p>
                    <p className="text-sm text-gray-400">
                      Cliente: {pedido.nome}
                    </p>
                    <p className="text-sm text-gray-400">
                      Email: {pedido.userEmail}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-green-400">
                      R$ {pedido.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => alterarStatus(pedido.id, "processando")}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold"
                  >
                    Processando
                  </button>

                  <button
                    onClick={() => alterarStatus(pedido.id, "enviado")}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold"
                  >
                    Enviado
                  </button>

                  <button
                    onClick={() => alterarStatus(pedido.id, "entregue")}
                    className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold"
                  >
                    Entregue
                  </button>

                  <button
                    onClick={() => alterarStatus(pedido.id, "cancelado")}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
