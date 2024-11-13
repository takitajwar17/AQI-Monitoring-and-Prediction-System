"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { getAirQuality } from '@/lib/api/openweather';
import type { AirQualityData } from '@/lib/api/types';

interface Props {
  latitude: number;
  longitude: number;
}

export function AirQualityCard({ latitude, longitude }: Props) {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const aqData = await getAirQuality(latitude, longitude);
        setData(aqData);
      } catch (error) {
        console.error('Failed to fetch air quality:', error);
      } finally {
        setLoading(false);
      }
    }

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  function getAQILevel(aqi: number): string {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Air Quality Index
        </CardTitle>
        <Gauge className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded mt-2" />
          </div>
        ) : data ? (
          <>
            <div className="text-2xl font-bold">{data.aqi}</div>
            <p className="text-xs text-muted-foreground">
              {getAQILevel(data.aqi)}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Failed to load data</p>
        )}
      </CardContent>
    </Card>
  );
}