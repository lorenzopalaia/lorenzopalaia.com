import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Socials from "@/components/Socials";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import ExtraActivities from "@/components/ExtraActivities";
import SkillsAndLanguages from "@/components/SkillsAndLanguages";
import Footer from "@/components/Footer";

import Link from "next/link";

// TODO: Add a background handler to the page for the radial gradient
const BackgroundHandler = () => (
    <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
            background:
                "radial-gradient(600px at 1997px 3126px, rgba(29, 78, 216, 0.15), transparent 80%)",
        }}
    ></div>
);

const SkipToContent = () => (
    <Link
        href="#content"
        className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
    >
        Skip to Content
    </Link>
);

export default function Home() {
    return (
        <div className="group/spotlight relative">
            <BackgroundHandler />
            <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
                <SkipToContent />
                <div className="lg:flex lg:justify-between lg:gap-4">
                    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                        <div>
                            <Hero />
                            <Navigation />
                        </div>
                        <Socials />
                    </header>
                    <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
                        <About />
                        <Experience />
                        <Projects />
                        <Education />
                        <ExtraActivities />
                        <SkillsAndLanguages />
                        <Footer />
                    </main>
                </div>
            </div>
        </div>
    );
}
