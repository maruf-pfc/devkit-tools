import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Code, Bug, Lightbulb, Heart, Users, Star } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Contribute | DevKit Tools",
  description: "Learn how to contribute to DevKit Tools. Help us build the best developer utilities platform together.",
}

export default function ContributePage() {
  const contributionTypes = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Contributions",
      description: "Add new tools, fix bugs, or improve existing features.",
      examples: [
        "New developer tools",
        "UI/UX improvements",
        "Performance optimizations",
        "Accessibility enhancements",
      ],
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Bug Reports",
      description: "Help us identify and fix issues to improve the platform.",
      examples: ["Tool malfunctions", "UI/UX issues", "Browser compatibility", "Performance problems"],
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Feature Requests",
      description: "Suggest new tools or improvements to existing ones.",
      examples: ["New utility tools", "Feature enhancements", "Integration ideas", "Workflow improvements"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Support",
      description: "Help other developers and spread the word about DevKit Tools.",
      examples: ["Answer questions", "Share on social media", "Write tutorials", "Create content"],
    },
  ]

  const techStack = ["Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui", "React", "Node.js"]

  const guidelines = [
    {
      title: "Code Quality",
      items: [
        "Follow TypeScript best practices",
        "Write clean, readable code",
        "Include proper error handling",
        "Add comments for complex logic",
      ],
    },
    {
      title: "Testing",
      items: [
        "Test your changes thoroughly",
        "Ensure cross-browser compatibility",
        "Verify responsive design",
        "Check accessibility standards",
      ],
    },
    {
      title: "Documentation",
      items: [
        "Update README if needed",
        "Document new features",
        "Include usage examples",
        "Write clear commit messages",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-12 w-12 text-red-500" />
            <h1 className="text-4xl font-bold">Contribute to DevKit Tools</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the best developer utilities platform. Every contribution makes a difference!
          </p>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-6 w-6" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Ready to contribute? Here's how to get started in just a few steps:</p>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 w-6 h-6 flex items-center justify-center p-0">
                  1
                </Badge>
                <span>
                  <strong>Fork the repository</strong> on GitHub and clone it to your local machine
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 w-6 h-6 flex items-center justify-center p-0">
                  2
                </Badge>
                <span>
                  <strong>Install dependencies</strong> with <code className="bg-muted px-1 rounded">npm install</code>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 w-6 h-6 flex items-center justify-center p-0">
                  3
                </Badge>
                <span>
                  <strong>Start development</strong> with <code className="bg-muted px-1 rounded">npm run dev</code>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 w-6 h-6 flex items-center justify-center p-0">
                  4
                </Badge>
                <span>
                  <strong>Make your changes</strong> and test them thoroughly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 w-6 h-6 flex items-center justify-center p-0">
                  5
                </Badge>
                <span>
                  <strong>Submit a pull request</strong> with a clear description of your changes
                </span>
              </li>
            </ol>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="https://github.com/devkit-tools/devkit-tools" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/devkit-tools/devkit-tools/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Fork Repository
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ways to Contribute */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Ways to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributionTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{type.icon}</div>
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">{type.description}</p>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Examples:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {type.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              DevKit Tools is built with modern web technologies. Familiarity with these technologies will help you
              contribute more effectively:
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Don't worry if you're not familiar with all of these - we welcome contributors of all skill levels!
            </p>
          </CardContent>
        </Card>

        {/* Contribution Guidelines */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Contribution Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidelines.map((guideline, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{guideline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {guideline.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Connect with other contributors and stay updated on the latest developments:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" asChild className="justify-start bg-transparent">
                <Link
                  href="https://github.com/devkit-tools/devkit-tools/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub Discussions
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start bg-transparent">
                <Link
                  href="https://github.com/devkit-tools/devkit-tools/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Report Issues
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardContent className="pt-6 text-center space-y-4">
            <h3 className="text-2xl font-semibold">Recognition & Thanks</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All contributors are recognized in our README and release notes. Your contributions help thousands of
              developers worldwide be more productive. Thank you for making DevKit Tools better!
            </p>
            <Button asChild size="lg">
              <Link href="https://github.com/devkit-tools/devkit-tools" target="_blank" rel="noopener noreferrer">
                <Heart className="h-4 w-4 mr-2" />
                Start Contributing
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
