import Image from "next/image";
import { ModeSwitcher } from "./mode-switcher";

export function Header() {
  return (
    <header className="absolute top-0 flex w-full items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Image
          alt="OrcDev Project Review"
          height={32}
          src="/orcdev.png"
          width={32}
        />
        <h1>OrcDev Project Review</h1>
      </div>
      <ModeSwitcher />
    </header>
  );
}
