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

export default function FeaturedProjects() {
  const data = [
    {
      title: "DBS Bank",
      description:
        "Developed a web application for a bank account servicing process using Spring Boot and React",
      tags: ["Docker", "Kubernetes"],
      href: "https://www.dbs.com.sg",
      link: "Website",
      img: "/db.png",
    },
    {
      title: "OpenAI GPT-3",
      description:
        "Implemented a chatbot using OpenAI's GPT-3 API to provide customer support",
      tags: ["AI", "Chatbot"],
      href: "https://www.github.com",
      link: "Github",
      img: "/openai.png",
    },
    {
      title: "Weather App",
      description:
        "Created a weather forecasting app using React Native and OpenWeatherMap API",
      tags: ["React Native", "API"],
      href: "https://www.weatherapp.com",
      link: "Website",
      img: "/weather.png",
    },
    {
      title: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce platform using Node.js, Express, and MongoDB",
      tags: ["Node.js", "MongoDB"],
      href: "https://www.ecommerce.com",
      link: "Website",
      img: "/ecommerce.png",
    },
  ];

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Featured Projects</p>
        <Link
          href="/projects"
          className="flex gap-2 items-center text-muted-foreground hover:text-primary"
        >
          View More <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {data.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src={project.img}
                alt={project.title}
                width={100}
                height={100}
              />
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={project.href}>
                <Button size="sm" className="font-bold py-0.5 px-2.5">
                  {project.link === "Github" ? <Github /> : <Globe />}
                  {project.link}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
