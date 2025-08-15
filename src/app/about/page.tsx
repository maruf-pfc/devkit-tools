import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Heart, Users, Zap, Github } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | DevKit Tools",
  description:
    "Learn about DevKit Tools - the all-in-one developer utilities platform built with Next.js and modern web technologies.",
};

export default function AboutPage() {
  const technologies = [
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Framer Motion",
    "PWA Ready",
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description:
        "Built with performance in mind using Next.js 15 and modern web technologies.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Developer Focused",
      description:
        "Created by developers, for developers. Every tool is designed with real-world use cases in mind.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Open Source",
      description:
        "Completely open source and free to use. Contribute to make it even better.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">About DevKit Tools</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The all-in-one developer utilities platform that saves you time and
            boosts your productivity.
          </p>
        </div>

        {/* Mission */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              As developers, we&apos;ve all been there - spending precious
              minutes searching for that JSON formatter, UUID generator, or
              regex tester when we should be focusing on building amazing
              products. DevKit Tools was born from this frustration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is simple: provide developers with instant access to
              essential utilities in one beautiful, fast, and reliable platform.
              No more bookmarking dozens of different tools or dealing with
              cluttered interfaces filled with ads.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Built With Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              DevKit Tools is built using cutting-edge web technologies to
              ensure the best performance, accessibility, and user experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">
                Developer Tools
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Free & Open</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">0</div>
              <div className="text-sm text-muted-foreground">
                Ads or Tracking
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Your privacy and data security are our top priorities. DevKit
              Tools processes all data locally in your browser - nothing is sent
              to our servers. Your sensitive information stays on your device.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                All processing happens locally in your browser
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                No data collection or tracking
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                No ads or third-party scripts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Open source and transparent
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center space-y-4">
            <h3 className="text-2xl font-semibold">
              Ready to boost your productivity?
            </h3>
            <p className="text-muted-foreground">
              Join thousands of developers who trust DevKit Tools for their
              daily development tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tools">
                  <Zap className="h-4 w-4 mr-2" />
                  Explore Tools
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contribute">
                  <Github className="h-4 w-4 mr-2" />
                  Contribute
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
