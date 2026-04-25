import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ToastProvider } from "@/context/ToastContext";

import Toast from "@/components/Toast";
import FloatingCartButton from "@/components/FloatingCartButton";

export const metadata: Metadata = {
  title: "E-commerce Monarca",
  description: "Loja virtual",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>
          <UserProvider>
            <FavoritesProvider>
              <CartProvider>
                <Toast />

                {children}

                {/* 🔥 Carrinho flutuante */}
                <FloatingCartButton />
              </CartProvider>
            </FavoritesProvider>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
