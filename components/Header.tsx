import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-opacity-75 backdrop-blur-md py-6 border-b">
      <div className="container mx-auto max-w-3xl px-8">
        <div className="flex justify-between items-center gap-8">
          <div className="flex gap-8">
            <Link
              className="text-muted-foreground hover:text-primary title"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary title"
              href="/projects"
            >
              Projects
            </Link>
            {/* <Link
              className="text-muted-foreground hover:text-primary title"
              href="/blog"
            >
              Blog
            </Link> */}
            <Link
              className="text-muted-foreground hover:text-primary title"
              href="/contact"
            >
              Contact
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
