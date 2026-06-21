"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useToast } from "@/context/ToastContext";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

type User = {
  email: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { user, isLoggedIn } = useUser();
  const { cart, clearCart } = useCart();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("cartao");

  const parsedUser: User | null =
    typeof user === "string" ? JSON.parse(user) : user;

  // Preenche email se logado
  useEffect(() => {
    if (parsedUser?.email) {
      setEmail(parsedUser.email);
    }
  }, [parsedUser]);

  // ❗️PROTEÇÃO DO CHECKOUT (SÓ NA ENTRADA)
  useEffect(() => {
    if (cart.length === 0) {
      showToast("Seu carrinho está vazio.", "error");
      router.replace("/");
    }
    // ⚠️ roda apenas na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function finalizarPedido(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoggedIn || !parsedUser) {
      showToast("Você precisa estar logado para finalizar o pedido.", "error");
      router.push("/login");
      return;
    }

    if (!nome || !email || !endereco || !pagamento) {
      showToast("Preencha todos os campos!", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Seu carrinho está vazio!", "error");
      return;
    }

    const pedidosSalvos = localStorage.getItem("pedidos");
    const pedidosAntigos = pedidosSalvos ? JSON.parse(pedidosSalvos) : [];

    const novoPedido = {
      id: Date.now(),
      nome,
      email,
      endereco,
      pagamento,
      itens: cart,
      total,
      createdAt: new Date().toISOString(),
      userEmail: parsedUser.email,
    };

    localStorage.setItem(
      "pedidos",
      JSON.stringify([...pedidosAntigos, novoPedido]),
    );

    sessionStorage.setItem("ultimoPedido", JSON.stringify(novoPedido));

    clearCart();

    showToast("Pedido finalizado com sucesso!", "success");
    router.push("/sucesso");
  }

  return (
    <>
      <Header />

      <main>
        <section className="mx-auto max-w-5xl px-4 py-10">
          <h1 className="mb-6 text-3xl font-bold text-purple-400">
            Finalizar compra
          </h1>

          <form
            onSubmit={finalizarPedido}
            className="grid gap-6 md:grid-cols-2"
          >
            <div className="space-y-4 rounded-xl bg-slate-800 p-6">
              <input
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-lg bg-slate-900 p-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-slate-900 p-3"
              />

              <input
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full rounded-lg bg-slate-900 p-3"
              />

              <select
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                className="w-full rounded-lg bg-slate-900 p-3"
              >
                <option value="cartao">Cartão</option>
                <option value="pix">PIX</option>
                <option value="boleto">Boleto</option>
              </select>

              <button
                type="submit"
                className="w-full rounded-lg bg-purple-600 py-3 font-bold"
              >
                Finalizar pedido
              </button>
            </div>

            <div className="rounded-xl bg-slate-800 p-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="mt-4 text-right font-bold">
                Total: R$ {total.toFixed(2)}
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
