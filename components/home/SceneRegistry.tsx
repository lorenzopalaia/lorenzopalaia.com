import type { ComponentType } from "react";

import { sceneNavigation, type SceneId } from "@/data/sceneNavigation";

import IntroScene from "@/components/home/scenes/IntroScene";
import ExperienceScene from "@/components/home/scenes/ExperienceScene";
import WorkScene from "@/components/home/scenes/WorkScene";
import AboutScene from "@/components/home/scenes/AboutScene";
import LabScene from "@/components/home/scenes/LabScene";
import NotesScene from "@/components/home/scenes/NotesScene";
import ContactScene from "@/components/home/scenes/ContactScene";

const sceneComponents: Record<SceneId, ComponentType> = {
  intro: IntroScene,
  experience: ExperienceScene,
  work: WorkScene,
  about: AboutScene,
  lab: LabScene,
  notes: NotesScene,
  contact: ContactScene,
};

export default function SceneRegistry() {
  return (
    <>
      {sceneNavigation.map((scene) => {
        const SceneComponent = sceneComponents[scene.id];

        return <SceneComponent key={scene.id} />;
      })}
    </>
  );
}
