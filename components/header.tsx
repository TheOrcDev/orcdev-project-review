import { ModeSwitcher } from "./mode-switcher";

export function Header() {
  return (
    <header className="absolute top-0 flex w-full items-center justify-between p-4">
      <h1>OrcDev Project Review</h1>
      <ModeSwitcher />
    </header>
  );
}
