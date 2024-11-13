"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MapView() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Air Quality Map</h2>
      </div>

      <Card className="p-4">
        <div className="aspect-[16/9] w-full rounded-lg">
          <Skeleton className="h-full w-full" />
          {/* Map will be integrated here using your preferred provider */}
        </div>
      </Card>
    </div>
  );
}