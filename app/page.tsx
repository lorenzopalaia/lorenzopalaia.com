import Featured from "@/components/sections/Featured";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import RecentPosts from "@/components/sections/RecentPosts";

export default function Home() {
  return (
    <>
      <Featured
        text="Check out Euro Hackathons"
        emoji="🚀"
        href="https://github.com/lorenzopalaia/Euro-Hackathons"
      />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <RecentPosts />
    </>
  );
}
