import Link from "next/link";
import {
  Code2,
  Github,
  Twitter,
  Mail,
  Heart,
  Star,
  Bookmark,
  Zap,
} from "lucide-react";

const footerLinks = {
  popularTools: [
    { name: "JSON Formatter", href: "/tools/json-formatter" },
    { name: "UUID Generator", href: "/tools/uuid-generator" },
    { name: "Base64 Encoder", href: "/tools/base64-encoder" },
    { name: "Regex Tester", href: "/tools/regex-tester" },
    { name: "Password Generator", href: "/tools/password-generator" },
    { name: "Color Picker", href: "/tools/color-picker" },
    { name: "Lorem Ipsum", href: "/tools/lorem-ipsum" },
    { name: "JWT Decoder", href: "/tools/jwt-decoder" },
  ],
  resources: [
    { name: "UI Graphics", href: "/resources?category=design" },
    { name: "CSS Frameworks", href: "/resources?category=development" },
    { name: "React Libraries", href: "/resources?category=development" },
    { name: "Design Tools", href: "/resources?category=tools" },
    { name: "Chrome Extensions", href: "/resources?category=tools" },
    { name: "Learning Resources", href: "/resources?category=learning" },
    { name: "Color Palettes", href: "/resources?category=design" },
    { name: "Icon Libraries", href: "/resources?category=design" },
  ],
  interview: [
    { name: "Data Structures", href: "/interview?category=algorithms" },
    { name: "System Design", href: "/interview?category=system-design" },
    { name: "Behavioral Questions", href: "/interview?category=behavioral" },
    { name: "Coding Challenges", href: "/interview?category=algorithms" },
    { name: "Mock Interviews", href: "/interview?category=practice" },
    { name: "Company Guides", href: "/interview?category=companies" },
    { name: "Salary Negotiation", href: "/interview?category=behavioral" },
    { name: "Resume Tips", href: "/interview?category=career" },
  ],
  github: [
    { name: "React Projects", href: "/github?language=javascript" },
    { name: "Python Tools", href: "/github?language=python" },
    { name: "Node.js Apps", href: "/github?language=javascript" },
    { name: "Developer Tools", href: "/github?category=tools" },
    { name: "Learning Projects", href: "/github?category=learning" },
    { name: "Open Source", href: "/github?category=opensource" },
    { name: "Awesome Lists", href: "/github?category=awesome" },
    { name: "Frontend Frameworks", href: "/github?category=frontend" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Code2 className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="font-bold text-2xl">DevKit Tools</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Essential developer tools and resources to boost your
              productivity. All-in-one platform for modern developers with 10+
              tools, extensive resources, and interview preparation materials.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/maruf-pfc/devkit-tools"
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:mdmarufsarker.mms@gmail.com"
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Popular Tools
            </h3>
            <ul className="space-y-3">
              {footerLinks.popularTools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" />
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Prep */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Interview Prep
            </h3>
            <ul className="space-y-3">
              {footerLinks.interview.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub Repos */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Github className="h-4 w-4 text-primary" />
              GitHub Repos
            </h3>
            <ul className="space-y-3">
              {footerLinks.github.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevKit Tools. All rights reserved.
            Built with ❤️ for developers worldwide.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" />{" "}
              for developers
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>
                Star us on{" "}
                <Link
                  href={"https://github.com/maruf-pfc/devkit-tools"}
                  className="text-indigo-500"
                >
                  GitHub
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
