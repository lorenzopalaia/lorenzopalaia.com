// import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <>
      {/* <Featured
        href="https://blog.lorenzopalaia.it/"
        emoji="🎉"
        text="Check out my blog"
      /> */}
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
    </>
  );
}
