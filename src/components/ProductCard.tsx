import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#252C36] bg-[#151B23] transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-medium text-[#E5E7EB] backdrop-blur-md">
          Destaque
        </div>

        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151B23]/35 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-5">
        <div className="flex min-h-[72px] items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-xl font-bold tracking-tight text-[#E5E7EB]">
            {product.name}
          </h2>

          <span className="shrink-0 rounded-full border border-[#2D3642] bg-[#11161D] px-3 py-1 text-xs font-medium text-[#9CA3AF]">
            Gamer
          </span>
        </div>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#9CA3AF]">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280]">
              Preço
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#8B5CF6]">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <Link
          href={`/produto/${product.id}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-center font-semibold text-[#E5E7EB] transition-all duration-300 hover:border-[#8B5CF6] hover:bg-[#171E28]"
        >
          Ver produto
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
