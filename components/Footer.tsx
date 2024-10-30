import { Separator } from "@/components/ui/separator";

import Socials from "@/components/Socials";
import Signature from "@/components/Signature";

export default function Footer() {
  return (
    <footer className="mb-32">
      <Separator />
      <div className="flex flex-col gap-2 justify-center sm:flex-row-reverse sm:justify-between items-center pt-8">
        <Socials />
        <div className="flex gap-4 items-center text-muted-foreground">
          <Signature className="size-16" />
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
