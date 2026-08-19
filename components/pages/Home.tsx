import HomeClient from "@/components/home/HomeClient";

import IntroScene from "@/components/home/scenes/IntroScene";
import WorkScene from "@/components/home/scenes/WorkScene";
import AboutScene from "@/components/home/scenes/AboutScene";
import ExperienceScene from "@/components/home/scenes/ExperienceScene";
import LabScene from "@/components/home/scenes/LabScene";
import NotesScene from "@/components/home/scenes/NotesScene";
import ContactScene from "@/components/home/scenes/ContactScene";

export default function Home() {
  return (
    <HomeClient>
      <IntroScene />
      <WorkScene />
      <AboutScene />
      <ExperienceScene />
      <LabScene />
      <NotesScene />
      <ContactScene />
    </HomeClient>
  );
}
