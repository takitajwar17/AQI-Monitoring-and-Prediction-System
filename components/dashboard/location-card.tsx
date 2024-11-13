"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  latitude: number;
  longitude: number;
}

export function LocationCard({ latitude, longitude }: Props) {
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLocationName() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        setLocation(`${data[0].name}, ${data[0].country}`);
      } catch (error) {
        console.error("Failed to fetch location:", error);
        setLocation("Location not found");
      } finally {
        setLoading(false);
      }
    }

    if (latitude && longitude) {
      getLocationName();
    }
  }, [latitude, longitude]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Location</CardTitle>
        <MapPin className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-16 bg-muted rounded" />
          </div>
        ) : (
          <div className="text-2xl font-bold">{location}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
        </p>
      </CardContent>
    </Card>
  );
}