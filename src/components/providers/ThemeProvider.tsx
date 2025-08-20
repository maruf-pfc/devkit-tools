"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FavoritesProvider } from "@/context/favorites-context";
import { Toaster } from "@/components/ui/sonner";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <FavoritesProvider>
        <main>{children}</main>
        <Toaster />
      </FavoritesProvider>
    </NextThemesProvider>
  );
}
