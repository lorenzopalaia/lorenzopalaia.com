"use client";

import Link from "next/link";

import Image from "next/image";

import { ArrowRight, Globe, Github } from "lucide-react";

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

import useGithubRepos from "@/hooks/useGithubRepos";

import { config } from "@/config";

export default function FeaturedProjects() {
  const { repos, isLoading } = useGithubRepos();

  const featuredProjects = repos.filter((repo) => {
    return config.featuredProjects.includes(repo.name);
  });

  return (
    <section className="my-16">
      <div className="flex justify-between items-center">
        <p className="text-2xl sm:text-3xl title">Featured Projects</p>
        <Link
          href="/projects"
          className="flex gap-2 items-center text-muted-foreground hover:text-primary"
        >
          View More <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {isLoading ? (
          <>
            {Array.from({ length: config.featuredProjects.length }, (_, i) => (
              <Card className="w-full h-full border-2" key={i}>
                <CardHeader>
                  <Skeleton className="w-full h-40 rounded-lg" />
                  <CardTitle className="pt-2 title">
                    <Skeleton className="h-4 w-full" />
                  </CardTitle>
                  <div className="pt-2">
                    <Skeleton className="h-24 w-full" />
                  </div>
                </CardHeader>
                <CardContent>
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
            ))}
          </>
        ) : (
          <>
            {featuredProjects.map((project) => (
              <Card className="w-full h-full border-2" key={project.id}>
                <CardHeader>
                  {/* Add fallback image */}
                  <Image
                    src={project.img}
                    alt={project.name}
                    width={1600}
                    height={900}
                    className="w-full h-auto rounded-lg"
                  />
                  <CardTitle className="pt-2 title">
                    {project.name.replaceAll("-", " ")}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={project.html_url}>
                    <Button size="sm" className="font-bold py-0.5 px-2.5">
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
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
