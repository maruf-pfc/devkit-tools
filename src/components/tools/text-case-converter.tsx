"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

// Helper function to handle clipboard copying
// This was previously in an external file, causing the error.
// By including it here, the component becomes self-contained.
async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      return false;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Async: Could not copy text: ", err);
    return false;
  }
}

interface CaseConversion {
  name: string;
  key: string;
  convert: (text: string) => string;
  example: string;
}

const conversions: CaseConversion[] = [
  {
    name: "camelCase",
    key: "camel",
    convert: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()),
    example: "helloWorldExample",
  },
  {
    name: "PascalCase",
    key: "pascal",
    convert: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^(.)/, (char) => char.toUpperCase()),
    example: "HelloWorldExample",
  },
  {
    name: "snake_case",
    key: "snake",
    convert: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, ""),
    example: "hello_world_example",
  },
  {
    name: "kebab-case",
    key: "kebab",
    convert: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    example: "hello-world-example",
  },
  {
    name: "CONSTANT_CASE",
    key: "constant",
    convert: (text) =>
      text
        .toUpperCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, ""),
    example: "HELLO_WORLD_EXAMPLE",
  },
  {
    name: "dot.case",
    key: "dot",
    convert: (text) =>
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, ".")
        .replace(/^\.+|\.+$/g, ""),
    example: "hello.world.example",
  },
  {
    name: "Title Case",
    key: "title",
    convert: (text) =>
      text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
    example: "Hello World Example",
  },
  {
    name: "Sentence case",
    key: "sentence",
    convert: (text) =>
      text.toLowerCase().replace(/^\w/, (char) => char.toUpperCase()),
    example: "Hello world example",
  },
];

export function TextCaseConverter() {
  const [input, setInput] = useState("");

  const handleCopy = async (text: string, caseName: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success("Copied to clipboard", {
        description: `${caseName} text copied successfully`,
      });
    } else {
      toast.error("Failed to copy", {
        description: "Could not copy to clipboard",
      });
    }
  };

  const loadSample = () => {
    setInput("Hello World! This is a sample text for case conversion.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Convert text between different naming conventions and cases.
              Perfect for developers working with various coding standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert..."
              className="min-h-[120px]"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadSample}
                className="cursor-pointer"
              >
                Load Sample
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("")}
                className="cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversions.map((conversion) => {
            const convertedText = input ? conversion.convert(input) : "";

            return (
              <Card key={conversion.key}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {conversion.name}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(convertedText, conversion.name)}
                      disabled={!convertedText}
                      className="cursor-pointer"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-md font-mono text-sm min-h-[60px] break-words">
                      {convertedText || (
                        <span className="text-muted-foreground italic">
                          Example: {conversion.example}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
