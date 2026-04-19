import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 rounded-3xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 p-8 shadow-xl md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-200">
              Ofertas da semana
            </p>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Os melhores produtos com visual de loja profissional
            </h1>

            <p className="mb-6 max-w-xl text-base text-purple-100 md:text-lg">
              Explore produtos em destaque, adicione ao carrinho e finalize sua
              compra com uma experiência completa.
            </p>

            <a
              href="#produtos"
              className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 transition hover:scale-105"
            >
              Ver produtos
            </a>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold">Destaques da loja</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#111827]/70 p-4">
                <p className="text-sm text-gray-300">Compra simples</p>
                <p className="mt-2 text-lg font-bold">Carrinho funcional</p>
              </div>

              <div className="rounded-2xl bg-[#111827]/70 p-4">
                <p className="text-sm text-gray-300">Pagamento</p>
                <p className="mt-2 text-lg font-bold">Checkout completo</p>
              </div>

              <div className="rounded-2xl bg-[#111827]/70 p-4">
                <p className="text-sm text-gray-300">Organização</p>
                <p className="mt-2 text-lg font-bold">Histórico de pedidos</p>
              </div>

              <div className="rounded-2xl bg-[#111827]/70 p-4">
                <p className="text-sm text-gray-300">Experiência</p>
                <p className="mt-2 text-lg font-bold">Fluxo moderno</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-purple-300">
              Catálogo
            </p>
            <h2 className="text-3xl font-bold text-purple-400">
              Produtos em destaque
            </h2>
          </div>

          <p className="text-sm text-gray-400">
            {products.length} produtos disponíveis
          </p>
        </div>

        <ProductList products={products} />
      </section>
    </main>
  );
}
