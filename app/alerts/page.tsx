"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Alerts() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Alert Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="email" />
              <Label htmlFor="email">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="push" />
              <Label htmlFor="push">Push Notifications</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                <div className="ml-4 space-y-1 flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium leading-none">
                      High PM2.5 Level Alert
                    </p>
                    <Badge>Critical</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 text-blue-500 mr-2" />
                <div className="ml-4 space-y-1 flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium leading-none">
                      Weather Condition Update
                    </p>
                    <Badge variant="secondary">Info</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    5 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}