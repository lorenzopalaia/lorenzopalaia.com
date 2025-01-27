import { Separator } from "@/components/ui/separator";

import Socials from "@/components/Socials";
import Signature from "@/components/Signature";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-16">
      <Separator className="h-[2px]" />
      <div className="flex flex-col items-center justify-center gap-2 pt-8 sm:flex-row-reverse sm:justify-between">
        <Socials />
        <div className="text-muted-foreground flex items-center gap-4">
          <Signature className="size-12" />
          <p>&copy; {new Date().getFullYear()}</p>|
          <Link href="/privacy" className="hover:text-primary font-bold">
            Privacy Policy
          </Link>
        </div>
      </div>
      <p className="text-muted-foreground pt-4 text-center sm:text-start">
        Looking for previous website version?{" "}
        <Link
          href="https://v1.lorenzopalaia.it/"
          className="hover:text-primary font-bold"
          target="_blank"
        >
          Click here!
        </Link>
      </p>
    </footer>
  );
}
