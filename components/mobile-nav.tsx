"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/config/nav-items";

import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          ☰
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-3/4">
        <DrawerHeader className="overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navItems.header.map((item) => (
              <Link
                className="font-extralight text-2xl"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
