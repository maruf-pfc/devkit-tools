import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import FloatingElements from "./FloatingElements";

const HeroSection = () => {
  return (
    <section className="relative container mx-auto px-4 py-20 text-center overflow-hidden">
      <FloatingElements />
      <div className="max-w-4xl mx-auto relative z-10">
        <Badge variant="secondary" className="mb-4">
          <Zap className="h-3 w-3 mr-1" />
          All-in-One Developer Toolkit
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          All-in-One Dev Tools for Developers
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stop wasting time searching for developer utilities. Access JSON
          formatters, UUID generators, regex testers, and more - all in one
          place, optimized for speed and simplicity.
        </p>
        <div className="mb-8 max-w-md mx-auto">
          <SearchBar placeholder="Search developer tools..." />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/tools">
              Explore Tools
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/resources">
              Browse Resources
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
