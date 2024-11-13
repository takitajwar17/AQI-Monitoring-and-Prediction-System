"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Wind } from "lucide-react";

export default function Predictions() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AQI Predictions</h2>
      </div>

      <Tabs defaultValue="24h" className="space-y-4">
        <TabsList>
          <TabsTrigger value="24h">24 Hours</TabsTrigger>
          <TabsTrigger value="7d">7 Days</TabsTrigger>
          <TabsTrigger value="30d">30 Days</TabsTrigger>
        </TabsList>
        <TabsContent value="24h" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Predicted AQI Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Prediction chart will be added here */}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contributing Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Wind Speed and Direction
                      </p>
                      <p className="text-sm text-muted-foreground">
                        12 km/h NE
                      </p>
                    </div>
                  </div>
                  {/* More factors will be added here */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}