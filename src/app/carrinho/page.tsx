"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const { showToast } = useToast();
  const router = useRouter();

  // animação por item
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const firstRender = useRef(true);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
  }, [cart]);

  function handleIncrease(id: number) {
    setAnimatingId(id);
    increaseQuantity(id);
    showToast("Quantidade aumentada", "success");
    setTimeout(() => setAnimatingId(null), 300);
  }

  function handleDecrease(id: number) {
    setAnimatingId(id);
    decreaseQuantity(id);
    showToast("Quantidade reduzida", "success");
    setTimeout(() => setAnimatingId(null), 300);
  }

  function handleRemove(id: number) {
    removeFromCart(id);
    showToast("Produto removido do carrinho", "error");
  }

  // carrinho vazio
  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold text-white">
          Seu carrinho está vazio
        </h1>
        <p className="mb-6 text-gray-400">
          Adicione produtos para continuar sua compra.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-purple-700"
        >
          Voltar para a loja
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">Carrinho</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LISTA */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className={`flex gap-4 rounded-2xl bg-[#1e293b] p-4
                transition-all duration-300 ease-out will-change-transform
                ${
                  animatingId === item.id
                    ? "scale-[1.04] shadow-lg shadow-black/30"
                    : "scale-100"
                }
              `}
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
                  <h2 className="text-lg font-bold text-white">{item.name}</h2>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {/* CONTROLES */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="rounded-lg bg-gray-700 p-2 text-white transition hover:bg-gray-600"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-[24px] text-center text-white">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="rounded-lg bg-gray-700 p-2 text-white transition hover:bg-gray-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* PREÇO + REMOVER */}
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
            onClick={() => router.push("/sucesso")}
            className="mb-3 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:scale-105 hover:bg-green-700"
          >
            Finalizar compra
          </button>

          <Link
            href="/"
            className="block w-full rounded-xl bg-purple-600 py-3 text-center font-semibold text-white transition hover:scale-105 hover:bg-purple-700"
          >
            Continuar comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
