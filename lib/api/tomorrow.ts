import type { PredictionData } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TOMORROW_API_KEY;
const BASE_URL = "https://api.tomorrow.io/v4";

export async function getPredictions(
  lat: number,
  lon: number
): Promise<PredictionData[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/timelines?location=${lat},${lon}&fields=airQualityIndex&timesteps=1h&units=metric&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.data.timelines[0].intervals.map((interval: any) => ({
      timestamp: interval.startTime,
      aqi: interval.values.airQualityIndex,
      confidence: 0.85,
    }));
  } catch (error) {
    console.error("Error fetching prediction data:", error);
    throw error;
  }
}
