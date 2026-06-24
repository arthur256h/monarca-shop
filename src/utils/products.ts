export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const STORAGE_KEY = "products";

export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
