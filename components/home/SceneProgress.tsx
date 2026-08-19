"use client";

interface SceneProgressProps {
  activeScene: number;
  totalScenes: number;
}

export default function SceneProgress({
  activeScene,
  totalScenes,
}: SceneProgressProps) {
  const progress = totalScenes > 0 ? (activeScene + 1) / totalScenes : 0;

  return (
    <div className="scene-progress">
      <span>{String(activeScene + 1).padStart(2, "0")}</span>

      <i>
        <b
          style={{
            transform: `scaleX(${progress})`,
          }}
        />
      </i>

      <span>{String(totalScenes).padStart(2, "0")}</span>
    </div>
  );
}
