// ! Currently not sticky, should probably set relative to parent?

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import config from "@/config";

export default function Featured() {
  return (
    <div className="top-0 z-50 text-center bg-teal-300 lg:sticky text-slate-900">
      <Link href={config.featured.url} target="_blank">
        {config.featured.text}
        <ArrowRight className="inline-block w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}
