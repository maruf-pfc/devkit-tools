"use client";

import React, { useState, useMemo } from "react";
import { ExternalLink, Search, BookOpen, Layers } from "lucide-react";
import { ResourceRepo } from "@/lib/content";

interface ResourceHubProps {
  repos: ResourceRepo[];
  title: string;
  description: string;
  accentColor?: string;
}

export const ResourceHub: React.FC<ResourceHubProps> = ({
  repos,
  title,
  description,
  accentColor = "from-violet-500 to-indigo-600",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string>(
    repos[0]?.id ?? ""
  );

  const activeRepo = repos.find((r) => r.id === selectedRepo) ?? repos[0];

  // Filter categories + items based on search
  const filteredCategories = useMemo(() => {
    if (!activeRepo) return [];
    const q = searchQuery.toLowerCase();
    if (!q) return activeRepo.categories;
    return activeRepo.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeRepo, searchQuery]);

  const totalItems = repos.reduce(
    (sum, r) => sum + r.categories.reduce((s, c) => s + c.items.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className={`relative bg-gradient-to-br ${accentColor} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="relative container mx-auto px-4 py-14 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              {repos.reduce((s, r) => s + r.categories.length, 0)} categories
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {totalItems.toLocaleString()} resources
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Source tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {repos.map((repo) => (
            <button
              key={repo.id}
              onClick={() => {
                setSelectedRepo(repo.id);
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedRepo === repo.id
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {repo.label}
              <span className="ml-2 text-xs opacity-70">
                {repo.categories.reduce((s, c) => s + c.items.length, 0)}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search in ${activeRepo?.label ?? ""}…`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>

        {/* Main Categories Section */}
        <main className="w-full">
          {filteredCategories.length > 0 ? (
            <div className="space-y-10">
              {filteredCategories.map((category) => (
                <section key={category.name}>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <span className="ml-2 text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {category.items.length} items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.items.map((item, i) => (
                      <ResourceCard key={i} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No results found for &ldquo;{searchQuery}&rdquo;</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

function ResourceCard({
  item,
}: {
  item: { name: string; url: string; description: string };
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {item.name}
        </h3>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
      </div>
      {item.description && (
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mt-auto">
          {item.description}
        </p>
      )}
    </a>
  );
}
