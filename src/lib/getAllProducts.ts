import { products, type Product } from "@/data/products";

export function getAllProducts(): Product[] {
  // 🔹 SSR / Server Component
  if (typeof window === "undefined") {
    return products;
  }

  // 🔹 Client: junta produtos base + produtos criados pelo admin
  try {
    const adminProducts = localStorage.getItem("adminProducts");
    const produtosAdmin: Product[] = adminProducts
      ? JSON.parse(adminProducts)
      : [];

    return [...products, ...produtosAdmin];
  } catch {
    // fallback seguro caso localStorage esteja corrompido
    return products;
  }
}
