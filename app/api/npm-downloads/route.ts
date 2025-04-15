import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const packageName = searchParams.get("package");

    if (!packageName) {
      return NextResponse.json(
        { error: "The 'package' parameter is required" },
        { status: 400 },
      );
    }

    const apiUrl = `https://api.npmjs.org/downloads/point/last-year/${packageName}`;
    const npmResponse = await fetch(apiUrl);

    if (!npmResponse.ok) {
      if (npmResponse.status === 404) {
        return NextResponse.json(
          { downloads: 0, package: packageName },
          {
            status: 200,
            headers: {
              "Cache-Control": "s-maxage=3600, stale-while-revalidate",
            },
          },
        );
      }

      const errorData = await npmResponse.text();
      console.error(
        `Error from npmjs API for ${packageName}: ${npmResponse.status} ${npmResponse.statusText}`,
        errorData,
      );
      return NextResponse.json(
        {
          error: `Error from npmjs API: ${npmResponse.statusText}`,
          details: errorData,
        },
        { status: npmResponse.status },
      );
    }

    const data = await npmResponse.json();

    return NextResponse.json(
      { downloads: data.downloads, package: data.package },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Internal error in API /api/npm-downloads:", error);
    return NextResponse.json(
      { error: "Internal server error fetching npm downloads" },
      { status: 500 },
    );
  }
}
