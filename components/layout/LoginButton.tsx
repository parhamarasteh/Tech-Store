import Link from "next/link";
import { User } from "lucide-react";

export default function LoginButton() {
  return (
    <Link
      href="/auth/login"
      className="hidden h-10 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 sm:flex"
    >
      <User className="h-4 w-4" />
      Login
    </Link>
  );
}