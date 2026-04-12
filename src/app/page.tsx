import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      <section className="relative overflow-hidden border-b border-[#252C36] bg-[linear-gradient(to_right,#0B0F14,#11161D,#0F141B)]">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_20%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <span className="rounded-full border border-[#2D3642] bg-[#151B23] px-4 py-2 text-sm font-medium text-[#9CA3AF]">
            Performance com estilo
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Tecnologia gamer com visual mais limpo, sólido e profissional.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#9CA3AF]">
            Produtos selecionados para setups modernos, com foco em desempenho,
            estética e uma experiência premium.
          </p>

          <a
            href="#produtos"
            className="mt-8 inline-block rounded-2xl border border-[#2D3642] bg-[#151B23] px-6 py-3 font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#1A2230]"
          >
            Explorar produtos
          </a>
        </div>
      </section>

      <section id="produtos" className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#8B5CF6]">
              Catálogo
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#E5E7EB]">
              Produtos em destaque
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
