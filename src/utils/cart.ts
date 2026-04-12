import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

export function getCart(): CartItem[] {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product: Product): CartItem[] {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  let updated;

  if (existing) {
    updated = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  } else {
    updated = [...cart, { ...product, quantity: 1 }];
  }

  saveCart(updated);
  return updated;
}
