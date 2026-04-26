import { products } from "@/data/products";

export function getAllProducts() {
  if (typeof window === "undefined") {
    return products;
  }

  const adminProducts = localStorage.getItem("adminProducts");
  const produtosAdmin = adminProducts ? JSON.parse(adminProducts) : [];

  return [...products, ...produtosAdmin];
}
