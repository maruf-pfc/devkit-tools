import Link from "next/link";
import React from "react";
import { Code2, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Resources", href: "/resources" },
  { name: "Interview Prep", href: "/interview" },
  { name: "GitHub Repos", href: "/github" },
  { name: "About", href: "/about" },
];
const Header = () => {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">DevKit Tools</span>
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
      </div>
    </header>
  );
};
export default Header;
