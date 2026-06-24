import { Pedido, Produto, PedidoStatus } from "@/types/admin";

export function getPedidos(): Pedido[] {
  const data = localStorage.getItem("pedidos");
  return data ? JSON.parse(data) : [];
}

export function savePedidos(pedidos: Pedido[]) {
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

export function getProdutos(): Produto[] {
  const data = localStorage.getItem("adminProducts");
  return data ? JSON.parse(data) : [];
}

export function saveProdutos(produtos: Produto[]) {
  localStorage.setItem("adminProducts", JSON.stringify(produtos));
}

export function atualizarPedidoStatus(
  id: number,
  status: PedidoStatus,
): Pedido[] {
  const pedidos = getPedidos().map((p) => (p.id === id ? { ...p, status } : p));
  savePedidos(pedidos);
  return pedidos;
}
