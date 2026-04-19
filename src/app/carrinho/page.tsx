"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CarrinhoPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const [toast, setToast] = useState("");
  const router = useRouter();

  useEffect(() => {
    const added = sessionStorage.getItem("addedToCart");

    if (added === "true") {
      setToast("Produto adicionado ao carrinho!");
      sessionStorage.removeItem("addedToCart");

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-purple-400">
          Seu Carrinho
        </h1>

        {toast && (
          <div className="mb-4 rounded-lg bg-green-600 px-4 py-3 text-white">
            {toast}
          </div>
        )}

        {cart.length === 0 ? (
          <p className="text-gray-300">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl bg-[#1e293b] p-4 shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-300">R$ {item.price.toFixed(2)}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="rounded bg-gray-700 px-3 py-1"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="rounded bg-gray-700 px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <p className="font-bold text-green-400">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-[#1e293b] p-6 text-right shadow-lg">
              <h2 className="text-2xl font-bold">
                Total:{" "}
                <span className="text-green-400">R$ {total.toFixed(2)}</span>
              </h2>

              <button
                onClick={() => router.push("/checkout")}
                className="mt-4 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
