"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  ReceiptText,
  ShoppingCart,
  User,
  LogOut,
  Heart,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Header() {
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const { user, isLoggedIn, logout } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.email === "admin@monarca.com";

  function isActive(path: string) {
    return pathname === path;
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="border-b border-gray-800 bg-[#111827] px-4 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-purple-400"
        >
          Monarca Store
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg bg-[#1e293b] p-2 text-white md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden items-center gap-5 md:flex">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive("/")
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <House size={20} />
            Início
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
            Favoritos
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
            Pedidos
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
            Carrinho
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <Link
              href="/minha-conta"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/minha-conta")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <User size={20} />
              Minha conta
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/admin")
                  ? "bg-purple-600 text-white"
                  : "text-yellow-400 hover:bg-gray-800 hover:text-yellow-300"
              }`}
            >
              <Shield size={20} />
              Admin
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <LogOut size={16} />
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              <User size={20} />
              Entrar
            </Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <nav className="mx-auto mt-4 flex max-w-6xl flex-col gap-3 rounded-2xl bg-[#1e293b] p-4 md:hidden">
          <Link href="/" onClick={closeMenu}>
            Início
          </Link>

          <Link href="/favoritos" onClick={closeMenu}>
            Favoritos ({favorites.length})
          </Link>

          <Link href="/pedidos" onClick={closeMenu}>
            Pedidos
          </Link>

          <Link href="/carrinho" onClick={closeMenu}>
            Carrinho ({totalItems})
          </Link>

          {isLoggedIn && (
            <Link href="/minha-conta" onClick={closeMenu}>
              Minha conta
            </Link>
          )}

          {isAdmin && (
            <Link href="/admin" onClick={closeMenu}>
              Admin
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-3 py-2 text-white"
            >
              Sair
            </button>
          ) : (
            <Link href="/login" onClick={closeMenu}>
              Entrar
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
