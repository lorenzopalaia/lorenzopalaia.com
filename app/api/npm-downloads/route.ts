import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const packageName = searchParams.get("package");

    if (!packageName) {
      return NextResponse.json(
        { error: "Il parametro 'package' è obbligatorio" },
        { status: 400 },
      );
    }

    // L'API richiede il nome del pacchetto nell'URL
    // Usiamo l'endpoint per l'ultimo anno come richiesto
    const apiUrl = `https://api.npmjs.org/downloads/point/last-year/${packageName}`;
    const npmResponse = await fetch(apiUrl);

    // Controlla se la risposta da npmjs è ok
    if (!npmResponse.ok) {
      // Se npmjs restituisce 404 (Not Found), significa che il pacchetto non esiste
      // o non ha dati di download per il periodo. Restituiamo 0 downloads.
      if (npmResponse.status === 404) {
        return NextResponse.json(
          { downloads: 0, package: packageName },
          {
            status: 200, // Rispondiamo con 200 OK al nostro client
            headers: {
              "Cache-Control": "s-maxage=3600, stale-while-revalidate", // Cache anche per i non trovati
            },
          },
        );
      }
      // Per altri errori, inoltriamo lo status code e il messaggio
      const errorData = await npmResponse.text(); // Leggi il corpo dell'errore se presente
      console.error(
        `Errore da npmjs API per ${packageName}: ${npmResponse.status} ${npmResponse.statusText}`,
        errorData,
      );
      return NextResponse.json(
        {
          error: `Errore da npmjs API: ${npmResponse.statusText}`,
          details: errorData,
        },
        { status: npmResponse.status },
      );
    }

    // Se la risposta è ok, estrai i dati JSON
    const data = await npmResponse.json();

    // Restituiamo i download e il nome del pacchetto
    return NextResponse.json(
      { downloads: data.downloads, package: data.package },
      {
        headers: {
          // Applica caching per ridurre le chiamate API
          "Cache-Control": "s-maxage=3600, stale-while-revalidate", // Cache per 1 ora
        },
      },
    );
  } catch (error) {
    console.error("Errore interno nell'API /api/npm-downloads:", error);
    return NextResponse.json(
      { error: "Errore interno del server nel recupero dei download npm" },
      { status: 500 },
    );
  }
}
