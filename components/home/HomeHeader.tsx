"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

import {
  sceneNavigation,
  getSceneIndex,
  type SceneId,
} from "@/data/sceneNavigation";

interface HomeHeaderProps {
  activeScene: SceneId;
  onNavigate: (id: string) => void;
}

export default function HomeHeader({
  activeScene,
  onNavigate,
}: HomeHeaderProps) {
  return (
    <header className="site-header">
      <Link
        href="/"
        className="brand"
        aria-label="Lorenzo Palaia, home"
        data-cursor="HOME"
      >
        <span>
          Lorenzo
          <br />
          Palaia
        </span>

        <i aria-hidden="true" />
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        {sceneNavigation.map((scene) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => onNavigate(scene.id)}
            className={activeScene === scene.id ? "is-active" : ""}
            data-cursor="GO"
          >
            <span>{getSceneIndex(scene.id)}</span>
            {scene.label}
          </button>
        ))}
      </nav>

      <Link
        href="mailto:info@lorenzopalaia.com"
        className="header-contact"
        data-cursor="EMAIL"
        aria-label="Get in touch"
      >
        <Mail size={16} />
        <span>Get in touch</span>
      </Link>
    </header>
  );
}
