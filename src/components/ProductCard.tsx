import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-[#252C36] bg-[#151B23] transition duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:shadow-[0_12px_40px_rgba(124,58,237,0.10)]">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-[#E5E7EB]">{product.name}</h2>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#9CA3AF]">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-extrabold text-[#8B5CF6]">
            R$ {product.price.toFixed(2)}
          </p>
        </div>

        <Link
          href={`/produto/${product.id}`}
          className="mt-5 inline-block w-full rounded-2xl border border-[#2D3642] bg-[#11161D] px-4 py-3 text-center font-semibold text-[#E5E7EB] transition hover:border-[#8B5CF6] hover:bg-[#171E28]"
        >
          Ver produto
        </Link>
      </div>
    </div>
  );
}
