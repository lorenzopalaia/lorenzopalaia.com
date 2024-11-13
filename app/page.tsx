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
        href="https://github.com/lorenzopalaia/Euro-Hackathons"
        emoji="🎉"
        text="Check out Euro Hackathons"
      />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <RecentPosts />
    </>
  );
}
