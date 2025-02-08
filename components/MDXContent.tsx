"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { JSX, ComponentType } from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { PrismAsyncLight } from "react-syntax-highlighter";
import type { default as SyntaxHighlighterType } from "react-syntax-highlighter";

import TOCInline from "./mdx/TOCInline";
import LatexCompiler from "./mdx/LatexCompiler";

type SyntaxHighlighterComponent = ComponentType<
  typeof SyntaxHighlighterType extends ComponentType<infer P> ? P : never
>;
type PrismComponent = typeof PrismAsyncLight;

function Code({
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
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).trim());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    function loadSyntaxHighlighter() {
      if (resolvedTheme === "dark") {
        import("react-syntax-highlighter").then(
          ({ Prism: SyntaxHighlighter }) => {
            import("react-syntax-highlighter/dist/esm/styles/prism").then(
              ({ vscDarkPlus }) => {
                setSyntaxHighlighter(() => SyntaxHighlighter);
                setStyle(vscDarkPlus);
              },
            );
          },
        );
      } else {
        import("react-syntax-highlighter").then((SyntaxHighlighter) => {
          import("react-syntax-highlighter/dist/esm/styles/hljs").then(
            ({ docco }) => {
              setSyntaxHighlighter(() => SyntaxHighlighter.default);
              setStyle(docco);
            },
          );
        });
      }
    }
    loadSyntaxHighlighter();
  }, [resolvedTheme]);

  if (!SyntaxHighlighter || !style) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 cursor-pointer rounded-md border bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200 focus:opacity-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Copy code"
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>

      <SyntaxHighlighter
        language={language}
        style={style}
        PreTag="div"
        showLineNumbers
        showInlineLineNumbers
        wrapLines
        className="!pt-10"
        {...props}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    </div>
  );
}

const components = {
  code: Code,
  TOCInline,
  LatexCompiler,
};

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
