import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-lg py-4">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex justify-between items-center gap-8">
          <div className="flex gap-8">
            <Link className="text-muted-foreground hover:text-primary" href="/">
              Home
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/projects"
            >
              Projects
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
