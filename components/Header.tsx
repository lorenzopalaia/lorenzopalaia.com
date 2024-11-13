import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-opacity-75 backdrop-blur-md py-6 border-b">
      <div className="container mx-auto max-w-3xl px-8">
        <div className="flex justify-between items-center gap-8">
          <div className="flex gap-8">
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
