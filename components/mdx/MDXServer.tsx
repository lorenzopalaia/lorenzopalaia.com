import { MDXRemote } from "next-mdx-remote/rsc";

import MDXCode from "@/components/mdx/MDXCode";
import TOCInline from "@/components/mdx/TOCInline";
import LatexCompiler from "@/components/mdx/LatexCompiler";
import MDXTable from "@/components/mdx/MDXTable";

const components = {
  code: MDXCode,
  TOCInline,
  LatexCompiler,
  MDXTable,
};

export default async function MDXServer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
