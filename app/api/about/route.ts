import { NextResponse } from "next/server";

import { siteConfig } from "@/data/config";
import { person } from "@/data/person";
import { contact } from "@/data/contact";
import { socials } from "@/data/socials";
import { workExperience } from "@/data/experience";
import { education } from "@/data/education";
import { activities } from "@/data/activities";
import { skills } from "@/data/skills";
import { artifacts } from "@/data/artifacts";
import { labItems } from "@/data/lab";

import { getPortfolioProjects } from "@/lib/github/projects";

export async function GET() {
  const projects = await getPortfolioProjects();

  const about = {
    person,
    contact: {
      email: siteConfig.email,
      booking: {
        label: contact.bookingLabel,
        url: contact.bookingUrl,
      },
    },
    socials,
    experience: workExperience,
    education,
    activities,
    skills,
    artifacts,
    projects,
    lab: labItems,
  };

  return NextResponse.json(about, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
