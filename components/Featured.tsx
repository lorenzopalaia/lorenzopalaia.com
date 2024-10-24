import Link from "next/link";
import RightArrowIcon from "@/components/Icons/RightArrowIcon";

export default function Featured() {
  return (
    <div className="top-0 z-50 text-center bg-teal-300 lg:sticky text-slate-900">
      <Link href="https://blog.lorenzopalaia.it" target="_blank">
        Check out my blog
        <RightArrowIcon className="inline-block w-4 h-4 ml-2" />
      </Link>
    </div>
  );
}
