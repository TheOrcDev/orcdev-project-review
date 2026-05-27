"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/8bit/button";
import { Badge } from "@/components/ui/8bit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { cn } from "@/lib/utils";

interface ComboCounterProps extends React.ComponentProps<"div"> {
  initialCombo?: number;
}

const MULTIPLIER_TIERS = [
  { threshold: 50, multiplier: 5, color: "bg-purple-500 border-purple-500" },
  { threshold: 20, multiplier: 4, color: "bg-red-500 border-red-500" },
  { threshold: 10, multiplier: 3, color: "bg-orange-500 border-orange-500" },
  { threshold: 5, multiplier: 2, color: "bg-yellow-500 border-yellow-500" },
  { threshold: 0, multiplier: 1, color: "bg-green-500 border-green-500" },
];

export default function ComboCounter({
  className,
  initialCombo = 0,
  ...props
}: ComboCounterProps) {
  const [combo, setCombo] = useState(initialCombo);
  const [isPulsing, setIsPulsing] = useState(false);

  const { multiplier, tierColor } = useMemo(() => {
    const tier = MULTIPLIER_TIERS.find((t) => combo >= t.threshold)!;
    return { multiplier: tier.multiplier, tierColor: tier.color };
  }, [combo]);

  useEffect(() => {
    if (combo > 0) {
      setIsPulsing(true);
      const timeout = setTimeout(() => setIsPulsing(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [combo]);

  const handleIncrement = () => {
    setCombo((prev) => prev + 1);
  };

  const handleReset = () => {
    setCombo(0);
  };

  const glowIntensity = Math.min(combo / 50, 1);
  const glowStyle = {
    boxShadow:
      glowIntensity > 0
        ? `0 0 ${10 + glowIntensity * 20}px ${glowIntensity * 10}px rgba(147, 51, 234, ${glowIntensity * 0.4})`
        : "none",
  };

  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-col items-center justify-center gap-2 pb-2">
        <CardTitle>Combo</CardTitle>
        <CardDescription className="text-xs">
          Build your streak!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className="relative flex flex-col items-center justify-center rounded-lg p-6 transition-all duration-300"
          style={glowStyle}
        >
          <span
            className={cn(
              "text-6xl font-bold tabular-nums transition-transform duration-150",
              isPulsing && "scale-125"
            )}
          >
            {combo}
          </span>
        </div>

        <Badge className={cn("text-sm transition-colors duration-300", tierColor)}>
          x{multiplier}
        </Badge>

        <div className="flex gap-4 pt-2">
          <Button onClick={handleIncrement}>+1</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
