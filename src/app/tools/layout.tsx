import type React from "react";
import { Sidebar, MobileSidebar } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Mobile Header */}
      <header className="md:hidden border-b backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <MobileSidebar />
          {/* <span className="font-semibold">DevKit Tools</span> */}
          <ThemeToggle />
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
