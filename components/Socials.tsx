"use client";

import { config } from "@/config";

import Link from "next/link";
import { Linkedin, Github, Mail, Video } from "lucide-react";
import { PiXLogoBold } from "react-icons/pi";

import { useAchievementsContext } from "@/contexts/AchievementsContext";

const iconMap: {
  [key: string]: {
    IconComponent: React.ElementType;
    className: string;
  };
} = {
  LinkedIn: {
    IconComponent: Linkedin,
    className: "text-muted-foreground hover:text-primary",
  },
  GitHub: {
    IconComponent: Github,
    className: "text-muted-foreground hover:text-primary",
  },
  X: {
    IconComponent: PiXLogoBold,
    className: "text-muted-foreground hover:text-primary size-[26px]",
  },
  Email: {
    IconComponent: Mail,
    className: "text-muted-foreground hover:text-primary",
  },
  "Book a Meeting": {
    IconComponent: Video,
    className: "text-muted-foreground hover:text-primary",
  },
};

export default function Socials() {
  const { unlockAchievement } = useAchievementsContext();

  return (
    <div className="flex gap-3 sm:gap-4">
      {config.socials.map((social, index) => {
        const IconDetails = iconMap[social.name];
        if (!IconDetails) return null;

        const { IconComponent, className } = IconDetails;

        return (
          <Link
            key={index}
            href={social.href}
            target="_blank"
            onClick={() => unlockAchievement("socials")}
            aria-label={social.name}
          >
            <IconComponent className={className} />
          </Link>
        );
      })}
    </div>
  );
}
