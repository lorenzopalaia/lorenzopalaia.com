// ! Avoid using HTML tags inside config.tsx since it will be rendered as JSON
// ! Move HTML tags into the components and use config.tsx only for textual content

import { NextResponse } from "next/server";

import { config, email } from "@/config";

const about = {
  name: config.about.name,
  title: config.about.title,
  description: config.about.description,
  location: config.about.location,
  email,
  socials: config.socials,
  work: config.work,
  education: config.education,
  extra: config.extra,
  skills: config.skills,
};

export async function GET() {
  return NextResponse.json(about, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
