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
import { useEffect, useRef, useState } from "react";
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

  const [animateCart, setAnimateCart] = useState(false);
  const [animateFav, setAnimateFav] = useState(false);

  const firstCartRender = useRef(true);
  const firstFavRender = useRef(true);

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

  useEffect(() => {
    if (firstCartRender.current) {
      firstCartRender.current = false;
      return;
    }
    setAnimateCart(true);
    const t = setTimeout(() => setAnimateCart(false), 300);
    return () => clearTimeout(t);
  }, [totalItems]);

  useEffect(() => {
    if (firstFavRender.current) {
      firstFavRender.current = false;
      return;
    }
    setAnimateFav(true);
    const t = setTimeout(() => setAnimateFav(false), 300);
    return () => clearTimeout(t);
  }, [favorites.length]);

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] px-4 py-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-purple-400">
          Monarca Store
        </Link>

        {/* MENU MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg bg-[#1e293b] p-2 text-white transition hover:scale-110 md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MENU DESKTOP */}
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
              <span
                className={`absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white transition ${
                  animateFav ? "scale-125" : "scale-100"
                }`}
              >
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
              <span
                className={`absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white transition ${
                  animateCart ? "scale-125" : "scale-100"
                }`}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* PERFIL / MINHA CONTA */}
          <Link
            href={isLoggedIn ? "/minha-conta" : "/login"}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive("/minha-conta") || isActive("/login")
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <User size={20} />
            {isLoggedIn ? "Perfil" : "Minha conta"}
          </Link>

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

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-red-700"
            >
              <LogOut size={16} />
            </button>
          )}
        </nav>
      </div>

      {/* MENU MOBILE EXPANDIDO */}
      {menuOpen && (
        <nav className="mx-auto mt-4 flex max-w-6xl animate-slideDown flex-col gap-3 rounded-2xl bg-[#1e293b] p-4 md:hidden">
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

          <Link
            href={isLoggedIn ? "/minha-conta" : "/login"}
            onClick={closeMenu}
          >
            {isLoggedIn ? "Perfil" : "Minha conta"}
          </Link>

          {isAdmin && (
            <Link href="/admin" onClick={closeMenu}>
              Admin
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
            >
              Sair
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
