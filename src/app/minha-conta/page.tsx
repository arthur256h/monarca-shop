"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  ShoppingBag,
  Home,
} from "lucide-react";

export default function PerfilPage() {
  const { user, isLoggedIn, logout } = useUser();
  const router = useRouter();

  // 🔐 Proteção da rota
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) return null;

  const isAdmin = user.role === "admin";

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-10 text-white">
        <div className="rounded-2xl bg-[#1e293b] p-8 shadow-xl">
          {/* TOPO */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-purple-400">Meu Perfil</h1>
              <p className="text-sm text-gray-400">Gerencie suas informações</p>
            </div>
          </div>

          {/* DADOS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-[#0f172a] p-4">
              <User className="text-purple-400" />
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-[#0f172a] p-4">
              <Mail className="text-purple-400" />
              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-[#0f172a] p-4">
              <ShieldCheck
                className={isAdmin ? "text-yellow-400" : "text-green-400"}
              />
              <span className="font-medium">
                {isAdmin ? "Administrador" : "Cliente"}
              </span>
            </div>
          </div>

          {/* AÇÕES */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => router.push("/pedidos")}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-bold transition hover:bg-purple-700"
            >
              <ShoppingBag size={20} />
              Meus pedidos
            </button>

            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-700 px-5 py-3 font-bold transition hover:bg-slate-600"
            >
              <Home size={20} />
              Voltar para Home
            </button>
          </div>

          {/* LOGOUT */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-700"
            >
              <LogOut size={20} />
              Sair da conta
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
