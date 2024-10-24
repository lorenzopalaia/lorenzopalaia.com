import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import GitHubCalendar from "@/components/GitHubCalendar";
import Wakatime from "@/components/Wakatime";

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
        {/* <Socials /> */}
      </div>
    </header>
  );
}
