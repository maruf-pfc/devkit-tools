import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFeaturedTools } from "@/lib/tools";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const FeaturedTools = () => {
  const featuredTools = getFeaturedTools();
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Tools</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our most popular developer utilities, ready to use instantly
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {featuredTools.slice(0, 6).map((tool) => (
          <Card
            key={tool.id}
            className="hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <Link
              href={`/tools/${tool.slug}`}
              className="flex flex-col gap-2 justify-around"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {tool.keywords.slice(0, 3).map((keyword) => (
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
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/tools">
            View All Tools
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTools;
