"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";
import {
  Shield,
  Package,
  User,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

type PedidoStatus = "processando" | "enviado" | "entregue" | "cancelado";

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

type Produto = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const ADMIN_EMAIL = "admin@monarca.com";

export default function AdminPage() {
  const { user, isLoggedIn } = useUser();
  const { showToast } = useToast();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) return;

    const pedidosSalvos = localStorage.getItem("pedidos");
    const todosPedidos: Pedido[] = pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [];
    setPedidos([...todosPedidos].reverse());

    const produtosSalvos = localStorage.getItem("adminProducts");
    const todosProdutos: Produto[] = produtosSalvos
      ? JSON.parse(produtosSalvos)
      : [];

    setProdutos(todosProdutos);
  }, [isAdmin]);

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

    if (editandoId) {
      const atualizados = produtos.map((produto) =>
        produto.id === editandoId
          ? {
              ...produto,
              name,
              price: Number(price),
              image,
              description,
              category,
            }
          : produto,
      );

      setProdutos(atualizados);
      localStorage.setItem("adminProducts", JSON.stringify(atualizados));
      showToast("Produto atualizado com sucesso!", "success");
      limparFormulario();
      return;
    }

    const novoProduto: Produto = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
      description,
      category,
    };

    const atualizados = [...produtos, novoProduto];

    setProdutos(atualizados);
    localStorage.setItem("adminProducts", JSON.stringify(atualizados));
    showToast("Produto cadastrado com sucesso!", "success");
    limparFormulario();
  }

  function editarProduto(produto: Produto) {
    setEditandoId(produto.id);
    setName(produto.name);
    setPrice(String(produto.price));
    setImage(produto.image);
    setDescription(produto.description);
    setCategory(produto.category);
  }

  function excluirProduto(id: number) {
    const atualizados = produtos.filter((produto) => produto.id !== id);

    setProdutos(atualizados);
    localStorage.setItem("adminProducts", JSON.stringify(atualizados));
    showToast("Produto excluído com sucesso!", "success");

    if (editandoId === id) {
      limparFormulario();
    }
  }

  function atualizarStatus(id: number, novoStatus: PedidoStatus) {
    const pedidosSalvos = localStorage.getItem("pedidos");
    const todosPedidos: Pedido[] = pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [];

    const pedidosAtualizados = todosPedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status: novoStatus } : pedido,
    );

    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
    setPedidos([...pedidosAtualizados].reverse());

    showToast("Status do pedido atualizado!", "success");
  }

  function traduzirStatus(status?: string) {
    if (status === "enviado") return "Enviado";
    if (status === "entregue") return "Entregue";
    if (status === "cancelado") return "Cancelado";
    return "Processando";
  }

  const totalVendas = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);

  if (!isLoggedIn || !isAdmin) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-red-500/10 p-6 text-center">
            <Shield className="mx-auto mb-4 text-red-400" size={48} />
            <h1 className="mb-2 text-2xl font-bold text-red-400">
              Acesso negado
            </h1>
            <p className="text-gray-300">
              Apenas administradores podem acessar esta página.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Shield size={34} className="text-purple-400" />

          <div>
            <h1 className="text-3xl font-bold text-purple-400">Painel Admin</h1>
            <p className="text-gray-400">
              Gerencie produtos e pedidos da Monarca Store.
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
            <Package className="mb-3 text-purple-400" size={32} />
            <p className="text-sm text-gray-400">Pedidos</p>
            <p className="text-3xl font-bold">{pedidos.length}</p>
          </div>

          <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
            <DollarSign className="mb-3 text-green-400" size={32} />
            <p className="text-sm text-gray-400">Total vendido</p>
            <p className="text-3xl font-bold text-green-400">
              R$ {totalVendas.toFixed(2)}
            </p>
          </div>

          <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
            <User className="mb-3 text-blue-400" size={32} />
            <p className="text-sm text-gray-400">Produtos cadastrados</p>
            <p className="text-3xl font-bold">{produtos.length}</p>
          </div>
        </div>

        <div className="mb-10 rounded-2xl bg-[#1e293b] p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-2">
            <Plus className="text-purple-400" />
            <h2 className="text-2xl font-bold text-purple-400">
              {editandoId ? "Editar produto" : "Cadastrar produto"}
            </h2>
          </div>

          <form onSubmit={salvarProduto} className="grid gap-4 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              className="rounded-xl bg-[#0f172a] p-3 outline-none"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço"
              type="number"
              className="rounded-xl bg-[#0f172a] p-3 outline-none"
            />

            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Imagem. Ex: /images/produto.jpg"
              className="rounded-xl bg-[#0f172a] p-3 outline-none"
            />

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Categoria"
              className="rounded-xl bg-[#0f172a] p-3 outline-none"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
              className="rounded-xl bg-[#0f172a] p-3 outline-none md:col-span-2"
            />

            <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-6 py-3 font-bold text-white hover:bg-purple-700"
              >
                {editandoId ? "Salvar alterações" : "Cadastrar produto"}
              </button>

              {editandoId && (
                <button
                  type="button"
                  onClick={limparFormulario}
                  className="rounded-xl bg-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-600"
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mb-10 rounded-2xl bg-[#1e293b] p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold text-purple-400">
            Produtos cadastrados
          </h2>

          {produtos.length === 0 ? (
            <p className="text-gray-400">
              Nenhum produto cadastrado pelo admin.
            </p>
          ) : (
            <div className="space-y-4">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="flex flex-col gap-4 rounded-xl bg-[#0f172a] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={produto.image}
                      alt={produto.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-bold">{produto.name}</p>
                      <p className="text-sm text-gray-400">
                        {produto.category}
                      </p>
                      <p className="font-bold text-green-400">
                        R$ {produto.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => editarProduto(produto)}
                      className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => excluirProduto(produto.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-[#1e293b] p-6 shadow-lg">
          <h2 className="mb-5 text-2xl font-bold text-purple-400">Pedidos</h2>

          {pedidos.length === 0 ? (
            <p className="text-gray-400">Nenhum pedido encontrado.</p>
          ) : (
            <div className="space-y-6">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="rounded-xl bg-[#0f172a] p-4">
                  <div className="mb-4 grid gap-4 md:grid-cols-5">
                    <div>
                      <p className="text-sm text-gray-400">Pedido</p>
                      <p className="font-bold">#{pedido.id}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Cliente</p>
                      <p className="font-bold">{pedido.nome}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Data</p>
                      <p>
                        {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="font-bold text-green-400">
                        R$ {pedido.total.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <p className="font-bold">
                        {traduzirStatus(pedido.status)}
                      </p>
                    </div>
                  </div>

                  <select
                    value={pedido.status || "processando"}
                    onChange={(e) =>
                      atualizarStatus(pedido.id, e.target.value as PedidoStatus)
                    }
                    className="w-full rounded-xl bg-[#1e293b] p-3 text-white outline-none md:w-64"
                  >
                    <option value="processando">Processando</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
