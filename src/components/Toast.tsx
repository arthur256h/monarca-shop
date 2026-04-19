"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999]">
      <div
        className={`flex min-w-[280px] items-center gap-3 rounded-xl px-4 py-3 text-white shadow-2xl ${
          toast.type === "error" ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {toast.type === "error" ? (
          <XCircle size={20} />
        ) : (
          <CheckCircle size={20} />
        )}

        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
