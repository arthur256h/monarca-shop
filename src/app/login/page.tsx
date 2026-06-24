"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

/* ===================== CONST ===================== */

const ADMIN_EMAIL = "admin@monarca.com";

/* ===================== COMPONENTE ===================== */

export default function LoginPage() {
  const { login } = useUser();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ===================== VALIDAÇÃO ===================== */

  function emailValido(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ===================== LOGIN ===================== */

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast("Preencha todos os campos.", "error");
      return;
    }

    if (!emailValido(email)) {
      showToast("E-mail inválido.", "error");
      return;
    }

    // 🔹 TIPAGEM CORRETA (corrige o erro da build)
    const role: "admin" | "user" = email === ADMIN_EMAIL ? "admin" : "user";

    const user = {
      name,
      email,
      role,
    };

    // 🔹 Contexto
    login(user);

    // 🔹 Cookie (para proteger /admin/*)
    document.cookie = `user=${JSON.stringify(user)}; path=/`;

    showToast("Login realizado com sucesso!", "success");

    // 🔹 Redirecionamento
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }

  /* ===================== JSX ===================== */

  return (
    <>
      <Header />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-4 rounded-xl bg-[#1e293b] p-6"
        >
          <h1 className="text-center text-2xl font-bold text-purple-400">
            Entrar na conta
          </h1>

          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3 outline-none"
          />

          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-[#0f172a] p-3 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded bg-purple-600 py-3 font-semibold transition hover:bg-purple-700"
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  );
}
