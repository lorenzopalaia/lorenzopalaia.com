import Link from "next/link";
import { Globe, Github, Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageFallback } from "@/components/ImageFallback";

interface ProjectCardProps {
  project: {
    img: string;
    name: string;
    description: string;
    languages: string[];
    html_url?: string;
    stargazers_count?: number;
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
      <CardContent className="flex-grow">
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
  return (
    <Card className="flex h-full w-full flex-col border-2">
      <CardHeader>
        <ImageFallback
          src={project.img}
          alt={project.name}
          width={1600}
          height={900}
          className="h-auto w-full rounded-lg"
        />
        <CardTitle className="title pt-2">
          {project.name.replaceAll("-", " ")}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.languages.map((language) => (
            <Badge key={language} variant="secondary">
              {language}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between gap-4">
        {project.html_url && (
          <Link href={project.html_url}>
            <Button size="sm" className="px-2.5 py-0.5 font-bold">
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
        {project.stargazers_count !== undefined && (
          <CardDescription className="title flex items-center gap-2">
            <Star size={16} />
            {project.stargazers_count}
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  );
}
