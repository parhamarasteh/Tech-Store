import Link from "next/link";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Phones",
    href: "/category/phones",
  },
  {
    name: "Laptops",
    href: "/category/laptops",
  },
  {
    name: "Accessories",
    href: "/category/accessories",
  },
];

export default function Navbar() {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}