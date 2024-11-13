import { Separator } from "@/components/ui/separator";

import Socials from "@/components/Socials";
import Signature from "@/components/Signature";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-16">
      <Separator className="h-[2px]" />
      <div className="flex flex-col gap-2 justify-center sm:flex-row-reverse sm:justify-between items-center pt-8">
        <Socials />
        <div className="flex gap-4 items-center text-muted-foreground">
          <Signature className="size-12" />
          <p>© {new Date().getFullYear()}</p>|
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
        >
          Click here!
        </Link>
      </p>
    </footer>
  );
}
