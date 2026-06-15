"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FavoriteItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 🔹 carregar do localStorage (uma única vez)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    setHydrated(true);
  }, []);

  // 🔹 salvar no localStorage (após hidratar)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  function toggleFavorite(product: FavoriteItem) {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });
  }

  const isFavorite = useMemo(
    () => (id: number) => favorites.some((item) => item.id === id),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de um FavoritesProvider",
    );
  }

  return context;
}
