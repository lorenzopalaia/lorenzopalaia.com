import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div className="min-h-screen px-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <section className="sm:flex">
            <p className="title text-muted-foreground text-6xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="title sm:text-5xl">Oops! Page not found.</h1>
                <p className="mt-1 text-base text-muted-foreground">
                  Looks like you took a wrong turn. Don&apos;t worry, it happens
                  to the best of us. Let&apos;s get you back on track!
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/"
                  className="flex gap-2 items-center text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft />
                  Go back to safety
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
