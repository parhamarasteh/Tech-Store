"use client";

import { Menu } from "lucide-react";

export default function MobileMenu() {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 md:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}