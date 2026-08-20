"use client";

import { Download } from "lucide-react";

import { config } from "@/config";
import { useNpmDownloads } from "@/hooks/api/useNpmDownloads";

export function getNpmPackage(repositoryName: string) {
  return (
    config.npmProjects[repositoryName as keyof typeof config.npmProjects] ??
    null
  );
}

interface ProjectNpmTelemetryProps {
  repositoryName: string;
}

export default function ProjectNpmTelemetry({
  repositoryName,
}: ProjectNpmTelemetryProps) {
  const packageName = getNpmPackage(repositoryName);

  const npmDownloads = useNpmDownloads(packageName);

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
