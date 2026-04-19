"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type PedidoItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

type Pedido = {
  nome: string;
  email: string;
  endereco: string;
  pagamento: string;
  itens: PedidoItem[];
  total: number;
};

export default function PedidoConfirmadoPage() {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [numeroPedido, setNumeroPedido] = useState("");
  const [dataPedido, setDataPedido] = useState("");
  const [prazoEntrega, setPrazoEntrega] = useState("");
  const [statusPagamento, setStatusPagamento] = useState("");

  useEffect(() => {
    const pedidoSalvo = sessionStorage.getItem("ultimoPedido");

    if (pedidoSalvo) {
      const pedidoConvertido = JSON.parse(pedidoSalvo);
      setPedido(pedidoConvertido);

      if (pedidoConvertido.pagamento === "cartao") {
        setStatusPagamento("Pagamento aprovado no cartão.");
      } else if (pedidoConvertido.pagamento === "pix") {
        setStatusPagamento("Pagamento confirmado via PIX.");
      } else if (pedidoConvertido.pagamento === "boleto") {
        setStatusPagamento("Boleto gerado com sucesso.");
      } else {
        setStatusPagamento("Pagamento registrado.");
      }
    }

    const numeroGerado = `PED-${Date.now().toString().slice(-6)}`;
    setNumeroPedido(numeroGerado);

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setDataPedido(`${dataFormatada} às ${horaFormatada}`);

    const entrega = new Date();
    entrega.setDate(entrega.getDate() + 5);

    const entregaFormatada = entrega.toLocaleDateString("pt-BR");
    setPrazoEntrega(`Previsão de entrega até ${entregaFormatada}`);
  }, []);

  function traduzirPagamento(pagamento: string) {
    if (pagamento === "cartao") return "Cartão de Crédito";
    if (pagamento === "pix") return "PIX";
    if (pagamento === "boleto") return "Boleto";
    return pagamento;
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-[#1e293b] p-8 shadow-lg">
          <div className="mb-8 border-b border-gray-700 pb-6">
            <h1 className="mb-3 text-3xl font-bold text-green-400">
              Pedido confirmado com sucesso!
            </h1>

            <p className="text-gray-300">
              Seu pedido foi recebido e agora está em processamento. Acompanhe
              abaixo os detalhes da compra.
            </p>
          </div>

          {pedido ? (
            <>
              <div className="mb-8 rounded-xl bg-[#0f172a] p-6">
                <h2 className="mb-4 text-xl font-semibold text-purple-400">
                  Acompanhamento do pedido
                </h2>

                <div className="mb-4 grid gap-4 md:grid-cols-4">
                  <div className="rounded-lg bg-green-600 px-4 py-3 text-center font-semibold">
                    Pedido realizado
                  </div>
                  <div className="rounded-lg bg-green-600 px-4 py-3 text-center font-semibold">
                    Pagamento confirmado
                  </div>
                  <div className="rounded-lg bg-gray-700 px-4 py-3 text-center font-semibold">
                    Em preparação
                  </div>
                  <div className="rounded-lg bg-gray-700 px-4 py-3 text-center font-semibold">
                    Entrega
                  </div>
                </div>

                <p className="text-sm text-gray-300">{prazoEntrega}</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="rounded-xl bg-[#0f172a] p-5">
                    <h2 className="mb-4 text-xl font-semibold text-purple-400">
                      Informações do pedido
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">
                          Número do pedido
                        </p>
                        <p className="text-lg font-medium">{numeroPedido}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Data da compra</p>
                        <p className="text-lg font-medium">{dataPedido}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">
                          Forma de pagamento
                        </p>
                        <p className="text-lg font-medium">
                          {traduzirPagamento(pedido.pagamento)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">
                          Status do pagamento
                        </p>
                        <p className="text-lg font-medium text-green-400">
                          {statusPagamento}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Total pago</p>
                        <p className="text-2xl font-bold text-green-400">
                          R$ {pedido.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0f172a] p-5">
                    <h2 className="mb-4 text-xl font-semibold text-purple-400">
                      Dados do cliente
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Nome</p>
                        <p className="text-lg font-medium">{pedido.nome}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-lg font-medium">{pedido.email}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">
                          Endereço de entrega
                        </p>
                        <p className="text-lg font-medium">{pedido.endereco}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0f172a] p-5">
                    <h2 className="mb-4 text-xl font-semibold text-purple-400">
                      Próximas etapas
                    </h2>

                    <ul className="space-y-2 text-gray-300">
                      <li>• Seu pagamento já foi registrado no sistema.</li>
                      <li>• Seu pedido será separado para envio.</li>
                      <li>• Em breve ele seguirá para entrega.</li>
                      <li>• Você pode continuar comprando normalmente.</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl bg-[#0f172a] p-5">
                  <h2 className="mb-4 text-xl font-semibold text-purple-400">
                    Resumo dos itens
                  </h2>

                  <div className="space-y-4">
                    {pedido.itens.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-gray-700 bg-[#111827] p-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {item.description}
                            </p>
                            <p className="mt-2 text-sm text-gray-300">
                              Quantidade: {item.quantity}
                            </p>
                            <p className="text-sm text-gray-300">
                              Preço unitário: R$ {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 border-t border-gray-700 pt-3 text-right">
                          <p className="text-sm text-gray-400">
                            Subtotal do item
                          </p>
                          <p className="text-lg font-bold text-green-400">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="text-gray-300">Total final</span>
                      <span className="text-2xl font-bold text-green-400">
                        R$ {pedido.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl bg-[#0f172a] p-6 text-center">
              <p className="text-lg text-gray-300">Nenhum pedido encontrado.</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
            >
              Voltar para a loja
            </Link>

            <Link
              href="/carrinho"
              className="rounded-xl bg-gray-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
            >
              Ir para o carrinho
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
