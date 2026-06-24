"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function animateItem(id: number) {
    setAnimatingId(id);
    setTimeout(() => setAnimatingId(null), 300);
  }

  function handleIncrease(id: number) {
    increaseQuantity(id);
    animateItem(id);
    showToast("Quantidade aumentada", "success");
  }

  function handleDecrease(id: number) {
    decreaseQuantity(id);
    animateItem(id);
    showToast("Quantidade reduzida", "success");
  }

  function handleRemove(id: number) {
    removeFromCart(id);
    showToast("Produto removido do carrinho", "error");
  }

  return (
    <>
      {/* 🔥 HEADER PADRÃO (HOME, FAVORITOS, PEDIDOS, ETC) */}
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 text-white">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#1e293b] p-10 text-center">
            <h1 className="mb-2 text-2xl font-bold text-white">
              Seu carrinho está vazio
            </h1>

            <p className="mb-6 text-gray-400">
              Adicione produtos para continuar sua compra.
            </p>

            <Link
              href="/"
              className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Voltar para a loja
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-8 text-3xl font-bold text-purple-400">
              Carrinho
            </h1>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* LISTA */}
              <div className="space-y-4 lg:col-span-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 rounded-2xl bg-[#1e293b] p-4 transition-all ${
                      animatingId === item.id
                        ? "scale-105 shadow-lg shadow-black/30"
                        : ""
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded-xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* CONTROLES */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDecrease(item.id)}
                            className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="min-w-[24px] text-center text-white">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrease(item.id)}
                            className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* PREÇO */}
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-green-400">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>

                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-400 transition hover:scale-110 hover:text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RESUMO */}
              <aside className="h-fit rounded-2xl bg-[#1e293b] p-6">
                <h2 className="mb-6 text-xl font-bold text-white">
                  Resumo da compra
                </h2>

                <div className="mb-4 flex justify-between text-gray-300">
                  <span>Total</span>
                  <span className="font-bold text-green-400">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="mb-3 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Finalizar compra
                </button>

                <Link
                  href="/"
                  className="block w-full rounded-xl bg-purple-600 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
                >
                  Continuar comprando
                </Link>
              </aside>
            </div>
          </>
        )}
      </main>
    </>
  );
}
