"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Search, X } from "lucide-react";
import Link from "next/link";
import { tools, categories, searchTools } from "@/lib/tools";
import { useFavorites } from "@/context/favorites-context";

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

  const groupedTools = useMemo(() => {
    const grouped: Record<string, typeof tools> = {};

    filteredTools.forEach((tool) => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });

    return grouped;
  }, [filteredTools]);

  const clearSearch = () => {
    setSearchQuery("");
    setShowFavoritesOnly(false);
  };

  const totalResults = filteredTools.length;
  const hasActiveFilters = searchQuery.trim() || showFavoritesOnly;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Developer Tools</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of developer utilities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools by name, description, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            Favorites Only
            {favorites.length > 0 && (
              <Badge
                variant={showFavoritesOnly ? "secondary" : "default"}
                className="ml-1"
              >
                {favorites.length}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}

          <div className="ml-auto text-sm text-muted-foreground">
            {totalResults} tool{totalResults !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Results */}
      {totalResults === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">
              {showFavoritesOnly
                ? "You haven't favorited any tools yet. Star some tools to see them here!"
                : "Try adjusting your search terms or browse all available tools."}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearSearch}>
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Search Results */}
          {searchQuery.trim() && !showFavoritesOnly && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-1">
                  Search Results for &quot;{searchQuery}&quot;
                </h2>
                <p className="text-muted-foreground">
                  Found {totalResults} tool{totalResults !== 1 ? "s" : ""}{" "}
                  matching your search
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => {
                  const category = categories.find(
                    (cat) => cat.id === tool.category
                  );
                  return (
                    <Card
                      key={tool.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer group"
                    >
                      <Link href={`/tools/${tool.slug}`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="group-hover:text-primary transition-colors text-lg">
                              <HighlightedText
                                text={tool.name}
                                query={searchQuery}
                              />
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {tool.featured && (
                                <Star className="h-4 w-4 text-yellow-500" />
                              )}
                              {favorites.includes(tool.slug) && (
                                <Star className="h-4 w-4 text-blue-500 fill-current" />
                              )}
                            </div>
                          </div>
                          <CardDescription>
                            <HighlightedText
                              text={tool.description}
                              query={searchQuery}
                            />
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {category && (
                              <Badge variant="secondary">{category.name}</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {tool.keywords.slice(0, 4).map((keyword) => (
                              <Badge
                                key={keyword}
                                variant="outline"
                                className="text-xs"
                              >
                                <HighlightedText
                                  text={keyword}
                                  query={searchQuery}
                                />
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Favorites Only */}
          {showFavoritesOnly && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Your Favorite Tools
                </h2>
                <p className="text-muted-foreground">
                  {totalResults} favorite tool{totalResults !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => {
                  const category = categories.find(
                    (cat) => cat.id === tool.category
                  );
                  return (
                    <Card
                      key={tool.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer group"
                    >
                      <Link href={`/tools/${tool.slug}`}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="group-hover:text-primary transition-colors text-lg">
                              {tool.name}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {tool.featured && (
                                <Star className="h-4 w-4 text-yellow-500" />
                              )}
                              <Star className="h-4 w-4 text-blue-500 fill-current" />
                            </div>
                          </div>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {category && (
                              <Badge variant="secondary">{category.name}</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {tool.keywords.slice(0, 4).map((keyword) => (
                              <Badge
                                key={keyword}
                                variant="outline"
                                className="text-xs"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tools by Category (default view) */}
          {!searchQuery.trim() && !showFavoritesOnly && (
            <>
              {categories.map((category) => {
                const categoryTools = groupedTools[category.id];
                if (!categoryTools || categoryTools.length === 0) return null;

                return (
                  <div key={category.id}>
                    <div className="mb-4">
                      <h2 className="text-2xl font-semibold mb-1">
                        {category.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryTools.map((tool) => (
                        <Card
                          key={tool.id}
                          className="hover:shadow-lg transition-shadow cursor-pointer group"
                        >
                          <Link href={`/tools/${tool.slug}`}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="group-hover:text-primary transition-colors text-lg">
                                  {tool.name}
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                  {tool.featured && (
                                    <Star className="h-4 w-4 text-yellow-500" />
                                  )}
                                  {favorites.includes(tool.slug) && (
                                    <Star className="h-4 w-4 text-blue-500 fill-current" />
                                  )}
                                </div>
                              </div>
                              <CardDescription className="mb-2">
                                {tool.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-1">
                                {tool.keywords.slice(0, 4).map((keyword) => (
                                  <Badge
                                    key={keyword}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Link>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}
