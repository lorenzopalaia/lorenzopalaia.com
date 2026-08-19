"use client";

import { Download } from "lucide-react";
import Link from "next/link";

import { unlockSignal } from "@/components/ExplorationSignals";

interface Artifact {
  code: string;
  title: string;
  detail: string;
  href: string;
}

interface ArtifactLinkProps {
  artifact: Artifact;
}

export default function ArtifactLink({ artifact }: ArtifactLinkProps) {
  const handleClick = () => {
    unlockSignal(artifact.code === "A-01" ? "resume" : "thesis-paper");
  };

  return (
    <Link
      href={artifact.href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      data-cursor="OPEN"
    >
      <span>{artifact.code}</span>

      <strong>{artifact.title}</strong>

      <em>{artifact.detail}</em>

      <Download size={16} />
    </Link>
  );
}
