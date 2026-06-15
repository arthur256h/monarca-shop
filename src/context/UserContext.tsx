"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: string | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(stored);
    setHydrated(true);
  }, []);

  function login(email: string) {
    localStorage.setItem("user", email);
    setUser(email);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!hydrated) return null; // evita bugs no primeiro render

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
}
