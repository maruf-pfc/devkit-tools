import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Code2, Github } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">DevKit Tools</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/maruf-pfc/devkit-tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
