import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Zap } from "lucide-react";
import Header from "@/components/Header";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/format";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const produto = products.find((p) => p.id === Number(id));

  if (!produto) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
        <Header />

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-[28px] border border-[#252C36] bg-[#151B23] p-10 shadow-xl">
            <h1 className="text-3xl font-extrabold">Produto não encontrado</h1>
            <p className="mt-3 text-[#9CA3AF]">
              O item que você tentou acessar não está disponível no catálogo.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#2D3642] bg-[#11161D] px-5 py-3 font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
            >
              <ArrowLeft size={18} />
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
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#252C36] bg-[#151B23] px-4 py-3 text-sm font-medium text-[#9CA3AF] transition hover:border-[#8B5CF6]/40 hover:text-[#E5E7EB]"
          >
            <ArrowLeft size={16} />
            Voltar para os produtos
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 rounded-[28px] border border-[#252C36] bg-[#151B23] p-6 shadow-xl lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[24px] border border-[#252C36] bg-[#11161D]">
              <Image
                src={produto.image}
                alt={produto.name}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[#252C36] bg-[#11161D] px-4 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                  Estilo
                </p>
                <p className="mt-2 text-sm font-semibold text-[#E5E7EB]">
                  Gamer premium
                </p>
              </div>

              <div className="rounded-2xl border border-[#252C36] bg-[#11161D] px-4 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                  Desempenho
                </p>
                <p className="mt-2 text-sm font-semibold text-[#E5E7EB]">
                  Alto nível
                </p>
              </div>

              <div className="rounded-2xl border border-[#252C36] bg-[#11161D] px-4 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                  Setup
                </p>
                <p className="mt-2 text-sm font-semibold text-[#E5E7EB]">
                  Profissional
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex rounded-full border border-[#2D3642] bg-[#11161D] px-4 py-2 text-sm font-medium text-[#9CA3AF]">
                Produto em destaque
              </span>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
                {produto.name}
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-8 text-[#9CA3AF]">
                {produto.description}
              </p>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.22em] text-[#6B7280]">
                  Preço
                </p>
                <p className="mt-2 text-5xl font-extrabold tracking-tight text-[#8B5CF6]">
                  {formatPrice(produto.price)}
                </p>
              </div>

              <div className="mt-8">
                <AddToCartButton product={produto} />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#252C36] bg-[#11161D] p-4">
                  <div className="flex items-center gap-2 text-[#8B5CF6]">
                    <Truck size={18} />
                    <span className="text-sm font-semibold text-[#E5E7EB]">
                      Entrega rápida
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#9CA3AF]">
                    Envio ágil para todo o Brasil.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#252C36] bg-[#11161D] p-4">
                  <div className="flex items-center gap-2 text-[#8B5CF6]">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-semibold text-[#E5E7EB]">
                      Compra segura
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#9CA3AF]">
                    Processo simples e protegido.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#252C36] bg-[#11161D] p-4">
                  <div className="flex items-center gap-2 text-[#8B5CF6]">
                    <Zap size={18} />
                    <span className="text-sm font-semibold text-[#E5E7EB]">
                      Performance
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#9CA3AF]">
                    Ideal para setups modernos.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-[#252C36] bg-[#11161D] p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[#6B7280]">
                Observação
              </p>
              <p className="mt-3 text-sm leading-7 text-[#9CA3AF]">
                Este produto faz parte de uma seleção com foco em visual limpo,
                construção sólida e estética inspirada em setups gamers mais
                maduros e profissionais.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
