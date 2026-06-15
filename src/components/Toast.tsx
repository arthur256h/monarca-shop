"use client";

import { useToast } from "@/context/ToastContext";
import { CheckCircle, XCircle } from "lucide-react";

export function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        rounded-xl px-5 py-4 text-white
        shadow-lg backdrop-blur
        animate-slide-in
        ${isSuccess ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {isSuccess ? <CheckCircle size={22} /> : <XCircle size={22} />}
      <span className="font-medium">{toast.message}</span>
    </div>
  );
}
