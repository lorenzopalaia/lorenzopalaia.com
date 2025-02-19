"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import type { PrismAsyncLight } from "react-syntax-highlighter";
import type { default as SyntaxHighlighterType } from "react-syntax-highlighter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardCopy } from "lucide-react";
import { ComponentType } from "react";

type SyntaxHighlighterComponent = ComponentType<
  typeof SyntaxHighlighterType extends ComponentType<infer P> ? P : never
>;
type PrismComponent = typeof PrismAsyncLight;

function MacOSButtons() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-red-500" />
      <div className="h-3 w-3 rounded-full bg-yellow-500" />
      <div className="h-3 w-3 rounded-full bg-green-500" />
    </div>
  );
}

export default function Code({
  children,
  className,
  ...props
}: {
  children?: string;
  className?: string;
}) {
  const language = className?.replace(/language-/, "") || "text";
  const { resolvedTheme } = useTheme();
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<
    SyntaxHighlighterComponent | PrismComponent | null
  >(null);
  const [style, setStyle] = useState<{
    [key: string]: React.CSSProperties;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).trim());
  };

  useEffect(() => {
    let mounted = true;

    async function loadSyntaxHighlighter() {
      try {
        let syntaxModule: typeof import("react-syntax-highlighter");
        let styleModule:
          | typeof import("react-syntax-highlighter/dist/esm/styles/prism")
          | typeof import("react-syntax-highlighter/dist/esm/styles/hljs");

        if (resolvedTheme === "dark") {
          syntaxModule = await import("react-syntax-highlighter");
          styleModule = await import(
            "react-syntax-highlighter/dist/esm/styles/prism"
          );

          if (mounted) {
            setSyntaxHighlighter(() => syntaxModule.Prism);
            setStyle(styleModule.vscDarkPlus);
          }
        } else {
          syntaxModule = await import("react-syntax-highlighter");
          styleModule = await import(
            "react-syntax-highlighter/dist/esm/styles/hljs"
          );

          if (mounted) {
            setSyntaxHighlighter(() => syntaxModule.default);
            setStyle(styleModule.docco);
          }
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadSyntaxHighlighter();
    return () => {
      mounted = false;
    };
  }, [resolvedTheme]);

  if (!className) {
    return <code {...props}>{children}</code>;
  }

  if (isLoading) {
    return (
      <span className="relative block">
        <div className="absolute top-3 left-6 flex w-full items-center gap-2">
          <div>
            <MacOSButtons />
            <p className="text-muted-foreground text-xs font-medium uppercase">
              {language}
            </p>
          </div>
        </div>
        <div className="bg-muted-foreground absolute top-16 h-[1px] w-full" />
        <Skeleton className="h-48 w-full rounded-md" />
      </span>
    );
  }

  if (!SyntaxHighlighter || !style) {
    return null;
  }

  return (
    <span className="relative">
      <div className="absolute top-3 left-6 flex w-full items-center gap-2">
        <div>
          <MacOSButtons />
          <p className="text-muted-foreground text-xs font-medium uppercase">
            {language}
          </p>
        </div>
      </div>
      <Button
        onClick={handleCopy}
        className="absolute top-3 right-3 cursor-pointer"
        aria-label="Copy code"
      >
        <ClipboardCopy />
      </Button>
      <div className="bg-muted-foreground absolute top-16 h-[1px] w-full" />
      <SyntaxHighlighter
        language={language}
        style={style}
        PreTag="div"
        showLineNumbers
        showInlineLineNumbers
        wrapLines
        className="!m-0 !pt-20"
        {...props}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    </span>
  );
}
