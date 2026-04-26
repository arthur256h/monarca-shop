"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Package, DollarSign, LogOut } from "lucide-react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";

type Pedido = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  pagamento: string;
  total: number;
  createdAt: string;
  userEmail: string;
};

export default function MinhaContaPage() {
  const { user, isLoggedIn, logout } = useUser();
  const router = useRouter();

  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);

  useEffect(() => {
    if (!user) return;

    const pedidosSalvos = localStorage.getItem("pedidos");
    const todosPedidos: Pedido[] = pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [];

    const pedidosDoUsuario = todosPedidos.filter(
      (pedido) => pedido.userEmail === user.email,
    );

    setTotalPedidos(pedidosDoUsuario.length);

    const soma = pedidosDoUsuario.reduce((acc, pedido) => {
      return acc + pedido.total;
    }, 0);

    setTotalGasto(soma);
  }, [user]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  if (!isLoggedIn || !user) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-[#1e293b] p-6 text-center">
            <p className="mb-4 text-lg">
              Você precisa estar logado para acessar sua conta.
            </p>

            <Link
              href="/login"
              className="inline-flex rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
            >
              Entrar
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-purple-400">Minha conta</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg md:col-span-1">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600">
              <User size={40} />
            </div>

            <h2 className="text-2xl font-bold">{user.name}</h2>

            <div className="mt-3 flex items-center gap-2 text-gray-400">
              <Mail size={18} />
              <p className="text-sm">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
            >
              <LogOut size={18} />
              Sair da conta
            </button>
          </div>

          <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
            <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600">
                <Package size={26} />
              </div>

              <p className="text-sm text-gray-400">Total de pedidos</p>
              <p className="mt-2 text-3xl font-bold text-purple-400">
                {totalPedidos}
              </p>
            </div>

            <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600">
                <DollarSign size={26} />
              </div>

              <p className="text-sm text-gray-400">Total gasto</p>
              <p className="mt-2 text-3xl font-bold text-green-400">
                R$ {totalGasto.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg md:col-span-2">
              <h2 className="mb-3 text-xl font-bold text-purple-400">
                Ações rápidas
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pedidos"
                  className="rounded-xl bg-purple-600 px-5 py-3 text-center font-bold text-white transition hover:bg-purple-700"
                >
                  Ver meus pedidos
                </Link>

                <Link
                  href="/favoritos"
                  className="rounded-xl bg-slate-700 px-5 py-3 text-center font-bold text-white transition hover:bg-slate-600"
                >
                  Ver favoritos
                </Link>

                <Link
                  href="/"
                  className="rounded-xl bg-slate-700 px-5 py-3 text-center font-bold text-white transition hover:bg-slate-600"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
