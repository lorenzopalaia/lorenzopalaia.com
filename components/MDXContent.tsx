import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { JSX } from "react";
import { highlight } from "sugar-high";

import TOCInline from "./TOCInline";

import LatexCompiler from "./LatexCompiler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

const components = {
  code: Code,
  TOCInline,
  LatexCompiler,
};

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
