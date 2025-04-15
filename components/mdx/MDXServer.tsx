import { MDXRemote } from "next-mdx-remote/rsc";

import MDXCode from "@/components/mdx/MDXCode";
import TOCInline from "@/components/mdx/TOCInline";
import LatexCompiler from "@/components/mdx/LatexCompiler";

const components = {
  code: MDXCode,
  TOCInline,
  LatexCompiler,
};

export default async function MDXServer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
