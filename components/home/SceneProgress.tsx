"use client";

import {
  getSceneIndex,
  sceneNavigation,
  type SceneId,
} from "@/data/sceneNavigation";

interface SceneProgressProps {
  activeScene: SceneId;
}

export default function SceneProgress({ activeScene }: SceneProgressProps) {
  const activeIndex = sceneNavigation.findIndex(
    (scene) => scene.id === activeScene,
  );

  const totalScenes = sceneNavigation.length;

  const progress = totalScenes > 0 ? (activeIndex + 1) / totalScenes : 0;

  const currentCoordinate =
    activeIndex >= 0 ? getSceneIndex(activeScene) : "00";

  const lastCoordinate =
    totalScenes > 0 ? getSceneIndex(sceneNavigation[totalScenes - 1].id) : "00";

  return (
    <div className="scene-progress">
      <span>{currentCoordinate}</span>

      <i>
        <b
          style={{
            transform: `scaleX(${progress})`,
          }}
        />
      </i>

      <span>{lastCoordinate}</span>
    </div>
  );
}
