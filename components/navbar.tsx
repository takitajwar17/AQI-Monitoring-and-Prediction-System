"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Wind, Map, LineChart, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Wind },
  { name: "Map View", href: "/map", icon: Map },
  { name: "Predictions", href: "/predictions", icon: LineChart },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Wind className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">AirWatch Pro</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}