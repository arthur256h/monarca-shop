"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useToast } from "@/context/ToastContext";
import { useUser } from "@/context/UserContext";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { user, isLoggedIn } = useUser();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("cartao");

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }

    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  function finalizarPedido(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoggedIn || !user) {
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
      userEmail: user.email,
    };

    const pedidosAtualizados = [...pedidosAntigos, novoPedido];

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
    localStorage.removeItem("cart");
    setCart([]);

    showToast("Pedido finalizado com sucesso!", "success");

    // 🔥 CORREÇÃO AQUI
    router.push("/pedidos");
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-purple-400">
          Finalizar compra
        </h1>

        <form onSubmit={finalizarPedido} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl bg-slate-800 p-6">
            <h2 className="text-xl font-bold">Dados do cliente</h2>

            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg bg-slate-900 p-3 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-slate-900 p-3 outline-none"
            />

            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full rounded-lg bg-slate-900 p-3 outline-none"
            />

            <select
              value={pagamento}
              onChange={(e) => setPagamento(e.target.value)}
              className="w-full rounded-lg bg-slate-900 p-3 outline-none"
            >
              <option value="cartao">Cartão de Crédito</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto</option>
            </select>

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 py-3 font-bold hover:bg-purple-700"
            >
              Finalizar pedido
            </button>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-bold">Resumo do pedido</h2>

            {cart.length === 0 ? (
              <p className="text-slate-400">Seu carrinho está vazio.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-slate-700 pb-3"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-400">
                        Quantidade: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-purple-400">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="pt-4 text-right text-xl font-bold">
                  Total:{" "}
                  <span className="text-purple-400">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
