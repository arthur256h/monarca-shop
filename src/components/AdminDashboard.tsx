import { DollarSign, Package } from "lucide-react";
import { Pedido } from "@/types/admin";

type Props = {
  pedidos: Pedido[];
};

export default function AdminDashboard({ pedidos }: Props) {
  const totalVendas = pedidos.reduce((acc, p) => acc + p.total, 0);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-zinc-900 p-4 rounded">
        <DollarSign className="mb-2" />
        <p>Total em vendas</p>
        <strong>R$ {totalVendas.toFixed(2)}</strong>
      </div>

      <div className="bg-zinc-900 p-4 rounded">
        <Package className="mb-2" />
        <p>Pedidos</p>
        <strong>{pedidos.length}</strong>
      </div>
    </div>
  );
}
