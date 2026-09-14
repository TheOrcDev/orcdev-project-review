"use client";

import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/8bit/separator";
import {
  Command as ShadcnCommand,
  CommandEmpty as ShadcnCommandEmpty,
  CommandGroup as ShadcnCommandGroup,
  CommandItem as ShadcnCommandItem,
  CommandList as ShadcnCommandList,
  CommandSeparator as ShadcnCommandSeparator,
  CommandShortcut as ShadcnCommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/8bit/dialog";

import "@/components/ui/8bit/styles/retro.css";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <div className={cn("relative !p-0", className)}>
      <ShadcnCommand
        data-slot="command"
        className={cn(
          "flex h-full !w-full flex-col overflow-hidden rounded-none bg-popover text-popover-foreground",
          "retro",
          className
        )}
        {...props}
      />

      <div className="absolute -top-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute -top-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute -bottom-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute -bottom-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-1.5 -left-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute top-1.5 -right-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-1.5 -left-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
      <div className="absolute bottom-1.5 -right-1.5 h-1/2 w-1.5 bg-foreground dark:bg-ring" />
    </div>
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className="overflow-visible p-0"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-empty]]:font-normal [&_[cmdk-empty]]:retro [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:retro [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-input]]:font-normal [&_[cmdk-input]]:retro [&_[cmdk-item]]:relative [&_[cmdk-item]]:items-center [&_[cmdk-item]]:justify-center [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]]:text-center [&_[cmdk-item]]:font-normal [&_[cmdk-item]]:retro [&_[cmdk-item]>svg]:absolute [&_[cmdk-item]>svg]:top-1/2 [&_[cmdk-item]>svg]:left-2 [&_[cmdk-item]>svg]:-translate-y-1/2 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="retro flex h-10 items-center gap-2 border-b px-3"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 256 256"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="0.25"
        aria-label="search"
      >
        <rect x="88" y="56" width="14" height="14" rx="1"></rect>
        <rect x="72" y="72" width="14" height="14" rx="1"></rect>
        <rect x="56" y="88" width="14" height="14" rx="1"></rect>
        <rect x="56" y="104" width="14" height="14" rx="1"></rect>
        <rect x="56" y="120" width="14" height="14" rx="1"></rect>
        <rect x="72" y="136" width="14" height="14" rx="1"></rect>
        <rect x="88" y="152" width="14" height="14" rx="1"></rect>
        <rect x="104" y="152" width="14" height="14" rx="1"></rect>
        <rect x="120" y="152" width="14" height="14" rx="1"></rect>
        <rect x="136" y="136" width="14" height="14" rx="1"></rect>
        <rect x="152" y="120" width="14" height="14" rx="1"></rect>
        <rect x="152" y="104" width="14" height="14" rx="1"></rect>
        <rect x="152" y="88" width="14" height="14" rx="1"></rect>
        <rect x="136" y="72" width="14" height="14" rx="1"></rect>
        <rect x="120" y="56" width="14" height="14" rx="1"></rect>
        <rect x="104" y="56" width="14" height="14" rx="1"></rect>
        <rect x="152" y="152" width="14" height="14" rx="1"></rect>
        <rect x="168" y="168" width="14" height="14" rx="1"></rect>
        <rect x="184" y="184" width="14" height="14" rx="1"></rect>
      </svg>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-none bg-transparent py-3 font-normal text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          "retro",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <ShadcnCommandList
      data-slot="command-list"
      className={cn(
        "max-h-[320px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        "retro",
        className
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <ShadcnCommandEmpty
      data-slot="command-empty"
      className="retro py-6 text-center font-normal text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <ShadcnCommandGroup
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:retro",
        "retro",
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <ShadcnCommandSeparator
      data-slot="command-separator"
      className={cn(
        "data-[orientation=horizontal]:bg-[length:16px_8px] data-[orientation=horizontal]:bg-[linear-gradient(90deg,var(--foreground)_75%,transparent_75%)] dark:data-[orientation=horizontal]:bg-[linear-gradient(90deg,var(--ring)_75%,transparent_75%)] shrink-0 data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:bg-[length:2px_16px] data-[orientation=vertical]:bg-[linear-gradient(0deg,var(--foreground)_75%,transparent_75%)] dark:data-[orientation=vertical]:bg-[linear-gradient(0deg,var(--ring)_75%,transparent_75%)]",
        "retro",
        className
      )}
      {...props}
    >
      <Separator />
    </ShadcnCommandSeparator>
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <ShadcnCommandItem
      data-slot="command-item"
      className={cn(
        "relative flex w-full items-center justify-center rounded-none border-y-3 border-ring/0 border-dashed text-center font-normal hover:border-foreground dark:hover:border-ring [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-2 [&>svg]:-translate-y-1/2",
        "retro",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <ShadcnCommandShortcut className={cn("", "retro", className)} {...props} />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
