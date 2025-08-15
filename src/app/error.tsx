"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4"
      role="alert"
    >
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <CardTitle className="text-2xl">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again or return to the
            homepage.
          </p>

          {/* Toggle Error Details */}
          <div className="flex flex-col items-center w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 mb-2 cursor-pointer"
            >
              {showDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {showDetails ? "Hide Error Details" : "Show Error Details"}
            </Button>

            {showDetails && (
              <pre className="w-full max-w-md bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 p-4 rounded overflow-x-auto text-sm">
                {error.message}
              </pre>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center cursor-pointer">
            <Button onClick={reset} className="cursor-pointer">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
