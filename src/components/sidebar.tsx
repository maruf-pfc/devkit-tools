"use client";

import Link from "next/link";
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
import { Code2, Menu, ChevronDown, Star, Home, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, tools } from "@/lib/tools";

function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
        >
          <Code2 className="h-6 w-6" />
          DevKit Tools
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {/* Navigation Links */}
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/tools"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              <Search className="h-4 w-4" />
              All Tools
            </Link>
          </div>

          <Separator />

          {/* Favorites (static example) */}
          <div>
            <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold">
              <Star className="h-4 w-4 text-yellow-500" />
              Favorites
              <Badge variant="secondary" className="ml-auto">
                2
              </Badge>
            </h3>
            <div className="space-y-1">
              <Link
                href="/tools/json-formatter"
                className="block px-6 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              >
                JSON Formatter
              </Link>
              <Link
                href="/tools/uuid-generator"
                className="block px-6 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              >
                UUID Generator
              </Link>
            </div>
          </div>

          <Separator />

          {/* Categories (always expanded, static) */}
          <div className="space-y-2">
            {categories.map((category) => {
              const categoryTools = tools.filter(
                (t) => t.category === category.id
              );

              return (
                <Collapsible key={category.id} defaultOpen>
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
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {categoryTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="block px-6 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground"
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

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("w-64 border-r bg-background", className)}>
      <SidebarContent />
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
