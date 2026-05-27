import { type VariantProps, cva } from "class-variance-authority";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuCheckboxItem as ShadcnDropdownMenuCheckboxItem,
  DropdownMenuContent as ShadcnDropdownMenuContent,
  DropdownMenuGroup as ShadcnDropdownMenuGroup,
  DropdownMenuItem as ShadcnDropdownMenuItem,
  DropdownMenuLabel as ShadcnDropdownMenuLabel,
  DropdownMenuPortal as ShadcnDropdownMenuPortal,
  DropdownMenuSeparator as ShadcnDropdownMenuSeparator,
  DropdownMenuShortcut as ShadcnDropdownMenuShortcut,
  DropdownMenuSub as ShadcnDropdownMenuSub,
  DropdownMenuSubContent as ShadcnDropdownMenuSubContent,
  DropdownMenuSubTrigger as ShadcnDropdownMenuSubTrigger,
  DropdownMenuTrigger as ShadcnDropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import "./styles/retro.css";

const DropdownMenu = ShadcnDropdownMenu;

const DropdownMenuPortal = ShadcnDropdownMenuPortal;

const DropdownMenuTrigger = ShadcnDropdownMenuTrigger;

const DropdownMenuGroup = ShadcnDropdownMenuGroup;

const DropdownMenuLabel = ShadcnDropdownMenuLabel;

const DropdownMenuSeparator = ShadcnDropdownMenuSeparator;

const DropdownMenuShortcut = ShadcnDropdownMenuShortcut;

const DropdownMenuSub = ShadcnDropdownMenuSub;

const DropdownMenuCheckboxItem = ShadcnDropdownMenuCheckboxItem;

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <ShadcnDropdownMenuSubTrigger
      className={cn(
        "rounded-none border-y-4 border-transparent border-dashed bg-transparent hover:border-foreground focus:border-foreground active:bg-transparent focus:bg-transparent hover:bg-transparent data-[state=open]:border-foreground dark:focus:border-ring dark:hover:border-ring dark:data-[state=open]:border-ring",
        className
      )}
      {...props}
    >
      {children}
    </ShadcnDropdownMenuSubTrigger>
  );
}

function DropdownMenuItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ShadcnDropdownMenuItem
      className={cn(
        "rounded-none border-y-3 border-transparent border-dashed bg-transparent hover:border-foreground focus:border-foreground active:bg-transparent focus:bg-transparent hover:bg-transparent dark:focus:border-ring dark:hover:border-ring",
        className
      )}
      {...props}
    >
      {children}
    </ShadcnDropdownMenuItem>
  );
}

export const dropDownVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

export interface BitDropownMenuContentProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropDownVariants> {}

function DropdownMenuSubContent({
  children,
  className,
  font,
  ...props
}: BitDropownMenuContentProps) {
  return (
    <ShadcnDropdownMenuSubContent
      {...props}
      className={cn("bg-popover", font !== "normal" && "retro", className)}
    >
      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -mx-1.5 border-x-6 border-foreground dark:border-ring"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -my-1.5 border-y-6 border-foreground dark:border-ring"
      />
    </ShadcnDropdownMenuSubContent>
  );
}

function DropdownMenuContent({
  children,
  font,
  className,
  ...props
}: BitDropownMenuContentProps) {
  return (
    <ShadcnDropdownMenuContent
      className={cn("mt-1 py-2", font !== "normal" && "retro", className)}
      {...props}
    >
      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -mx-1.5 mt-2.5 border-x-6 border-foreground dark:border-ring"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -my-1.5 mt-1 border-y-6 border-foreground dark:border-ring"
      />
    </ShadcnDropdownMenuContent>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
};
