import type { AirQualityData, WeatherData } from "./types";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getAirQuality(
  lat: number,
  lon: number
): Promise<AirQualityData> {
  try {
    const response = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const components = data.list[0].components;

    return {
      aqi: data.list[0].main.aqi,
      pm25: components.pm2_5,
      pm10: components.pm10,
      no2: components.no2,
      so2: components.so2,
      co: components.co,
      o3: components.o3,
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    throw error;
  }
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDirection: getWindDirection(data.wind.deg),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

function getWindDirection(degree: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
}
