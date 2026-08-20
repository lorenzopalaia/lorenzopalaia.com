"use client";

import { Download } from "lucide-react";

import type { PortfolioProject } from "@/data/projects";

import { useNpmDownloads } from "@/hooks/api/useNpmDownloads";

interface ProjectNpmTelemetryProps {
  project: PortfolioProject;
}

export default function ProjectNpmTelemetry({
  project,
}: ProjectNpmTelemetryProps) {
  const packageName = project.npmPackage;

  const npmDownloads = useNpmDownloads(packageName ?? null);

  if (!packageName) {
    return null;
  }

  if (npmDownloads.isLoading) {
    return (
      <span>
        <Download size={13} />…
      </span>
    );
  }

  if (npmDownloads.isError || !npmDownloads.data) {
    return null;
  }

  return (
    <span title={`${packageName} — last 12 months`}>
      <Download size={13} />

      {new Intl.NumberFormat("en").format(npmDownloads.data.downloads)}
    </span>
  );
}
