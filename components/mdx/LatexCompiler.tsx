import "katex/dist/katex.min.css";

import Latex from "react-latex-next";

export default function LatexCompiler({ formula }: { formula: string }) {
  return <Latex>{formula}</Latex>;
}
