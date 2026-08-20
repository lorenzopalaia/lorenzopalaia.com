import { NextResponse } from "next/server";

import { getPortfolioProjects } from "@/lib/github/projects";

export async function GET() {
  try {
    const projects = await getPortfolioProjects();

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error retrieving GitHub projects:", error);

    return NextResponse.json(
      {
        error: "Error retrieving GitHub projects",
      },
      {
        status: 500,
      },
    );
  }
}
