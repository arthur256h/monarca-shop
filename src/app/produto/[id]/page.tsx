import Header from "@/components/Header";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";

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
          <div className="rounded-3xl border border-[#252C36] bg-[#151B23] p-8 shadow-xl">
            <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E5E7EB]">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 rounded-3xl border border-[#252C36] bg-[#151B23] p-6 shadow-xl md:grid-cols-2 md:p-8">
          <div className="overflow-hidden rounded-3xl border border-[#252C36] bg-[#11161D]">
            <img
              src={produto.image}
              alt={produto.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full border border-[#2D3642] bg-[#11161D] px-4 py-2 text-sm font-medium text-[#9CA3AF]">
              Produto em destaque
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-[#E5E7EB]">
              {produto.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#9CA3AF]">
              {produto.description}
            </p>

            <p className="mt-8 text-4xl font-extrabold text-[#8B5CF6]">
              R$ {produto.price.toFixed(2)}
            </p>

            <div className="mt-8">
              <AddToCartButton product={produto} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
