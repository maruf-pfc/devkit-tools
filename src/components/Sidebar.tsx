"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Code2,
  Menu,
  ChevronDown,
  ChevronRight,
  Star,
  Home,
  Search,
} from "lucide-react";
import { categories, tools, getToolsByCategory } from "@/lib/tools";
import { useFavorites } from "@/context/favorites-context";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "formatters",
    "generators",
  ]);

  const favoriteTools = tools.filter((tool) => favorites.includes(tool.slug));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNavigation = () => {
    onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {/* Navigation Links */}
          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === "/"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
              onClick={handleNavigation}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/tools"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === "/tools"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
              onClick={handleNavigation}
            >
              <Search className="h-4 w-4" />
              All Tools
            </Link>
          </div>

          <Separator />

          {/* Favorites */}
          {favoriteTools.length > 0 && (
            <>
              <div>
                <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Favorites
                  <Badge variant="secondary" className="ml-auto">
                    {favoriteTools.length}
                  </Badge>
                </h3>
                <div className="space-y-1">
                  {favoriteTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      className={cn(
                        "block px-6 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === `/tools/${tool.slug}`
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                      onClick={handleNavigation}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Categories */}
          <div className="space-y-2">
            {categories.map((category) => {
              const categoryTools = getToolsByCategory(category.id);
              const isExpanded = expandedCategories.includes(category.id);

              return (
                <Collapsible
                  key={category.id}
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between px-3 py-2 h-auto font-medium text-sm"
                    >
                      <span className="flex items-center gap-2">
                        {category.name}
                        <Badge variant="outline" className="text-xs">
                          {categoryTools.length}
                        </Badge>
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {categoryTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className={cn(
                          "block px-6 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === `/tools/${tool.slug}`
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                        onClick={handleNavigation}
                      >
                        <div className="flex items-center justify-between">
                          {tool.name}
                          {tool.featured && (
                            <Star className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("w-64 border-r bg-background", className)}>
      <SidebarContent />
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
