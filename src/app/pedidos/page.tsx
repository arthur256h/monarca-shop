"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";

type PedidoItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

type Pedido = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  pagamento: string;
  itens: PedidoItem[];
  total: number;
  createdAt: string;
  userEmail: string;
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!user) return;

    const pedidosSalvos = localStorage.getItem("pedidos");
    const todosPedidos = pedidosSalvos ? JSON.parse(pedidosSalvos) : [];

    const pedidosDoUsuario = todosPedidos.filter(
      (pedido: Pedido) => pedido.userEmail === user.email,
    );

    setPedidos(pedidosDoUsuario.reverse());
  }, [user]);

  function traduzirPagamento(pagamento: string) {
    if (pagamento === "cartao") return "Cartão de Crédito";
    if (pagamento === "pix") return "PIX";
    if (pagamento === "boleto") return "Boleto";
    return pagamento;
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-[#1e293b] p-6 text-center">
            <p className="text-lg">
              Você precisa estar logado para ver seus pedidos.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-purple-400">
          Meus pedidos
        </h1>

        {pedidos.length === 0 ? (
          <div className="rounded-2xl bg-[#1e293b] p-6">
            <p className="text-gray-300">Você ainda não fez pedidos.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="rounded-2xl bg-[#1e293b] p-6 shadow-lg"
              >
                <div className="mb-4 flex flex-col gap-2 border-b border-gray-700 pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Pedido</p>
                    <p className="text-lg font-bold">#{pedido.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Data</p>
                    <p className="font-medium">
                      {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Pagamento</p>
                    <p className="font-medium">
                      {traduzirPagamento(pedido.pagamento)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-xl font-bold text-green-400">
                      R$ {pedido.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {pedido.itens.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl bg-[#0f172a] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-400">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-bold text-green-400">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
