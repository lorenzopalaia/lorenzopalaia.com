"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { SceneId } from "@/data/sceneNavigation";

import HomeHeader from "./HomeHeader";
import SceneProgress from "./SceneProgress";

interface HomeScene {
  readonly id: SceneId;
  readonly label: string;
  readonly coordinateLabel: string;
  readonly dark?: boolean;
}

interface HomeClientProps {
  children: React.ReactNode;
  scenes: readonly HomeScene[];
}

function scrollToScene(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
}

export default function HomeClient({ children, scenes }: HomeClientProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState(0);

  const sceneIds = scenes.map((scene) => scene.id);

  const syncScene = useCallback(() => {
    const node = viewportRef.current;

    if (!node || window.innerWidth < 920) {
      return;
    }

    const nextScene = Math.max(
      0,
      Math.min(
        sceneIds.length - 1,
        Math.round(node.scrollLeft / node.clientWidth),
      ),
    );

    setActiveScene(nextScene);
  }, [sceneIds.length]);

  useEffect(() => {
    const node = viewportRef.current;

    if (!node) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (
        window.innerWidth < 920 ||
        Math.abs(event.deltaY) < Math.abs(event.deltaX)
      ) {
        return;
      }

      event.preventDefault();

      node.scrollBy({
        left: event.deltaY,
        behavior: "smooth",
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        window.innerWidth < 920 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        const nextIndex = Math.min(activeScene + 1, sceneIds.length - 1);

        scrollToScene(sceneIds[nextIndex]);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        const previousIndex = Math.max(activeScene - 1, 0);

        scrollToScene(sceneIds[previousIndex]);
      }
    };

    node.addEventListener("wheel", onWheel, {
      passive: false,
    });

    node.addEventListener("scroll", syncScene, {
      passive: true,
    });

    window.addEventListener("keydown", onKeyDown);

    syncScene();

    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("scroll", syncScene);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeScene, sceneIds, syncScene]);

  const activeSceneId = sceneIds[activeScene] ?? sceneIds[0];

  return (
    <div className="portfolio-shell">
      <HomeHeader activeScene={activeSceneId} onNavigate={scrollToScene} />

      <div ref={viewportRef} className="scene-viewport">
        {children}
      </div>

      <SceneProgress activeScene={activeSceneId} />
    </div>
  );
}
