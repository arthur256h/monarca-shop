// src/types/admin.ts

export type PedidoStatus = "processando" | "enviado" | "entregue" | "cancelado";

export type Produto = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export type Pedido = {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  pagamento: string;
  itens: Produto[];
  total: number;
  createdAt: string;
  userEmail: string;
  status?: PedidoStatus;
};
