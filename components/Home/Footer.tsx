import BaseLink from "@/components/Links/BaseLink";

import Signature from "@/components/Signature";

export default function Footer() {
  return (
    <footer className="pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        Loosely designed in{" "}
        <BaseLink href="https://www.figma.com/" className="text-slate-400">
          Figma
        </BaseLink>{" "}
        and coded in{" "}
        <BaseLink
          href="https://code.visualstudio.com/"
          className="text-slate-400"
        >
          Visual Studio Code
        </BaseLink>{" "}
        by yours truly. Built with{" "}
        <BaseLink href="https://nextjs.org/" className="text-slate-400">
          Next.js
        </BaseLink>{" "}
        and{" "}
        <BaseLink href="https://tailwindcss.com/" className="text-slate-400">
          Tailwind CSS
        </BaseLink>
        , deployed with{" "}
        <BaseLink href="https://vercel.com/" className="text-slate-400">
          Vercel
        </BaseLink>
        . All text is set in the{" "}
        <BaseLink href="https://rsms.me/inter/" className="text-slate-400">
          Inter
        </BaseLink>{" "}
        typeface.
      </p>
      <p className="mt-4">
        Copyright © {new Date().getFullYear()} - All Rights Reserved
      </p>
      <Signature className="mt-8 size-24" />
    </footer>
  );
}
