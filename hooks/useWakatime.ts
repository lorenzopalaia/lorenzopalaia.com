import { useState, useEffect } from "react";

export default function useWakatime() {
  const [wakatime, setWakatime] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/wakatime");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setWakatime(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { wakatime, isLoading };
}
