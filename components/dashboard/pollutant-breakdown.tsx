"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAirQuality } from "@/lib/api/openweather";
import { useEffect, useState } from "react";
import type { AirQualityData } from "@/lib/api/types";

interface Props {
  latitude: number;
  longitude: number;
}

export function PollutantBreakdown({ latitude, longitude }: Props) {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const aqData = await getAirQuality(latitude, longitude);
        setData(aqData);
      } catch (error) {
        console.error("Failed to fetch air quality:", error);
      } finally {
        setLoading(false);
      }
    }

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pollutant Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] animate-pulse bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  const pollutants = [
    { name: "PM2.5", value: data?.pm25, unit: "μg/m³", threshold: 10 },
    { name: "PM10", value: data?.pm10, unit: "μg/m³", threshold: 20 },
    { name: "NO₂", value: data?.no2, unit: "μg/m³", threshold: 40 },
    { name: "SO₂", value: data?.so2, unit: "μg/m³", threshold: 20 },
    { name: "O₃", value: data?.o3, unit: "μg/m³", threshold: 100 },
    { name: "CO", value: data?.co, unit: "mg/m³", threshold: 4 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pollutant Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pollutant</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pollutants.map((pollutant) => (
              <TableRow key={pollutant.name}>
                <TableCell>{pollutant.name}</TableCell>
                <TableCell>
                  {pollutant.value?.toFixed(2)} {pollutant.unit}
                </TableCell>
                <TableCell>
                  {pollutant.value && pollutant.value > pollutant.threshold ? (
                    <span className="text-destructive">Above Limit</span>
                  ) : (
                    <span className="text-green-600 dark:text-green-400">
                      Within Limit
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}