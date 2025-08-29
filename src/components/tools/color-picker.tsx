"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Palette } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { toast } from "sonner";

interface ColorFormat {
  name: string;
  value: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number;
  let s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [formats, setFormats] = useState<ColorFormat[]>([]);

  useEffect(() => {
    const rgb = hexToRgb(color);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const newFormats: ColorFormat[] = [
      { name: "HEX", value: color.toUpperCase() },
      { name: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
      { name: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
      { name: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
      { name: "HSLA", value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` },
      { name: "CSS Variable", value: `--color: ${color};` },
      { name: "Tailwind", value: `bg-[${color}]` },
    ];

    setFormats(newFormats);
  }, [color]);

  const handleCopy = async (value: string, formatName: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      toast.success("Copied to clipboard", {
        description: `${formatName} color value copied successfully`,
      });
    } else {
      toast.error("Failed to copy", {
        description: "Could not copy to clipboard",
      });
    }
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    setColor(randomColor);
  };

  const presetColors = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#6b7280", // gray
    "#000000", // black
    "#ffffff", // white
    "#f3f4f6", // light gray
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Pick colors and convert between different formats including HEX,
              RGB, HSL, and CSS values.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Picker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Picker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Preview */}
              <div className="space-y-4">
                <div
                  className="w-full h-32 rounded-lg border-2 border-border shadow-inner"
                  style={{ backgroundColor: color }}
                />

                {/* Color Input */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="color-input">Color Value</Label>
                    <Input
                      id="color-input"
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                  </div>
                </div>

                <Button
                  onClick={generateRandomColor}
                  variant="outline"
                  className="w-full bg-transparent cursor-pointer"
                >
                  Generate Random Color
                </Button>
              </div>

              {/* Preset Colors */}
              <div className="space-y-2">
                <Label>Preset Colors</Label>
                <div className="grid grid-cols-6 gap-2">
                  {presetColors.map((presetColor) => (
                    <button
                      key={presetColor}
                      type="button"
                      onClick={() => setColor(presetColor)}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: presetColor }}
                      title={presetColor}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Formats */}
          <Card>
            <CardHeader>
              <CardTitle>Color Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formats.map((format) => (
                  <div
                    key={format.name}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                  >
                    <div>
                      <div className="font-medium text-sm">{format.name}</div>
                      <div className="font-mono text-sm text-muted-foreground">
                        {format.value}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(format.value, format.name)}
                      className="shrink-0 cursor-pointer"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
