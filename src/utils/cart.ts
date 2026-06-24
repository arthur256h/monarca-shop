import { CartItem, Product } from "@/types";

const CART_KEY = "cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(product: Product) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  let updated: CartItem[];

  if (existing) {
    updated = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  } else {
    updated = [...cart, { ...product, quantity: 1 }];
  }

  localStorage.setItem(CART_KEY, JSON.stringify(updated));
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
