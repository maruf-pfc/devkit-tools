"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { toast } from "sonner";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const SIMILAR_CHARS = "il1Lo0O";
const AMBIGUOUS_CHARS = "{}[]()/\\'\"`~,;.<>";

function generatePassword(options: PasswordOptions): string {
  let charset = "";

  if (options.includeUppercase) charset += UPPERCASE;
  if (options.includeLowercase) charset += LOWERCASE;
  if (options.includeNumbers) charset += NUMBERS;
  if (options.includeSymbols) charset += SYMBOLS;

  if (options.excludeSimilar) {
    charset = charset
      .split("")
      .filter((char) => !SIMILAR_CHARS.includes(char))
      .join("");
  }

  if (options.excludeAmbiguous) {
    charset = charset
      .split("")
      .filter((char) => !AMBIGUOUS_CHARS.includes(char))
      .join("");
  }

  if (!charset) return "";

  let password = "";
  for (let i = 0; i < options.length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}

function calculateStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  // Length
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character types
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Complexity
  if (
    password.length >= 10 &&
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)
  ) {
    score += 1;
  }

  if (score <= 2) return { score, label: "Weak", color: "text-red-500" };
  if (score <= 4) return { score, label: "Fair", color: "text-yellow-500" };
  if (score <= 6) return { score, label: "Good", color: "text-blue-500" };
  return { score, label: "Strong", color: "text-green-500" };
}

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };

  const handleCopy = async () => {
    if (!password) {
      toast.error("No password to copy", {
        description: "Generate a password first",
      });
      return;
    }

    const success = await copyToClipboard(password);
    if (success) {
      toast.success("Copied to clipboard", {
        description: "Password copied successfully",
      });
    } else {
      toast.error("Failed to copy", {
        description: "Could not copy to clipboard",
      });
    }
  };

  const strength = password ? calculateStrength(password) : null;

  // Generate initial password
  useState(() => {
    handleGenerate();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Generate secure passwords with customizable options. Create strong
              passwords to protect your accounts and data.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Password Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Password Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Length */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Length: {options.length}</Label>
                </div>
                <Slider
                  value={[options.length]}
                  onValueChange={([value]) =>
                    setOptions((prev) => ({ ...prev, length: value }))
                  }
                  min={4}
                  max={128}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              {/* Character Types */}
              <div className="space-y-3">
                <Label>Include Characters</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={options.includeUppercase}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          includeUppercase: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="uppercase" className="text-sm">
                      Uppercase (A-Z)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={options.includeLowercase}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          includeLowercase: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="lowercase" className="text-sm">
                      Lowercase (a-z)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={options.includeNumbers}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          includeNumbers: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="numbers" className="text-sm">
                      Numbers (0-9)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={options.includeSymbols}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          includeSymbols: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="symbols" className="text-sm">
                      Symbols (!@#$%^&*)
                    </Label>
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-3">
                <Label>Advanced Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclude-similar"
                      checked={options.excludeSimilar}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          excludeSimilar: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="exclude-similar" className="text-sm">
                      Exclude similar characters (i, l, 1, L, o, 0, O)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclude-ambiguous"
                      checked={options.excludeAmbiguous}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({
                          ...prev,
                          excludeAmbiguous: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="exclude-ambiguous" className="text-sm">
                      Exclude ambiguous characters (
                      {`{} [] () / \\ ' " \` ~ , ; . < >`})
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full cursor-pointer"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Password
              </Button>
            </CardContent>
          </Card>

          {/* Generated Password */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    className="cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {strength && (
                <div className="space-y-2">
                  <Label>Password Strength</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          strength.score <= 2
                            ? "bg-red-500"
                            : strength.score <= 4
                            ? "bg-yellow-500"
                            : strength.score <= 6
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${(strength.score / 8) * 100}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use unique passwords for each account</p>
                <p>• Store passwords in a secure password manager</p>
                <p>• Enable two-factor authentication when available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
