"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("cartao");

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    const parsed: CartItem[] = saved ? JSON.parse(saved) : [];
    setCart(parsed);
  }, []);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  function handleConfirmarPedido(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !endereco.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    const pedido = {
      cliente: {
        nome,
        email,
        endereco,
        pagamento,
      },
      itens: cart,
      total,
      data: new Date().toISOString(),
    };

    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
    localStorage.removeItem("cart");

    router.push("/pedido-confirmado");
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
        <Header />
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-3xl border border-[#252C36] bg-[#151B23] p-8 shadow-xl">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="mt-4 text-[#9CA3AF]">
              Seu carrinho está vazio. Adicione produtos antes de finalizar a
              compra.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="mb-8 text-4xl font-extrabold">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <form
            onSubmit={handleConfirmarPedido}
            className="rounded-3xl border border-[#252C36] bg-[#151B23] p-6 shadow-xl"
          >
            <h2 className="mb-6 text-2xl font-bold">Dados do cliente</h2>

            <div className="mb-4">
              <label className="mb-2 block font-medium text-[#E5E7EB]">
                Nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none placeholder:text-[#6B7280]"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-medium text-[#E5E7EB]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none placeholder:text-[#6B7280]"
                placeholder="Digite seu email"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-medium text-[#E5E7EB]">
                Endereço
              </label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none placeholder:text-[#6B7280]"
                placeholder="Rua, número, bairro"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-medium text-[#E5E7EB]">
                Forma de pagamento
              </label>
              <select
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
                className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none"
              >
                <option value="cartao">Cartão</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </select>
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 font-semibold text-[#E5E7EB] shadow-lg transition duration-300 hover:border-[#8B5CF6] hover:bg-[#1A2230] active:scale-[0.98]"
            >
              <span className="relative flex items-center justify-center gap-2">
                <CheckCircle size={18} />
                <span>Confirmar pedido</span>
              </span>
            </button>
          </form>

          <div className="rounded-3xl border border-[#252C36] bg-[#151B23] p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">Resumo do pedido</h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#252C36] pb-4"
                >
                  <div>
                    <p className="font-medium text-[#E5E7EB]">{item.name}</p>
                    <p className="text-sm text-[#9CA3AF]">
                      Quantidade: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-[#8B5CF6]">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[#252C36] pt-4">
              <p className="text-2xl font-extrabold">
                Total:{" "}
                <span className="text-[#8B5CF6]">R$ {total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
