import config from "@/config";
import Link from "next/link";

const Hero = () => {
    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <Link href="/">{config.hero.name}</Link>
            </h1>
            <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                {config.hero.title}
            </h2>
            <p className="mt-4 max-w-md leading-normal">
                {config.hero.description}
            </p>
        </>
    );
};

export default Hero;
