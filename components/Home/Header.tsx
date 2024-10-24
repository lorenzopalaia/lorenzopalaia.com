import Hero from "@/components/Home/Header/Hero";
import Navigation from "@/components/Home/Header/Navigation";
import GitHubCalendar from "@/components/Home/Header/GitHubCalendar";
import Wakatime from "@/components/Home/Header/Wakatime";
import Socials from "@/components/Home/Header/Socials";

export default function Header() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <Hero />
        <Navigation />
      </div>
      <div>
        <GitHubCalendar />
        <Wakatime />
        <Socials />
      </div>
    </header>
  );
}
