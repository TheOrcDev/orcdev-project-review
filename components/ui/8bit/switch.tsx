"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import "./styles/retro.css";

interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  font?: "normal" | "retro";
  onCheckedChange?: (checked: boolean) => void;
  size?: "default" | "sm";
}

function Switch({
  checked,
  className,
  defaultChecked = false,
  disabled,
  font = "retro",
  onCheckedChange,
  size = "default",
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = checked ?? internalChecked;

  function toggleSwitch() {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;
    setInternalChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  }

  return (
    <button
      aria-checked={isChecked}
      className={cn(
        "relative inline-flex shrink-0 items-center border-0 bg-muted transition-colors active:translate-y-1 disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "h-8 w-16",
        size === "sm" && "h-6 w-11",
        "data-[state=checked]:bg-foreground data-[state=checked]:text-background dark:data-[state=checked]:bg-ring",
        font === "retro" && "retro",
        className
      )}
      data-state={isChecked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={toggleSwitch}
      role="switch"
      type="button"
      {...props}
    >
      <span
        className={cn(
          "absolute left-1 bg-foreground transition-transform dark:bg-ring",
          size === "default" && "size-6",
          size === "sm" && "size-4",
          isChecked && size === "default" && "translate-x-8",
          isChecked && size === "sm" && "translate-x-5",
          isChecked && "bg-background dark:bg-background"
        )}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1.5 left-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-1.5 right-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 left-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 right-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-1.5 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 -left-1.5 h-[calc(100%-12px)] w-1.5 bg-foreground dark:bg-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 -right-1.5 h-[calc(100%-12px)] w-1.5 bg-foreground dark:bg-ring"
      />
    </button>
  );
}

export { Switch };
