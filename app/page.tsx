"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { AirQualityCard } from "@/components/dashboard/air-quality-card";
import { WeatherCard } from "@/components/dashboard/weather-card";
import { LocationCard } from "@/components/dashboard/location-card";
import { AQITrendChart } from "@/components/dashboard/aqi-trend-chart";
import { PollutantBreakdown } from "@/components/dashboard/pollutant-breakdown";

export default function Dashboard() {
  const { latitude, longitude, loading, error } = useGeolocation();

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <div className="p-6">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="mt-4 h-8 w-16 bg-muted rounded" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !latitude || !longitude) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Card className="p-6">
          <div className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <p>Failed to get location. Please enable location services and refresh.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Air Quality Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <LocationCard latitude={latitude} longitude={longitude} />
            <AirQualityCard latitude={latitude} longitude={longitude} />
            <WeatherCard 
              type="temperature"
              latitude={latitude}
              longitude={longitude}
            />
            <WeatherCard 
              type="humidity"
              latitude={latitude}
              longitude={longitude}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <AQITrendChart latitude={latitude} longitude={longitude} />
            <PollutantBreakdown latitude={latitude} longitude={longitude} />
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Air Quality Report</h3>
            <p className="text-muted-foreground">
              Download comprehensive reports about air quality trends, pollutant levels,
              and health recommendations for your area.
            </p>
            {/* Report generation functionality will be added here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}