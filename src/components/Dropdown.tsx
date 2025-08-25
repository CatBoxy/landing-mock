"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  title: string;
  content: string;
  isActive: boolean;
  onToggle: () => void;
}

export function Dropdown({
  title,
  content,
  isActive,
  onToggle
}: DropdownProps) {
  return (
    <div className="w-full">
      {/* Dropdown Header */}
      <button
        onClick={onToggle}
        className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
          isActive ? "bg-[#C1C5B4]" : "bg-[#E9E3DC]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-main font-medium text-sm text-black">
            {title}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-black transition-transform duration-200 ${
              isActive ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {/* Dropdown Content */}
      {isActive && (
        <div className="bg-[#E9E3DC] px-4 py-3">
          <p className="font-main font-light text-sm text-black leading-relaxed">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
