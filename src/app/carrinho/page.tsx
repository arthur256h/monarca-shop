"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CarrinhoPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const { showToast } = useToast();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function handleRemove(id: number) {
    removeFromCart(id);
    showToast("Produto removido do carrinho.", "error");
  }

  function handleIncrease(id: number) {
    increaseQuantity(id);
  }

  function handleDecrease(id: number) {
    decreaseQuantity(id);
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center gap-3">
          <ShoppingBag className="text-purple-400" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-purple-400">Meu carrinho</h1>
            <p className="text-sm text-gray-400">
              Confira seus produtos antes de finalizar a compra.
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl bg-[#1e293b] p-8 text-center shadow-lg">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Seu carrinho está vazio
            </h2>

            <p className="mb-6 text-gray-300">
              Adicione produtos para continuar sua compra.
            </p>

            <Link
              href="/"
              className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#1e293b] p-5 shadow-lg"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-full rounded-xl object-cover sm:w-32"
                    />

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {item.name}
                        </h2>

                        <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                          {item.description}
                        </p>

                        <p className="mt-3 text-lg font-bold text-green-400">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex w-fit items-center rounded-xl bg-[#0f172a]">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="rounded-l-xl px-4 py-3 text-white transition hover:bg-gray-700"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="min-w-10 px-4 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="rounded-r-xl px-4 py-3 text-white transition hover:bg-gray-700"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex w-fit items-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                          Remover
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-700 pt-4 sm:w-32 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                      <p className="text-sm text-gray-400">Subtotal</p>
                      <p className="text-xl font-bold text-green-400">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-2xl bg-[#1e293b] p-6 shadow-lg">
              <h2 className="mb-5 text-2xl font-bold text-purple-400">
                Resumo da compra
              </h2>

              <div className="space-y-4 border-b border-gray-700 pb-5">
                <div className="flex justify-between text-gray-300">
                  <span>Produtos</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Itens no total</span>
                  <span>
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Frete</span>
                  <span className="text-green-400">Grátis</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-3xl font-bold text-green-400">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
              >
                Finalizar compra
              </Link>

              <Link
                href="/"
                className="mt-3 block w-full rounded-xl bg-gray-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
              >
                Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
