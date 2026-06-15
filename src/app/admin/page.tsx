"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import {
  Shield,
  Package,
  User as UserIcon,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

/* ===================== TIPOS ===================== */

type PedidoStatus = "processando" | "enviado" | "entregue" | "cancelado";

type User = {
  email: string;
  name?: string;
};

type Produto = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type Pedido = {
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

const ADMIN_EMAIL = "admin@monarca.com";

/* ===================== COMPONENTE ===================== */

export default function AdminPage() {
  const { user, isLoggedIn } = useUser();
  const { showToast } = useToast();

  /* 🔒 NORMALIZA O USER (resolve erro do build) */
  const parsedUser: User | null =
    typeof user === "string"
      ? (() => {
          try {
            return JSON.parse(user);
          } catch {
            return null;
          }
        })()
      : (user as User | null);

  const isAdmin = isLoggedIn && parsedUser?.email === ADMIN_EMAIL;

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  /* ===================== LOAD ===================== */

  useEffect(() => {
    if (!isAdmin) return;

    const pedidosSalvos = localStorage.getItem("pedidos");
    const produtosSalvos = localStorage.getItem("adminProducts");

    setPedidos(pedidosSalvos ? [...JSON.parse(pedidosSalvos)].reverse() : []);
    setProdutos(produtosSalvos ? JSON.parse(produtosSalvos) : []);
  }, [isAdmin]);

  /* ===================== FUNÇÕES ===================== */

  function limparFormulario() {
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("");
    setEditandoId(null);
  }

  function salvarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !price || !image || !description || !category) {
      showToast("Preencha todos os campos do produto.", "error");
      return;
    }

    const atualizados = editandoId
      ? produtos.map((p) =>
          p.id === editandoId
            ? { ...p, name, price: Number(price), image, description, category }
            : p,
        )
      : [
          ...produtos,
          {
            id: Date.now(),
            name,
            price: Number(price),
            image,
            description,
            category,
          },
        ];

    setProdutos(atualizados);
    localStorage.setItem("adminProducts", JSON.stringify(atualizados));
    showToast(
      editandoId
        ? "Produto atualizado com sucesso!"
        : "Produto cadastrado com sucesso!",
      "success",
    );
    limparFormulario();
  }

  function atualizarStatus(id: number, status: PedidoStatus) {
    const pedidosSalvos = localStorage.getItem("pedidos");
    if (!pedidosSalvos) return;

    const atualizados = JSON.parse(pedidosSalvos).map((p: Pedido) =>
      p.id === id ? { ...p, status } : p,
    );

    localStorage.setItem("pedidos", JSON.stringify(atualizados));
    setPedidos([...atualizados].reverse());
    showToast("Status do pedido atualizado!", "success");
  }

  function traduzirStatus(status?: PedidoStatus) {
    return {
      enviado: "Enviado",
      entregue: "Entregue",
      cancelado: "Cancelado",
      processando: "Processando",
    }[status ?? "processando"];
  }

  const totalVendas = pedidos.reduce((acc, p) => acc + p.total, 0);

  /* ===================== BLOQUEIO ===================== */

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <section className="mx-auto max-w-4xl px-4 py-10 text-center">
          <Shield size={48} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-bold text-red-400">Acesso negado</h1>
          <p className="text-gray-300">
            Apenas administradores podem acessar esta página.
          </p>
        </section>
      </main>
    );
  }

  /* ===================== JSX ===================== */

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />
      {/* 🔥 O RESTO DO JSX PERMANECE IGUAL AO SEU */}
      {/* (não altera layout nem funcionalidades) */}
    </main>
  );
}
