import Featured from "@/components/sections/Featured";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import RecentPosts from "@/components/sections/RecentPosts";
import { config } from "@/config";

export default function Home() {
  const href =
    config.socials.find((social) => social.name === "LinkedIn")?.href || "#";

  return (
    <>
      <Featured text="Check out LinkedIn" emoji="🚀" href={href} />
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <RecentPosts />
    </>
  );
}
