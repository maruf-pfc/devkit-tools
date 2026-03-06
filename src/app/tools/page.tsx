"use client";

import React, { useState, useMemo } from "react";
import { Search, Wrench, Star } from "lucide-react";
import Link from "next/link";
import { tools, categories, searchTools } from "@/lib/tools";
import { useFavorites } from "@/context/favorites-context";
import { Badge } from "@/components/ui/badge";

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  const filteredTools = useMemo(() => {
    let result = searchQuery.trim() ? searchTools(searchQuery) : tools;
    if (showFavoritesOnly) {
      result = result.filter((tool) => favorites.includes(tool.slug));
    }
    return result;
  }, [searchQuery, showFavoritesOnly, favorites]);

  // For favorites/searches that don't match standard categories exactly
  // Or just group them cleanly if we still want groups
  const availableCategories = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        items: filteredTools.filter((t) => t.category === cat.id),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [filteredTools]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="relative container mx-auto px-4 py-14 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Developer Tools</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-6">
            Browse our curated collection of essential utilities to help you build, 
            test, and optimize your developer workflows.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              {tools.length} utilities
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
              <Star className="h-4 w-4" />
              {favorites.length} saved
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Source tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => {
              setShowFavoritesOnly(false);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !showFavoritesOnly
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Tools
            <span className="ml-2 text-xs opacity-70">{tools.length}</span>
          </button>
          
          <button
            onClick={() => {
              setShowFavoritesOnly(true);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              showFavoritesOnly
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            Favorites
            <span className="ml-2 text-xs opacity-70">{favorites.length}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools by name or description…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>

        {/* Grid: Sections layout without sidebar */}
        <main className="w-full">
          {availableCategories.length > 0 ? (
            <div className="space-y-10">
              {availableCategories.map((category) => (
                <section key={category.id}>
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {category.items.length} tools
                      </span>
                    </div>
                    {category.description && (
                      <p className="text-muted-foreground text-sm mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.items.map((tool) => (
                      <Link
                        href={`/tools/${tool.slug}`}
                        key={tool.id}
                        className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 block"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                            <HighlightedText text={tool.name} query={searchQuery} />
                          </h3>
                          {favorites.includes(tool.slug) && (
                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                          <HighlightedText text={tool.description} query={searchQuery} />
                        </p>

                        <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1">
                          {tool.keywords.slice(0, 3).map((keyword) => (
                            <Badge key={keyword} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                              <HighlightedText text={keyword} query={searchQuery} />
                            </Badge>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No tools found for &ldquo;{searchQuery}&rdquo;</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
