"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (toolSlug: string) => void;
  removeFavorite: (toolSlug: string) => void;
  isFavorite: (toolSlug: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("devkit-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("devkit-favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addFavorite = (toolSlug: string) => {
    setFavorites((prev) => [
      ...prev.filter((slug) => slug !== toolSlug),
      toolSlug,
    ]);
  };

  const removeFavorite = (toolSlug: string) => {
    setFavorites((prev) => prev.filter((slug) => slug !== toolSlug));
  };

  const isFavorite = (toolSlug: string) => {
    return favorites.includes(toolSlug);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
