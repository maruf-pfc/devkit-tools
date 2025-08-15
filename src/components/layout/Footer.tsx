import { Code2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-semibold">DevKit Tools</span>
            </div>
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contribute"
              className="hover:text-foreground transition-colors"
            >
              Contribute
            </Link>
            <Link
              href="https://github.com/maruf-pfc/devkit-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <span>
              Built with ❤️ by{" "}
              <Link
                href="https://www.linkedin.com/in/mdmarufsarker"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Maruf
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
