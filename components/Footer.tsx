import { Separator } from "@/components/ui/separator";

import Socials from "@/components/Socials";
import Signature from "@/components/Signature";

export default function Footer() {
  return (
    <footer className="mt-12">
      <Separator />
      <div className="flex justify-between items-center py-4">
        <div className="flex gap-4 items-center text-muted-foreground">
          <Signature className="size-16" />
          <p>© {new Date().getFullYear()}</p>
        </div>
        <Socials />
      </div>
    </footer>
  );
}
