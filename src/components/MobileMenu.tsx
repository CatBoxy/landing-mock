"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MobileMenuProps {
  navigation: Array<{
    name: string;
    href: string;
  }>;
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getMobileHref = (originalHref: string) => {
    // Map desktop hrefs to mobile hrefs for mobile menu
    const mobileHrefMap: Record<string, string> = {
      "/inicio#por-que-elegirnos-section":
        "/inicio#por-que-elegirnos-section-mobile",
      "/inicio#contacto-section": "/inicio#contacto-section-mobile",
      "/inicio#actualidad-section": "/inicio#actualidad-section-mobile"
    };

    return mobileHrefMap[originalHref] || originalHref;
  };

  return (
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
            {navigation.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  href={getMobileHref(item.href)}
                  className={`block px-4 py-3 text-gray-900 hover:text-gray-700 hover:bg-dropdown-opened transition-colors ${
                    item.name === "CONTACTO" ? "font-extrabold" : ""
                  }`}
                  style={{ letterSpacing: "3px" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && (
                  <div className="flex justify-center mb-3">
                    <div className="w-[226px] h-[1px] bg-gray-950"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
