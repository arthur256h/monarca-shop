"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Header from "@/components/Header";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/format";

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
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      {toast && (
        <div className="fixed right-4 top-24 z-50 w-[360px] max-w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#151B23]/95 shadow-2xl backdrop-blur-md animate-[toastIn_.35s_ease]">
          <div className="flex items-start gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 size={20} />
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
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]">
              Seu pedido
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
              Carrinho
            </h1>
          </div>

          {cart.length > 0 && (
            <div className="rounded-2xl border border-[#252C36] bg-[#151B23] px-4 py-3 text-sm text-[#9CA3AF]">
              {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[28px] border border-[#252C36] bg-[#151B23] p-10 shadow-xl">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#2D3642] bg-[#11161D] text-[#8B5CF6]">
                <ShoppingBag size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#E5E7EB]">
                Seu carrinho está vazio
              </h2>

              <p className="mt-3 text-[#9CA3AF]">
                Explore os produtos da loja e adicione os itens que combinam com
                o seu setup.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-5">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 rounded-[28px] border border-[#252C36] bg-[#151B23] p-5 shadow-xl transition hover:border-[#8B5CF6]/20"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="overflow-hidden rounded-2xl border border-[#252C36] bg-[#11161D]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-24 w-24 object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-[#E5E7EB]">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-[#9CA3AF]">
                          {item.description}
                        </p>

                        <p className="mt-2 text-base font-semibold text-[#8B5CF6]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500/20"
                      type="button"
                    >
                      <Trash2 size={16} />
                      Remover
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-[#252C36] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2D3642] bg-[#11161D] text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
                        type="button"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-10 text-center text-lg font-semibold text-[#E5E7EB]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increase(item.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2D3642] bg-[#11161D] text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
                        type="button"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm uppercase tracking-[0.18em] text-[#6B7280]">
                        Subtotal
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-[#E5E7EB]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[28px] border border-[#252C36] bg-[#151B23] p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-[#E5E7EB]">Resumo</h2>

              <div className="mt-6 space-y-4 border-b border-[#252C36] pb-5 text-[#9CA3AF]">
                <div className="flex items-center justify-between">
                  <span>Itens</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Entrega</span>
                  <span className="text-emerald-400">Grátis</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#E5E7EB]">
                  Total
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-[#8B5CF6]">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 text-center font-semibold text-[#E5E7EB] shadow-lg transition duration-300 hover:border-[#8B5CF6] hover:bg-[#1A2230] active:scale-[0.98]"
              >
                <span className="relative flex items-center gap-2">
                  <CreditCard size={18} />
                  <span>Finalizar compra</span>
                </span>
              </Link>

              <Link
                href="/"
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[#252C36] bg-transparent px-6 py-3 text-center font-medium text-[#9CA3AF] transition hover:border-[#8B5CF6]/40 hover:text-[#E5E7EB]"
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
