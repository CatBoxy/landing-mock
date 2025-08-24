"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Calendar, Home, Stethoscope } from "lucide-react";

const navigation = [
  {
    name: "Panel Principal",
    href: "/admin",
    icon: Home
  },
  {
    name: "Médicos",
    href: "/admin/doctors",
    icon: Stethoscope
  },
  {
    name: "Citas",
    href: "/admin/appointments",
    icon: Calendar
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-blue-600" />
            <h2 className="ml-3 text-lg font-semibold tracking-tight">
              Admin Dashboard
            </h2>
          </div>
          <Separator className="my-4" />
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
