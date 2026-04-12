"use client";

import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import Header from "@/components/Header";
import { products } from "@/data/products";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export default function CarrinhoPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      const currentCart: CartItem[] = saved ? JSON.parse(saved) : [];

      const search = window.location.search;
      const params = new URLSearchParams(search);
      const addId = params.get("add");

      if (addId) {
        const productId = Number(addId);
        const product = products.find((p) => p.id === productId);

        if (product) {
          const existingItem = currentCart.find(
            (item) => item.id === product.id,
          );

          let updatedCart: CartItem[];

          if (existingItem) {
            updatedCart = currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          } else {
            updatedCart = [...currentCart, { ...product, quantity: 1 }];
          }

          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCart(updatedCart);
          setToast(`${product.name} foi adicionado ao carrinho`);

          setTimeout(() => {
            setToast("");
          }, 2500);

          window.history.replaceState({}, "", "/carrinho");
          return;
        }
      }

      setCart(currentCart);
    } catch {
      localStorage.removeItem("cart");
      setCart([]);
    }
  }, []);

  function updateCart(updatedCart: CartItem[]) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function removeFromCart(id: number) {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  }

  function increase(id: number) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    updateCart(updatedCart);
  }

  function decrease(id: number) {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      {toast && (
        <div className="fixed right-4 top-24 z-50 w-[340px] max-w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#151B23]/95 shadow-2xl backdrop-blur-md animate-[toastIn_.35s_ease]">
          <div className="flex items-start gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              ✓
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-400">
                Produto adicionado
              </p>
              <p className="mt-1 text-sm text-[#E5E7EB]">{toast}</p>
            </div>
          </div>

          <div className="h-1 w-full bg-white/10">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 animate-[toastProgress_2.5s_linear_forwards]" />
          </div>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-extrabold">Carrinho</h1>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-[#252C36] bg-[#151B23] p-8 shadow-xl">
            <p className="text-lg text-[#9CA3AF]">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-[#252C36] bg-[#151B23] p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />

                    <div>
                      <h2 className="text-xl font-bold text-[#E5E7EB]">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-[#9CA3AF]">
                        R$ {item.price.toFixed(2)}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => decrease(item.id)}
                          className="rounded-xl border border-[#2D3642] bg-[#11161D] px-3 py-1 text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
                          type="button"
                        >
                          -
                        </button>

                        <span className="min-w-8 text-center font-semibold text-[#E5E7EB]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increase(item.id)}
                          className="rounded-xl border border-[#2D3642] bg-[#11161D] px-3 py-1 text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500/20"
                    type="button"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-3xl border border-[#252C36] bg-[#151B23] p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-[#E5E7EB]">Resumo</h2>

              <div className="mt-6 flex items-center justify-between text-[#9CA3AF]">
                <span>Total</span>
                <span className="text-3xl font-extrabold text-[#8B5CF6]">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <a
                href="/checkout"
                className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 text-center font-semibold text-[#E5E7EB] shadow-lg transition duration-300 hover:border-[#8B5CF6] hover:bg-[#1A2230] active:scale-[0.98]"
              >
                <span className="relative flex items-center gap-2">
                  <CreditCard size={18} />
                  <span>Finalizar compra</span>
                </span>
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
