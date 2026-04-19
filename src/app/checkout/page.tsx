"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user, isLoggedIn } = useUser();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("");

  useEffect(() => {
    if (user) {
      setNome(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function finalizarCompra() {
    if (!nome || !email || !endereco || !pagamento) {
      alert("Preencha todos os campos.");
      return;
    }

    const pedido = {
      id: Date.now(),
      nome,
      email,
      endereco,
      pagamento,
      itens: cart,
      total,
      createdAt: new Date().toISOString(),
      userEmail: email,
    };

    const pedidosSalvos = localStorage.getItem("pedidos");
    const pedidos = pedidosSalvos ? JSON.parse(pedidosSalvos) : [];

    pedidos.push(pedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    sessionStorage.setItem("ultimoPedido", JSON.stringify(pedido));

    clearCart();
    router.push("/pedido-confirmado");
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-[#1e293b] p-6 text-center shadow-lg">
            <h1 className="mb-3 text-3xl font-bold text-purple-400">
              Checkout
            </h1>
            <p className="text-gray-300">Seu carrinho está vazio.</p>
          </div>
        </section>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-[#1e293b] p-8 text-center shadow-lg">
            <h1 className="mb-4 text-3xl font-bold text-purple-400">
              Login necessário
            </h1>

            <p className="mb-6 text-lg text-gray-300">
              Você precisa estar logado para finalizar sua compra.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Ir para login
              </Link>

              <Link
                href="/carrinho"
                className="rounded-xl bg-gray-700 px-6 py-3 font-semibold text-white transition hover:bg-gray-600"
              >
                Voltar ao carrinho
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-purple-400">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Dados do cliente</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-lg bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Seu endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full rounded-lg bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              <select
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                className="w-full rounded-lg bg-[#0f172a] px-4 py-3 text-white outline-none"
              >
                <option value="">Forma de pagamento</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Resumo do pedido</h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-700 pb-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Quantidade: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-green-400">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-2xl font-bold">
                Total:{" "}
                <span className="text-green-400">R$ {total.toFixed(2)}</span>
              </h3>

              <button
                onClick={finalizarCompra}
                className="mt-6 w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Confirmar pedido
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
