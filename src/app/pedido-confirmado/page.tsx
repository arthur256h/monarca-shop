"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type Pedido = {
  cliente: {
    nome: string;
    email: string;
    endereco: string;
    pagamento: string;
  };
  itens: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  data: string;
};

export default function PedidoConfirmadoPage() {
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ultimoPedido");
    if (saved) {
      setPedido(JSON.parse(saved));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl border border-[#252C36] bg-[#151B23] p-8 shadow-xl">
          <h1 className="text-4xl font-extrabold text-emerald-400">
            Pedido confirmado!
          </h1>

          <p className="mt-4 text-[#9CA3AF]">
            Seu pedido foi registrado com sucesso.
          </p>

          {pedido && (
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#E5E7EB]">Cliente</h2>
                <div className="mt-2 space-y-1 text-[#9CA3AF]">
                  <p>Nome: {pedido.cliente.nome}</p>
                  <p>Email: {pedido.cliente.email}</p>
                  <p>Endereço: {pedido.cliente.endereco}</p>
                  <p>Pagamento: {pedido.cliente.pagamento}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#E5E7EB]">Itens</h2>
                <div className="mt-3 space-y-2">
                  {pedido.itens.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between rounded-2xl border border-[#252C36] bg-[#11161D] px-4 py-3"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold text-[#8B5CF6]">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#252C36] pt-4">
                <p className="text-3xl font-extrabold">
                  Total:{" "}
                  <span className="text-[#8B5CF6]">
                    R$ {pedido.total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          )}

          <Link
            href="/"
            className="mt-8 inline-block rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
          >
            Voltar para a loja
          </Link>
        </div>
      </section>
    </main>
  );
}
