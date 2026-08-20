import HomeClient from "@/components/home/HomeClient";
import SceneRegistry from "@/components/home/SceneRegistry";

import { sceneNavigation } from "@/data/sceneNavigation";

export default function Home() {
  return (
    <HomeClient scenes={sceneNavigation}>
      <SceneRegistry />
    </HomeClient>
  );
}
