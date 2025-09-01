"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Link from "next/link";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "NOSOTROS", href: "/nosotros" },
    { name: "TRATAMIENTOS", href: "/tratamientos" },
    { name: "PORQUÉ ELEGIRNOS?", href: "/por-que-elegirnos" },
    { name: "ACTUALIDAD", href: "/actualidad" },
    { name: "CONTACTO", href: "/contacto" }
  ];

  return (
    <div className="min-h-screen bg-main-bg font-main font-weight-main">
      {/* Header */}
      <header className="bg-main-bg shadow-sm">
        <nav className="relative">
          {/* Desktop Header Content */}
          <div className="hidden md:block relative h-[162px] flex items-center">
            {/* Logo */}
            <div className="absolute left-[245px] flex items-center h-full">
              <Link href="/inicio" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-[136px] h-[44px]"
                />
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="absolute right-[245px] flex items-center h-full space-x-16">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-sans transition-colors hover:text-gray-700"
                  style={{
                    fontSize: "15px",
                    fontWeight: item.name === "CONTACTO" ? "900" : "400",
                    letterSpacing: "3px"
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/inicio" className="flex items-center">
                  <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black p-1"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg
                    className="text-black"
                    style={{ width: "29px", height: "22px" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line
                      x1={mobileMenuOpen ? "18" : "3"}
                      y1={mobileMenuOpen ? "6" : "6"}
                      x2={mobileMenuOpen ? "6" : "21"}
                      y2={mobileMenuOpen ? "18" : "6"}
                    />
                    <line
                      x1={mobileMenuOpen ? "6" : "3"}
                      y1={mobileMenuOpen ? "6" : "12"}
                      x2={mobileMenuOpen ? "18" : "21"}
                      y2={mobileMenuOpen ? "18" : "12"}
                    />
                    <line
                      x1="3"
                      y1="18"
                      x2="21"
                      y2="18"
                      className={mobileMenuOpen ? "opacity-0" : "opacity-100"}
                    />
                  </svg>
                  <span className="sr-only">
                    {mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                  </span>
                </Button>

                {/* Dropdown Menu */}
                {mobileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#F7EEEB] shadow-lg border border-gray-200 z-50">
                    <div className="py-4">
                      <Link
                        href="/nosotros"
                        className="block px-4 py-3 text-gray-900 hover:text-gray-700 hover:bg-dropdown-opened transition-colors"
                        style={{ letterSpacing: "3px" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        NOSOTROS
                      </Link>
                      <div className="flex justify-center mb-3">
                        <div className="w-[226px] h-[1px] bg-gray-950"></div>
                      </div>
                      <Link
                        href="/tratamientos"
                        className="block px-4 py-3 text-gray-900 hover:text-gray-700 hover:bg-dropdown-opened transition-colors"
                        style={{ letterSpacing: "3px" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        TRATAMIENTOS
                      </Link>
                      <div className="flex justify-center mb-3">
                        <div className="w-[226px] h-[1px] bg-gray-950"></div>
                      </div>
                      <Link
                        href="/por-que-elegirnos"
                        className="block px-4 py-3 text-gray-900 hover:text-gray-700 hover:bg-dropdown-opened transition-colors"
                        style={{ letterSpacing: "3px" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        PORQUÉ ELEGIRNOS?
                      </Link>
                      <div className="flex justify-center mb-3">
                        <div className="w-[226px] h-[1px] bg-gray-950"></div>
                      </div>
                      <Link
                        href="/actualidad"
                        className="block px-4 py-3 text-gray-900 hover:text-gray-700 hover:bg-dropdown-opened transition-colors"
                        style={{ letterSpacing: "3px" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ACTUALIDAD
                      </Link>
                      <div className="flex justify-center mb-3">
                        <div className="w-[226px] h-[1px] bg-gray-950"></div>
                      </div>
                      <Link
                        href="/contacto"
                        className="block px-4 py-3 text-gray-900 font-extrabold hover:text-gray-700 hover:bg-dropdown-opened transition-colors"
                        style={{ letterSpacing: "3px" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        CONTACTO
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-footer-bg border-t border-gray-700">
        {/* Mobile Footer */}
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-[43px] pb-8">
            <div className="flex flex-col items-center">
              {/* Logo */}
              <img src="/logo-blanco.png" alt="Logo" className="h-6 w-auto" />

              {/* Navigation items */}
              <div className="flex flex-col items-center mt-[28px]">
                <Link
                  href="/nosotros"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                  style={{ letterSpacing: "3px" }}
                >
                  NOSOTROS
                </Link>
                <Link
                  href="/tratamientos"
                  className="text-sm text-gray-300 hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  TRATAMIENTOS
                </Link>
                <Link
                  href="/por-que-elegirnos"
                  className="text-sm text-gray-300 hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  PORQUE ELEGIRNOS?
                </Link>
                <Link
                  href="/actualidad"
                  className="text-sm text-gray-300 hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  ACTUALIDAD
                </Link>
                <Link
                  href="/contacto"
                  className="text-sm text-gray-300 font-extrabold hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  CONTACTO
                </Link>
              </div>

              {/* Button */}
              <Link
                href="/contacto"
                className="bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors mt-[28px]"
              >
                ¡Solicitá tu consulta!
              </Link>

              {/* Social Media Icons */}
              <div className="flex space-x-6 mt-[28px]">
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="relative h-[492px] pt-[101px]">
            {/* Logo Column */}
            <div className="absolute left-[437px] top-[101px]">
              <img
                src="/logo-blanco.png"
                alt="Logo"
                className="w-[121px] h-[40px]"
              />
            </div>

            {/* Navigation Column */}
            <div className="absolute left-[801px] top-[101px] flex flex-col items-start space-y-[18px]">
              <Link
                href="/nosotros"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                NOSOTROS
              </Link>
              <Link
                href="/tratamientos"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                TRATAMIENTOS
              </Link>
              <Link
                href="/por-que-elegirnos"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                PORQUE ELEGIRNOS?
              </Link>
              <Link
                href="/actualidad"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                ACTUALIDAD
              </Link>
              <Link
                href="/contacto"
                className="text-sm text-gray-300 font-extrabold hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                CONTACTO
              </Link>
            </div>

            {/* Social Links Column */}
            <div className="absolute right-[437px] top-[101px] flex flex-col items-end">
              {/* Button */}
              <Link
                href="/contacto"
                className="bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mb-6"
                style={{ width: "201px", height: "54px" }}
              >
                <span>¡Solicitá tu consulta!</span>
                <Send className="w-4 h-4" />
              </Link>

              {/* Social Icons */}
              <div className="flex justify-between" style={{ width: "200px" }}>
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
