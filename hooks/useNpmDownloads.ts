import { useState, useEffect } from "react";

interface UseNpmDownloadsProps {
  packageName: string | null; // Può essere null se non c'è un pacchetto associato
}

interface UseNpmDownloadsResult {
  downloads: number | null;
  isLoading: boolean;
  error: Error | null;
}

export function useNpmDownloads({
  packageName,
}: UseNpmDownloadsProps): UseNpmDownloadsResult {
  const [downloads, setDownloads] = useState<number | null>(null);
  // Inizia a caricare solo se c'è un nome pacchetto valido
  const [isLoading, setIsLoading] = useState<boolean>(!!packageName);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Se non c'è un nome pacchetto, non eseguiamo la fetch
    if (!packageName) {
      setIsLoading(false);
      setDownloads(null); // Assicurati che i download siano null
      return;
    }

    const fetchDownloads = async () => {
      setIsLoading(true); // Imposta isLoading a true all'inizio della fetch
      try {
        const response = await fetch(
          `/api/npm-downloads?package=${encodeURIComponent(packageName)}`,
        );

        if (!response.ok) {
          // npmjs restituisce 404 se il pacchetto non esiste o non ha download recenti
          if (response.status === 404) {
            setDownloads(0); // Consideriamo 0 download se non trovato
            setError(null);
          } else {
            throw new Error(
              `Errore HTTP: ${response.status} ${response.statusText}`,
            );
          }
        } else {
          const data = await response.json();
          setDownloads(data.downloads);
          setError(null);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Errore sconosciuto durante il fetch dei download"),
        );
        console.error(
          `Errore nel caricamento dei download per ${packageName}:`,
          err,
        );
        setDownloads(null); // Imposta downloads a null in caso di errore
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloads();
  }, [packageName]); // Dipendenza solo da packageName

  return { downloads, isLoading, error };
}
