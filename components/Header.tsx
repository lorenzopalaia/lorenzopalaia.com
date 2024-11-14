import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b bg-opacity-75 py-6 backdrop-blur-md">
      <div className="container mx-auto max-w-3xl px-8">
        <div className="flex items-center justify-between gap-8">
          <div className="flex gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
