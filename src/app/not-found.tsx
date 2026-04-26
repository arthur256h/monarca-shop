import Link from "next/link";
import { Home, SearchX, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4 text-white">
      <section className="max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-600/20">
          <SearchX size={56} className="text-purple-400" />
        </div>

        <h1 className="mb-3 text-7xl font-black text-purple-400">404</h1>

        <h2 className="mb-4 text-3xl font-bold">Página não encontrada</h2>

        <p className="mb-8 text-gray-300">
          A página que você tentou acessar não existe ou foi movida.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
          >
            <Home size={20} />
            Voltar ao início
          </Link>

          <Link
            href="/carrinho"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition hover:bg-slate-700"
          >
            <ShoppingBag size={20} />
            Ver carrinho
          </Link>
        </div>
      </section>
    </main>
  );
}
