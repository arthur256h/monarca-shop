"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";

type StoredUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export default function RegisterPage() {
  const { login } = useUser();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      showToast("Preencha todos os campos.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Email inválido. Digite novamente.", "error");
      emailRef.current?.focus();
      return;
    }

    if (password.length < 6) {
      showToast("A senha deve ter no mínimo 6 caracteres.", "error");
      passwordRef.current?.focus();
      return;
    }

    if (password !== confirmPassword) {
      showToast("As senhas não conferem.", "error");
      confirmRef.current?.focus();
      return;
    }

    const users: StoredUser[] = JSON.parse(
      localStorage.getItem("users") || "[]",
    );

    if (users.some((u) => u.email === email)) {
      showToast("Este email já está cadastrado.", "error");
      return;
    }

    const role: "admin" | "user" =
      email === "admin@monarca.com" ? "admin" : "user";

    const newUser: StoredUser = {
      name,
      email,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // login automático após cadastro
    login({ name, email, role });

    showToast("Conta criada com sucesso!", "success");

    router.push(role === "admin" ? "/admin" : "/");
  }

  return (
    <>
      <Header />

      <main>
        <section className="mx-auto max-w-md px-4 py-10">
          <div className="rounded-2xl bg-[#1e293b] p-8 shadow-lg">
            <h1 className="mb-6 text-3xl font-bold text-purple-400">
              Criar Conta
            </h1>

            <div className="space-y-4">
              {/* Nome */}
              <input
                ref={nameRef}
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && emailRef.current?.focus()
                }
                className="w-full rounded-xl bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              {/* Email */}
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!isValidEmail(email)) {
                      showToast("Email inválido.", "error");
                      return;
                    }
                    passwordRef.current?.focus();
                  }
                }}
                className="w-full rounded-xl bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              {/* Senha */}
              <input
                ref={passwordRef}
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && confirmRef.current?.focus()
                }
                className="w-full rounded-xl bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              {/* Confirmar senha */}
              <input
                ref={confirmRef}
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                className="w-full rounded-xl bg-[#0f172a] px-4 py-3 text-white outline-none"
              />

              <button
                onClick={handleRegister}
                className="w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Criar Conta
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
