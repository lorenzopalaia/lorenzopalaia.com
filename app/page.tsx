import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import RecentPosts from "@/components/RecentPosts";

export default function Home() {
  return (
    <>
      <Featured
        text="Check out Euro Hackathons"
        emoji="🎉"
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
