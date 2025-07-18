"use client";

import Link from "next/link";

import { Globe, Github, Star, Download, GitFork } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import LanguagesList from "@/components/LanguagesList";
import { ImageFallback } from "@/components/ImageFallback";

import { useNpmDownloads } from "@/hooks/useNpmDownloads";

interface ProjectCardProps {
  project: {
    img: string;
    name: string;
    description: string;
    languages: string[];
    html_url?: string;
    homepage?: string;
    stargazers_count?: number;
    forks_count?: number;
    npm_package_name?: string | null;
  };
}
export function CardSkeleton() {
  return (
    <Card className="flex h-full w-full flex-col border-2">
      <CardHeader>
        <Skeleton className="h-40 w-full rounded-lg" />
        <CardTitle className="title pt-2">
          <Skeleton className="h-4 w-full" />
        </CardTitle>
        <div className="pt-2">
          <Skeleton className="h-24 w-full" />
        </div>
      </CardHeader>
      <CardContent className="grow">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { downloads } = useNpmDownloads({
    packageName: project.npm_package_name || null,
  });

  return (
    <Card className="flex h-full w-full flex-col border-2">
      <CardHeader>
        <ImageFallback
          src={project.img}
          alt={project.name}
          width={292}
          height={164.25}
          sizes="(max-width: 640px) 523px, 294.19px"
          className="h-auto w-full rounded-lg"
        />
        <CardTitle className="title pt-2">
          {project.name.replaceAll("-", " ")}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        {/* //* Useful when adding new languages
        {project.languages.map((language) => (
          <>{language}</>
        ))} */}
        <LanguagesList languages={project.languages} />
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {project.html_url && (
            <Link href={project.html_url} target="_blank">
              <Button
                size="sm"
                className="cursor-pointer px-2.5 py-0.5 font-bold"
              >
                {project.html_url.includes("github") ? (
                  <>
                    <Github />
                    GitHub
                  </>
                ) : (
                  <>
                    <Globe />
                    Website
                  </>
                )}
              </Button>
            </Link>
          )}
          {project.homepage && (
            <Link href={project.homepage} target="_blank">
              <Button
                size="sm"
                className="cursor-pointer px-2.5 py-0.5 font-bold"
              >
                <Globe />
                Website
              </Button>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.stargazers_count !== undefined && (
            <CardDescription className="title flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              {project.stargazers_count}
            </CardDescription>
          )}
          {project.forks_count !== undefined && (
            <CardDescription className="title flex items-center gap-1">
              <GitFork size={16} className="text-green-500" />
              {project.forks_count}
            </CardDescription>
          )}
          {downloads && (
            <CardDescription className="title flex items-center gap-1">
              <Download size={16} className="text-sky-500" /> {downloads}
            </CardDescription>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
