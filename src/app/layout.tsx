import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ToastProvider } from "@/context/ToastContext";
import Toast from "@/components/Toast";

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
              </CartProvider>
            </FavoritesProvider>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
