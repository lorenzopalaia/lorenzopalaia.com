import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Socials from "@/components/Socials";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import ExtraActivities from "@/components/ExtraActivities";
import SkillsAndLanguages from "@/components/SkillsAndLanguages";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="container mx-auto my-auto">
            <div className="flex flex-col md:flex-row mx-8">
                <div className="md:w-1/2">
                    <div className="left-side">
                        <Hero />
                        <Navigation />
                        <div className="h-[700px]"></div>
                        <Socials />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <About />
                    <WorkExperience />
                    <Projects />
                    <Education />
                    <ExtraActivities />
                    <SkillsAndLanguages />
                    <Footer />
                </div>
            </div>
        </main>
    );
}
