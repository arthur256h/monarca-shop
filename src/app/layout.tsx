import type { Metadata } from "next";
import "./globals.css";

import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ToastProvider } from "@/context/ToastContext";

import FloatingCartButton from "@/components/FloatingCartButton";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Monarca Store",
  description: "E-commerce Monarca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>
          <CartProvider>
            <FavoritesProvider>
              <ToastProvider>
                {children}

                {/* 🔹 Componentes globais */}
                <FloatingCartButton />
                <Toast />
              </ToastProvider>
            </FavoritesProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
