"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/8bit/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/8bit/command";
import { commandMenuGroups } from "@/config/nav-items";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function navigateTo(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <Button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        aria-label="Open command menu"
        className="retro h-8 shrink-0 gap-2 px-2 text-[10px] sm:px-3"
        onClick={() => setOpen(true)}
        type="button"
        variant="ghost"
      >
        <SearchIcon aria-hidden className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="pointer-events-none hidden border border-foreground px-1.5 py-0.5 font-normal text-[10px] sm:inline-block">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog
        description="Search pages to jump to"
        onOpenChange={setOpen}
        open={open}
        title="Command Menu"
      >
        <CommandInput aria-label="Search pages" placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No pages found.</CommandEmpty>
          {commandMenuGroups.flatMap((group, index) => [
            index > 0 ? (
              <CommandSeparator key={`${group.heading}-separator`} />
            ) : null,
            <CommandGroup heading={group.heading} key={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => navigateTo(item.href)}
                  value={`${item.label} ${item.href}`}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>,
          ])}
        </CommandList>
      </CommandDialog>
    </>
  );
}
