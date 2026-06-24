"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  name: string;
  email: string;
  role: "admin" | "user";
};

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      try {
        const parsedUser: User = JSON.parse(stored);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }

    setHydrated(true);
  }, []);

  function login(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!hydrated) return null;

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
