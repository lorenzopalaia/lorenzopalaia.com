import { MDXRemote } from "next-mdx-remote/rsc";
import Code from "./MDXCode";
import TOCInline from "./mdx/TOCInline";
import LatexCompiler from "./mdx/LatexCompiler";

const components = {
  code: Code,
  TOCInline,
  LatexCompiler,
};

export default async function MDXServer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
