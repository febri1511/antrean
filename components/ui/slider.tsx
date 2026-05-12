"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

function Slider({ min, max, step = 1, value, onChange, className }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, hsl(var(--primary)) ${percentage}%, hsl(var(--secondary)) ${percentage}%)`,
        }}
      />
    </div>
  );
}

export { Slider };
