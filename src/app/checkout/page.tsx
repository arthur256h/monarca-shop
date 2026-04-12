"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  User,
} from "lucide-react";
import Header from "@/components/Header";
import { formatPrice } from "@/utils/format";

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
  const [erro, setErro] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    const parsed: CartItem[] = saved ? JSON.parse(saved) : [];
    setCart(parsed);
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const entrega = 0;
  const total = subtotal + entrega;

  function handleConfirmarPedido(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !endereco.trim()) {
      setErro("Preencha todos os campos para continuar.");
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
          <div className="rounded-[28px] border border-[#252C36] bg-[#151B23] p-10 shadow-xl">
            <h1 className="text-3xl font-extrabold">Checkout</h1>

            <p className="mt-4 text-[#9CA3AF]">
              Seu carrinho está vazio. Adicione produtos antes de finalizar a
              compra.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
            >
              Voltar para a loja
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]">
              Finalização
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
              Checkout
            </h1>
          </div>

          <Link
            href="/carrinho"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#252C36] bg-[#151B23] px-4 py-3 text-sm font-medium text-[#9CA3AF] transition hover:border-[#8B5CF6]/40 hover:text-[#E5E7EB]"
          >
            <ArrowLeft size={16} />
            Voltar ao carrinho
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleConfirmarPedido}
            className="rounded-[28px] border border-[#252C36] bg-[#151B23] p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold">Dados do cliente</h2>

            <p className="mt-2 text-sm text-[#9CA3AF]">
              Preencha suas informações para concluir o pedido.
            </p>

            {erro && (
              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {erro}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                  <User size={16} />
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    setErro("");
                  }}
                  className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none placeholder:text-[#6B7280]"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                  <CreditCard size={16} />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErro("");
                  }}
                  className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none placeholder:text-[#6B7280]"
                  placeholder="Digite seu email"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                  <MapPin size={16} />
                  Endereço
                </label>
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => {
                    setEndereco(e.target.value);
                    setErro("");
                  }}
                  className="w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-[#E5E7EB] outline-none placeholder:text-[#6B7280]"
                  placeholder="Rua, número, bairro"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#E5E7EB]">
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
            </div>

            <button
              type="submit"
              className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-2xl border border-[#2D3642] bg-[#11161D] px-6 py-3 font-semibold text-[#E5E7EB] shadow-lg transition duration-300 hover:border-[#8B5CF6] hover:bg-[#1A2230] active:scale-[0.98]"
            >
              <span className="relative flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>Confirmar pedido</span>
              </span>
            </button>
          </form>

          <aside className="h-fit rounded-[28px] border border-[#252C36] bg-[#151B23] p-6 shadow-xl">
            <h2 className="text-2xl font-bold">Resumo do pedido</h2>

            <div className="mt-6 space-y-4">
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
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#252C36] pt-5 text-[#9CA3AF]">
              <div className="flex items-center justify-between">
                <span>Itens</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Entrega</span>
                <span className="text-emerald-400">Grátis</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#252C36] pt-5">
              <span className="text-lg font-semibold text-[#E5E7EB]">
                Total
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-[#8B5CF6]">
                {formatPrice(total)}
              </span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
