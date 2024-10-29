import Link from "next/link";

//import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center gap-8 py-4">
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
      {/* <ThemeToggle /> */}
    </header>
  );
}
