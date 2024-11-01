import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://wakatime.com/api/v1/users/@lorenzopalaia/stats/last_7_days"
    );
    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Error retrieving data" },
      { status: 500 }
    );
  }
}
