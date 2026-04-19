"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ReceiptText,
  ShoppingCart,
  User,
  LogOut,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Header() {
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const { user, isLoggedIn, logout } = useUser();
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <header className="border-b border-gray-800 bg-[#111827] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-2xl font-bold text-purple-400">
          Monarca Store
        </Link>

        <nav className="flex flex-wrap items-center gap-3 md:gap-5">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive("/")
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <House size={20} />
            <span>Início</span>
          </Link>

          <Link
            href="/favoritos"
            className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive("/favoritos")
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Heart size={20} />
            <span>Favoritos</span>

            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            href="/pedidos"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive("/pedidos")
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <ReceiptText size={20} />
            <span>Pedidos</span>
          </Link>

          <Link
            href="/carrinho"
            className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive("/carrinho")
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <ShoppingCart size={20} />
            <span>Carrinho</span>

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 rounded-xl bg-[#1e293b] px-3 py-2">
              <User size={18} className="text-purple-300" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>

              <button
                onClick={logout}
                className="ml-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                <span className="hidden sm:inline">Sair</span>
                <span className="sm:hidden">
                  <LogOut size={16} />
                </span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/login")
                  ? "bg-purple-600 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              <User size={20} />
              <span>Entrar</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
