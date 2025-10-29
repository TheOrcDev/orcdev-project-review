import Image from "next/image";
import Link from "next/link";
import { ModeSwitcher } from "./mode-switcher";

export function Header() {
  return (
    <header className="absolute top-0 flex w-full items-center justify-between p-4">
      <Link
        className="flex items-center gap-2"
        href="/"
        rel="noopener noreferrer"
        title="OrcDev Project Review"
      >
        <Image
          alt="OrcDev Project Review"
          height={32}
          src="/orcdev.png"
          width={32}
        />
      </Link>
      <ModeSwitcher />
    </header>
  );
}
