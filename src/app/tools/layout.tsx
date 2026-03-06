import type React from "react";
import { Sidebar, MobileSidebar } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col bg-gradient-to-br from-background to-muted/20">
      {/* Mobile Tool Navigation - optional if we want to show it below the main header, but it's redundant now */}
      {/* We keep the wrapper but rely on the main mobile menu for global navigation, 
          and add a specific mobile sidebar button here just for tools if needed, 
          but usually the main sheet or a secondary bar works better. 
          For now, we'll keep the secondary bar just for the sidebar toggle on mobile. */}
      <header className="md:hidden border-b bg-background/80 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="flex items-center px-4 py-2">
          <MobileSidebar />
          <span className="text-sm font-medium ml-2 text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
            Tools Menu
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex h-[calc(100vh-73px)] sticky top-[73px]" />

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
