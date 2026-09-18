import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartButton() {
  return (
    <Link
      href="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100"
      aria-label="Shopping cart"
    >
      <ShoppingBag className="h-5 w-5" />

      <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-950 px-1 text-[9px] font-bold text-white">
        0
      </span>
    </Link>
  );
}