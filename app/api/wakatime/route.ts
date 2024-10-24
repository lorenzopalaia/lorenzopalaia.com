import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(
      "https://wakatime.com/api/v1/users/@lorenzopalaia/stats/last_7_days"
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Error retrieving data" },
      { status: 500 }
    );
  }
}
