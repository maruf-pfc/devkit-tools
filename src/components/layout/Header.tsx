"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Code2, Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Resources", href: "/resources" },
  { name: "Interview Prep", href: "/interview" },
  { name: "GitHub Repos", href: "/github" },
  { name: "About", href: "/about" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          <span className="text-lg md:text-2xl font-bold truncate">DevKit Tools</span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navigation.map((item) => (
            <Button variant="ghost" key={item.name} asChild>
              <Link key={item.name} href={item.href}>
                {item.name}
              </Link>
            </Button>
          ))}
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/maruf-pfc/devkit-tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" /> GitHub
            </Link>
          </Button>
          <ThemeToggle />
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-bold flex items-center gap-2">
                  <Code2 className="h-6 w-6 text-primary" />
                  DevKit Tools
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-1 text-lg font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t flex flex-col gap-4">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link
                      href="https://github.com/maruf-pfc/devkit-tools"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      <Github className="h-4 w-4 mr-2" /> GitHub Repository
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
export default Header;
