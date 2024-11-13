"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getPredictions } from "@/lib/api/tomorrow";
import { useEffect, useState } from "react";
import type { PredictionData } from "@/lib/api/types";

interface Props {
  latitude: number;
  longitude: number;
}

export function AQITrendChart({ latitude, longitude }: Props) {
  const [data, setData] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const predictions = await getPredictions(latitude, longitude);
        setData(predictions);
      } catch (error) {
        console.error("Failed to fetch predictions:", error);
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
          <CardTitle>AQI Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AQI Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleString()}
                formatter={(value: number) => [`AQI: ${value}`, "Air Quality"]}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}