import { NextResponse, NextRequest } from "next/server";

const fetchWakatime = async () => {
  const response = await fetch(
    "https://wakatime.com/api/v1/users/@lorenzopalaia/stats/last_7_days"
  );

  return response.json();
};

export async function GET(req: NextRequest) {
  try {
    const data = await fetchWakatime();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore durante il recupero dei dati:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero dei dati" },
      { status: 500 }
    );
  }
}
