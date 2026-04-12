"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Home, PackageCheck, Wallet } from "lucide-react";
import Header from "@/components/Header";
import { formatPrice } from "@/utils/format";

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

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-[28px] border border-[#252C36] bg-[#151B23] p-8 shadow-xl md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Pedido finalizado
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
                  Pedido confirmado!
                </h1>
                <p className="mt-3 max-w-2xl text-[#9CA3AF]">
                  Seu pedido foi registrado com sucesso. Agora é só acompanhar
                  os detalhes abaixo e continuar explorando a loja.
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#2D3642] bg-[#11161D] px-5 py-3 font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
            >
              <Home size={18} />
              Voltar para a loja
            </Link>
          </div>

          {pedido ? (
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-[24px] border border-[#252C36] bg-[#11161D] p-5">
                  <div className="flex items-center gap-2 text-[#8B5CF6]">
                    <PackageCheck size={18} />
                    <h2 className="text-xl font-bold text-[#E5E7EB]">
                      Dados do cliente
                    </h2>
                  </div>

                  <div className="mt-4 space-y-2 text-[#9CA3AF]">
                    <p>
                      <span className="font-semibold text-[#E5E7EB]">
                        Nome:
                      </span>{" "}
                      {pedido.cliente.nome}
                    </p>
                    <p>
                      <span className="font-semibold text-[#E5E7EB]">
                        Email:
                      </span>{" "}
                      {pedido.cliente.email}
                    </p>
                    <p>
                      <span className="font-semibold text-[#E5E7EB]">
                        Endereço:
                      </span>{" "}
                      {pedido.cliente.endereco}
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#252C36] bg-[#11161D] p-5">
                  <div className="flex items-center gap-2 text-[#8B5CF6]">
                    <Wallet size={18} />
                    <h2 className="text-xl font-bold text-[#E5E7EB]">
                      Pagamento
                    </h2>
                  </div>

                  <p className="mt-4 text-[#9CA3AF]">
                    Forma escolhida:{" "}
                    <span className="font-semibold capitalize text-[#E5E7EB]">
                      {pedido.cliente.pagamento}
                    </span>
                  </p>
                </div>
              </div>

              <aside className="rounded-[24px] border border-[#252C36] bg-[#11161D] p-5">
                <h2 className="text-2xl font-bold text-[#E5E7EB]">
                  Resumo do pedido
                </h2>

                <div className="mt-6 space-y-3">
                  {pedido.itens.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl border border-[#252C36] bg-[#151B23] px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-[#E5E7EB]">
                          {item.name}
                        </p>
                        <p className="text-sm text-[#9CA3AF]">
                          Quantidade: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-[#8B5CF6]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#252C36] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#E5E7EB]">
                      Total
                    </span>
                    <span className="text-3xl font-extrabold tracking-tight text-[#8B5CF6]">
                      {formatPrice(pedido.total)}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="mt-10 rounded-[24px] border border-[#252C36] bg-[#11161D] p-6">
              <p className="text-[#9CA3AF]">
                Não foi possível carregar os detalhes do pedido.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
