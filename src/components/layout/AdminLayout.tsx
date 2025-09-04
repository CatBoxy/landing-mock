"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminSidebar = ({ className = "" }: { className?: string }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navigationItems = [
    {
      name: "Notas",
      href: "/admin/notes",
      icon: Home
    }
  ];

  return (
    <div className={`flex h-full flex-col bg-gray-900 ${className}`}>
      {/* Logo/Brand */}
      <div className="flex h-16 shrink-0 items-center px-4">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="flex-shrink-0 p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40 lg:hidden bg-white"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <AdminSidebar className="w-full" />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-72">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center lg:hidden">
              {/* Mobile menu button space - handled by Sheet trigger above */}
            </div>

            {/* User info */}
            <div className="ml-auto flex items-center space-x-4">
              {user && (
                <div className="hidden sm:flex sm:items-center sm:space-x-2">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.username}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
