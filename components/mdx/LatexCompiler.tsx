import katex from "katex";

interface LatexCompilerProps {
  formula: string;
}

export function LatexCompiler({ formula }: LatexCompilerProps) {
  const value = formula.trim();

  const displayMode = value.startsWith("$$") && value.endsWith("$$");

  const latex = displayMode
    ? value.slice(2, -2).trim()
    : value.replace(/^\$+/, "").replace(/\$+$/, "").trim();

  const html = katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    strict: false,
  });

  return (
    <span
      className={displayMode ? "mdx-latex mdx-latex--display" : "mdx-latex"}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
