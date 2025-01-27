"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Globe, Github } from "lucide-react";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

export default function CardButton({
  link,
}: {
  link: { title: string; href: string };
}) {
  const { unlockAchievement } = useAchievementsContext();

  return (
    <Link
      href={link.href}
      target="_blank"
      onClick={() => {
        if (link.title === "Thesis Paper") {
          unlockAchievement("thesis-paper");
        }
      }}
    >
      <Button size="sm" className="cursor-pointer px-2.5 py-0.5 font-bold">
        {link.href.includes("github") ? <Github /> : <Globe />}
        {link.title}
      </Button>
    </Link>
  );
}
