"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type ToastType = "success" | "error";

type Toast = {
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toast: Toast | null;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      clearTimer();

      setToast({ message, type });

      timeoutRef.current = setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, 2500);
    },
    [clearTimer],
  );

  const hideToast = useCallback(() => {
    clearTimer();
    setToast(null);
  }, [clearTimer]);

  // 🔹 limpeza ao desmontar (troca de rota)
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }

  return context;
}
