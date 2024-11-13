"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer } from "lucide-react";
import { getWeather } from '@/lib/api/openweather';
import type { WeatherData } from '@/lib/api/types';

interface Props {
  latitude: number;
  longitude: number;
  type: 'temperature' | 'humidity';
}

export function WeatherCard({ latitude, longitude, type }: Props) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const weatherData = await getWeather(latitude, longitude);
        setData(weatherData);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false);
      }
    }

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  const icon = type === 'temperature' ? Thermometer : Droplets;
  const Icon = icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {type === 'temperature' ? 'Temperature' : 'Humidity'}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded mt-2" />
          </div>
        ) : data ? (
          <>
            <div className="text-2xl font-bold">
              {type === 'temperature' 
                ? `${Math.round(data.temperature)}°C`
                : `${data.humidity}%`
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {type === 'temperature' 
                ? data.temperature > 25 ? 'Above Average' : 'Normal Range'
                : data.humidity > 60 ? 'Humid' : 'Normal Range'
              }
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Failed to load data</p>
        )}
      </CardContent>
    </Card>
  );
}