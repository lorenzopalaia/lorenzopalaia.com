"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { sceneNavigation } from "@/data/sceneNavigation";

import HomeHeader from "./HomeHeader";
import SceneProgress from "./SceneProgress";

const scenes = sceneNavigation.map((scene) => scene.id);

function scrollToScene(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
}

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState(0);

  const syncScene = useCallback(() => {
    const node = viewportRef.current;

    if (!node || window.innerWidth < 920) {
      return;
    }

    const nextScene = Math.max(
      0,
      Math.min(
        scenes.length - 1,
        Math.round(node.scrollLeft / node.clientWidth),
      ),
    );

    setActiveScene(nextScene);
  }, []);

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

        const nextIndex = Math.min(activeScene + 1, scenes.length - 1);

        scrollToScene(scenes[nextIndex]);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        const previousIndex = Math.max(activeScene - 1, 0);

        scrollToScene(scenes[previousIndex]);
      }
    };

    node.addEventListener("wheel", onWheel, {
      passive: false,
    });

    node.addEventListener("scroll", syncScene, { passive: true });

    window.addEventListener("keydown", onKeyDown);

    syncScene();

    return () => {
      node.removeEventListener("wheel", onWheel);

      node.removeEventListener("scroll", syncScene);

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeScene, syncScene]);

  return (
    <div className="portfolio-shell">
      <HomeHeader activeScene={activeScene} onNavigate={scrollToScene} />

      <div ref={viewportRef} className="scene-viewport">
        {children}
      </div>

      <SceneProgress activeScene={activeScene} totalScenes={scenes.length} />
    </div>
  );
}
