import React from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const navigation = [
    { name: "NOSOTROS", href: "/inicio#doctor-section" },
    { name: "TRATAMIENTOS", href: "/tratamientos" },
    { name: "PORQUÉ ELEGIRNOS?", href: "/inicio#por-que-elegirnos-section" },
    { name: "ACTUALIDAD", href: "/inicio#actualidad-section" },
    { name: "CONTACTO", href: "/inicio#contacto-section" }
  ];

  return (
    <div className="min-h-screen bg-main-bg font-main font-weight-main">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-main-bg shadow-sm z-50">
        <nav className="relative">
          {/* Desktop Header Content */}
          <div className="hidden md:block relative h-[162px] flex items-center">
            {/* Logo */}
            <div className="absolute md:left-8 lg:left-16 xl:left-32 2xl:left-[245px] flex items-center h-full">
              <Link href="/inicio" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={136}
                  height={44}
                  priority
                  className="w-[136px] h-[44px]"
                />
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="absolute md:right-8 lg:right-16 xl:right-32 2xl:right-[245px] flex items-center h-full md:space-x-3 lg:space-x-6 xl:space-x-10 2xl:space-x-16">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-sans transition-colors hover:text-gray-700 whitespace-nowrap"
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
                  <Image
                    src="/logo.webp"
                    alt="Logo"
                    width={136}
                    height={44}
                    priority
                    className="h-6 w-auto"
                  />
                </Link>
              </div>

              {/* Mobile menu button */}
              <MobileMenu navigation={navigation} />
            </div>
          </div>
        </nav>
      </header>

      {/* Invisible placeholder to maintain layout */}
      <div className="hidden md:block h-[162px]"></div>
      <div className="md:hidden h-16"></div>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-footer-bg border-t border-gray-700">
        {/* Mobile Footer */}
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-[43px] pb-8">
            <div className="flex flex-col items-center">
              {/* Logo */}
              <Link href="/inicio">
                <Image
                  src="/logo-blanco.webp"
                  alt="Logo"
                  width={121}
                  height={40}
                  className="h-6 w-auto"
                />
              </Link>

              {/* Navigation items */}
              <div className="flex flex-col items-center mt-[28px]">
                <a
                  href="/inicio#doctor-section"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                  style={{ letterSpacing: "3px" }}
                >
                  NOSOTROS
                </a>
                <Link
                  href="/tratamientos"
                  className="text-sm text-gray-300 hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  TRATAMIENTOS
                </Link>
                <a
                  href="/inicio#por-que-elegirnos-section"
                  className="text-sm text-gray-300 hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  PORQUE ELEGIRNOS?
                </a>
                <a
                  href="/inicio#actualidad-section"
                  className="text-sm text-gray-300 hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  ACTUALIDAD
                </a>
                <a
                  href="/inicio#contacto-section"
                  className="text-sm text-gray-300 font-extrabold hover:text-white transition-colors mt-[18px]"
                  style={{ letterSpacing: "3px" }}
                >
                  CONTACTO
                </a>
              </div>

              {/* Button */}
              <a
                href="https://wa.me/542644390203"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors mt-[28px]"
              >
                ¡Solicitá tu consulta!
              </a>

              {/* Social Media Icons */}
              <div className="flex space-x-6 mt-[28px]">
                <a
                  href="https://wa.me/542644390203"
                  target="_blank"
                  rel="noopener noreferrer"
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
              <Link href="/inicio">
                <Image
                  src="/logo-blanco.png"
                  alt="Logo"
                  width={121}
                  height={40}
                  className="w-[121px] h-[40px]"
                />
              </Link>
            </div>

            {/* Navigation Column */}
            <div className="absolute left-[801px] top-[101px] flex flex-col items-start space-y-[18px]">
              <a
                href="/inicio#doctor-section"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                NOSOTROS
              </a>
              <Link
                href="/tratamientos"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                TRATAMIENTOS
              </Link>
              <a
                href="/inicio#por-que-elegirnos-section"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                PORQUE ELEGIRNOS?
              </a>
              <a
                href="/inicio#actualidad-section"
                className="text-sm text-gray-300 hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                ACTUALIDAD
              </a>
              <a
                href="/inicio#contacto-section"
                className="text-sm text-gray-300 font-extrabold hover:text-white transition-colors"
                style={{ letterSpacing: "3px" }}
              >
                CONTACTO
              </a>
            </div>

            {/* Social Links Column */}
            <div className="absolute right-[437px] top-[101px] flex flex-col items-end">
              {/* Button */}
              <a
                href="https://wa.me/542644390203"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mb-6"
                style={{ width: "201px", height: "54px" }}
              >
                <span>Solicitá tu consulta</span>
                <Send className="w-4 h-4" />
              </a>

              {/* Social Icons */}
              <div className="flex justify-between" style={{ width: "200px" }}>
                <a
                  href="https://wa.me/542644390203"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  href="https://www.instagram.com/centrosantesj?igsh=OHMzNmYxdnpkaWtx&utm_source=qr"
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
