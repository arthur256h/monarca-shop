"use client";

import Link from "next/link";
import { Mail, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-[#111827] text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="mb-3 text-xl font-bold text-purple-400">
            Monarca Store
          </h2>

          <p className="text-sm text-gray-400">
            Sua loja gamer com estilo, tecnologia e performance.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Links rápidos</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Início
              </Link>
            </li>

            <li>
              <Link href="/favoritos" className="hover:text-white">
                Favoritos
              </Link>
            </li>

            <li>
              <Link href="/carrinho" className="hover:text-white">
                Carrinho
              </Link>
            </li>

            <li>
              <Link href="/pedidos" className="hover:text-white">
                Pedidos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Contato</h3>

          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} />
            contato@monarca.com
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Phone size={16} />
            (63) 99999-9999
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Globe size={16} />
            www.monarca.com
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Monarca Store. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
