"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Inicio", href: "/inicio" },
    { name: "Tratamientos", href: "/tratamientos" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <div className="min-h-screen bg-main-bg font-main font-weight-main">
      {/* Header */}
      <header className="bg-main-bg shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/inicio" className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-black p-1"
                  >
                    <Menu
                      className="text-black"
                      style={{ width: "29px", height: "22px" }}
                    />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-80 bg-dropdown-bg"
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-900 hover:text-gray-700 block px-3 py-2 text-base font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-footer-bg border-t border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Company info */}
              <div className="space-y-4">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto mb-2" />
                <p className="text-sm text-gray-300">
                  Descripción de la empresa o servicios.
                </p>
              </div>

              {/* Navigation links */}
              <div className="space-y-4">
                <h3 className="text-lg font-hero font-semibold text-white">
                  Enlaces
                </h3>
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                <h3 className="text-lg font-hero font-semibold text-white">
                  Contacto
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Email: info@empresa.com</p>
                  <p>Teléfono: +1 234 567 890</p>
                  <p>Dirección: Calle Example 123</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-center text-sm text-gray-300">
                © 2024 Logo. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
