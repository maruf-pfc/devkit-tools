"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./providers/ThemeProvider";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="font-sans antialiased grid-background-large">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
