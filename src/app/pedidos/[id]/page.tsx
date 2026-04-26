"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  CheckCircle,
  Truck,
  XCircle,
  Clock,
} from "lucide-react";

type PedidoItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
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
  status?: "processando" | "enviado" | "entregue" | "cancelado";
};

export default function DetalhesPedidoPage() {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const params = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useUser();
  const { showToast } = useToast();
  const { clearCart, addToCart } = useCart();

  useEffect(() => {
    if (!user) return;

    const pedidoId = Number(params.id);
    const pedidosSalvos = localStorage.getItem("pedidos");
    const todosPedidos: Pedido[] = pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [];

    const pedidoEncontrado = todosPedidos.find(
      (item) => item.id === pedidoId && item.userEmail === user.email,
    );

    if (pedidoEncontrado) {
      setPedido(pedidoEncontrado);
    }
  }, [params.id, user]);

  function traduzirPagamento(pagamento: string) {
    if (pagamento === "cartao") return "Cartão de Crédito";
    if (pagamento === "pix") return "PIX";
    if (pagamento === "boleto") return "Boleto";
    return pagamento;
  }

  function traduzirStatus(status?: string) {
    if (status === "enviado") return "Enviado";
    if (status === "entregue") return "Entregue";
    if (status === "cancelado") return "Cancelado";
    return "Processando";
  }

  function corStatus(status?: string) {
    if (status === "enviado") return "text-blue-400";
    if (status === "entregue") return "text-green-400";
    if (status === "cancelado") return "text-red-400";
    return "text-yellow-400";
  }

  function statusAtivo(statusTimeline: string) {
    const statusAtual = pedido?.status || "processando";

    if (statusAtual === "cancelado") {
      return statusTimeline === "cancelado";
    }

    const ordem = ["processando", "enviado", "entregue"];
    return ordem.indexOf(statusTimeline) <= ordem.indexOf(statusAtual);
  }

  function cancelarPedido() {
    if (!pedido || !user) return;

    const pedidosSalvos = localStorage.getItem("pedidos");
    const todosPedidos: Pedido[] = pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [];

    const pedidosAtualizados = todosPedidos.map((item) =>
      item.id === pedido.id && item.userEmail === user.email
        ? { ...item, status: "cancelado" as const }
        : item,
    );

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));

    setPedido({
      ...pedido,
      status: "cancelado",
    });

    showToast("Pedido cancelado com sucesso!", "success");
  }

  function comprarNovamente() {
    if (!pedido) return;

    clearCart();

    pedido.itens.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description || "",
      });

      for (let i = 1; i < item.quantity; i++) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description || "",
        });
      }
    });

    showToast("Produtos adicionados ao carrinho!", "success");
    router.push("/carrinho");
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-[#1e293b] p-6 text-center">
            <p className="text-lg">
              Você precisa estar logado para ver detalhes do pedido.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!pedido) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <Link
            href="/pedidos"
            className="mb-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft size={18} />
            Voltar para pedidos
          </Link>

          <div className="rounded-2xl bg-[#1e293b] p-6 text-center">
            <p className="text-lg">Pedido não encontrado.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/pedidos"
          className="mb-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
        >
          <ArrowLeft size={18} />
          Voltar para pedidos
        </Link>

        <div className="mb-6 rounded-2xl bg-[#1e293b] p-6 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <Package size={28} className="text-purple-400" />

            <div>
              <h1 className="text-3xl font-bold text-purple-400">
                Pedido #{pedido.id}
              </h1>

              <p className="text-gray-400">
                Feito em{" "}
                {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-[#0f172a] p-4">
              <p className="text-sm text-gray-400">Status</p>
              <p className={`font-bold ${corStatus(pedido.status)}`}>
                {traduzirStatus(pedido.status)}
              </p>
            </div>

            <div className="rounded-xl bg-[#0f172a] p-4">
              <p className="text-sm text-gray-400">Pagamento</p>
              <p className="font-bold">{traduzirPagamento(pedido.pagamento)}</p>
            </div>

            <div className="rounded-xl bg-[#0f172a] p-4">
              <p className="text-sm text-gray-400">Cliente</p>
              <p className="font-bold">{pedido.nome}</p>
            </div>

            <div className="rounded-xl bg-[#0f172a] p-4">
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-xl font-bold text-green-400">
                R$ {pedido.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#0f172a] p-4">
            <p className="text-sm text-gray-400">Endereço de entrega</p>
            <p className="font-medium">{pedido.endereco}</p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-[#1e293b] p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-purple-400">
            Acompanhamento do pedido
          </h2>

          {pedido.status === "cancelado" ? (
            <div className="flex items-center gap-4 rounded-xl bg-red-500/10 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                <XCircle size={26} className="text-white" />
              </div>

              <div>
                <p className="font-bold text-red-400">Pedido cancelado</p>
                <p className="text-sm text-gray-400">
                  Este pedido foi cancelado e não seguirá para envio.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div
                className={`rounded-xl p-4 ${
                  statusAtivo("processando")
                    ? "bg-yellow-500/10"
                    : "bg-[#0f172a]"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      statusAtivo("processando")
                        ? "bg-yellow-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <Clock size={22} className="text-white" />
                  </div>

                  <p
                    className={`font-bold ${
                      statusAtivo("processando")
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    Processando
                  </p>
                </div>

                <p className="text-sm text-gray-400">
                  Seu pedido foi recebido e está sendo preparado.
                </p>
              </div>

              <div
                className={`rounded-xl p-4 ${
                  statusAtivo("enviado") ? "bg-blue-500/10" : "bg-[#0f172a]"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      statusAtivo("enviado") ? "bg-blue-500" : "bg-gray-700"
                    }`}
                  >
                    <Truck size={22} className="text-white" />
                  </div>

                  <p
                    className={`font-bold ${
                      statusAtivo("enviado") ? "text-blue-400" : "text-gray-400"
                    }`}
                  >
                    Enviado
                  </p>
                </div>

                <p className="text-sm text-gray-400">
                  Seu pedido saiu para entrega.
                </p>
              </div>

              <div
                className={`rounded-xl p-4 ${
                  statusAtivo("entregue") ? "bg-green-500/10" : "bg-[#0f172a]"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      statusAtivo("entregue") ? "bg-green-500" : "bg-gray-700"
                    }`}
                  >
                    <CheckCircle size={22} className="text-white" />
                  </div>

                  <p
                    className={`font-bold ${
                      statusAtivo("entregue")
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    Entregue
                  </p>
                </div>

                <p className="text-sm text-gray-400">
                  Seu pedido foi entregue com sucesso.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-purple-400">
            Itens do pedido
          </h2>

          <div className="space-y-4">
            {pedido.itens.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl bg-[#0f172a] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Quantidade: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-400">
                      Unidade: R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <p className="text-lg font-bold text-green-400">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-gray-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-2xl font-bold">
              Total:{" "}
              <span className="text-green-400">
                R$ {pedido.total.toFixed(2)}
              </span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              {pedido.status !== "cancelado" && (
                <button
                  onClick={cancelarPedido}
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  Cancelar pedido
                </button>
              )}

              <button
                onClick={comprarNovamente}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
              >
                <ShoppingCart size={20} />
                Comprar novamente
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
