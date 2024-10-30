import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
    </main>
  );
}
