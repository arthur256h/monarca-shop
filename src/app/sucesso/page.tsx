"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, ShoppingBag, ReceiptText } from "lucide-react";
import Header from "@/components/Header";

type Pedido = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  pagamento: string;
  total: number;
  createdAt: string;
};

export default function SucessoPage() {
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const pedidoSalvo = sessionStorage.getItem("ultimoPedido");

    if (pedidoSalvo) {
      setPedido(JSON.parse(pedidoSalvo));
    }
  }, []);

  function traduzirPagamento(pagamento: string) {
    if (pagamento === "cartao") return "Cartão de Crédito";
    if (pagamento === "pix") return "PIX";
    if (pagamento === "boleto") return "Boleto";
    return pagamento;
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />

      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle size={64} className="text-green-400" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-green-400">
          Pedido finalizado com sucesso!
        </h1>

        <p className="mb-8 max-w-2xl text-gray-300">
          Obrigado por comprar na Monarca Store. Seu pedido foi registrado e já
          está disponível na página de pedidos.
        </p>

        {pedido && (
          <div className="mb-8 w-full max-w-xl rounded-2xl bg-[#1e293b] p-6 text-left shadow-lg">
            <div className="mb-4 flex items-center gap-2 text-purple-400">
              <ReceiptText size={22} />
              <h2 className="text-xl font-bold">Resumo do pedido</h2>
            </div>

            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Pedido:</strong> #{pedido.id}
              </p>

              <p>
                <strong>Cliente:</strong> {pedido.nome}
              </p>

              <p>
                <strong>Pagamento:</strong>{" "}
                {traduzirPagamento(pedido.pagamento)}
              </p>

              <p>
                <strong>Data:</strong>{" "}
                {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
              </p>

              <p className="text-lg">
                <strong>Total:</strong>{" "}
                <span className="font-bold text-green-400">
                  R$ {pedido.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/pedidos"
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
          >
            <Package size={20} />
            Ver meus pedidos
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition hover:bg-slate-700"
          >
            <ShoppingBag size={20} />
            Continuar comprando
          </Link>
        </div>
      </section>
    </main>
  );
}
