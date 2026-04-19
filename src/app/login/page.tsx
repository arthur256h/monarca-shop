"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const { login } = useUser();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleLogin() {
    if (!name || !email) {
      showToast("Preencha nome e email.", "error");
      return;
    }

    login({ name, email });
    showToast("Login realizado com sucesso.", "success");
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl bg-[#1e293b] p-8 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold text-purple-400">Entrar</h1>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-[#0f172a] px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-[#0f172a] px-4 py-3 text-white outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Entrar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
