"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, StarOff, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { getCategoryById } from "@/lib/tools";
import Link from "next/link";
import { Tool } from "@/interfaces/tools";

interface ToolHeaderProps {
  tool: Tool;
}

export function ToolHeader({ tool }: ToolHeaderProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const category = getCategoryById(tool.category);
  const isToolFavorite = isFavorite(tool.slug);

  const toggleFavorite = () => {
    if (isToolFavorite) {
      removeFavorite(tool.slug);
    } else {
      addFavorite(tool.slug);
    }
  };

  return (
    <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{tool.name}</h1>
              {tool.featured && <Star className="h-5 w-5 text-yellow-500" />}
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {tool.description}
            </p>
            <div className="flex items-center gap-2">
              {category && <Badge variant="secondary">{category.name}</Badge>}
              <div className="flex gap-1">
                {tool.keywords.slice(0, 3).map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant={isToolFavorite ? "default" : "outline"}
            size="sm"
            onClick={toggleFavorite}
            className="shrink-0"
          >
            {isToolFavorite ? (
              <>
                <StarOff className="h-4 w-4 mr-2" />
                Remove from Favorites
              </>
            ) : (
              <>
                <Star className="h-4 w-4 mr-2" />
                Add to Favorites
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
