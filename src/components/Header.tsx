"use client";

import { ShoppingCart, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export default function Header() {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    const cart: CartItem[] = saved ? JSON.parse(saved) : [];
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#252C36] bg-[#0B0F14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-[#E5E7EB]">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-[#E5E7EB] transition hover:text-[#8B5CF6]"
        >
          MonarcaShop
        </Link>

        <nav className="flex flex-wrap items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#9CA3AF] transition hover:bg-white/5 hover:text-[#E5E7EB]"
          >
            <Home size={18} />
            Início
          </Link>

          <Link
            href="/carrinho"
            className="flex items-center gap-2 rounded-full border border-[#2D3642] bg-[#151B23] px-4 py-2 text-sm font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:text-white"
          >
            <ShoppingCart size={18} />
            Carrinho ({totalItems})
          </Link>
        </nav>
      </div>
    </header>
  );
}
