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
        <div className="flex items-center gap-4 text-muted-foreground">
          <Signature className="size-12" />
          <p>&copy; {new Date().getFullYear()}</p>|
          <Link href="/privacy" className="font-bold hover:text-primary">
            Privacy Policy
          </Link>
        </div>
      </div>
      <p className="pt-4 text-center text-muted-foreground sm:text-start">
        Looking for previous website version?{" "}
        <Link
          href="https://v1.lorenzopalaia.it/"
          className="font-bold hover:text-primary"
        >
          Click here!
        </Link>
      </p>
    </footer>
  );
}
