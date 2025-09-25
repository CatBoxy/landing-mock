"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  title: string;
  description?: string[];
  children?: React.ReactNode;
  level: number;
  isActive: boolean;
  onToggle: () => void;
  rootWidth?: string;
}

const levelStyles = {
  0: {
    default: "bg-[#E9E3DC]",
    active: "bg-[#C1C5B4]"
  },
  1: {
    default: "bg-[#C1C5B4]",
    active: "bg-[#F3F3F3]"
  },
  2: {
    default: "bg-[#F3F3F3]",
    active: "bg-[#F3F3F3]"
  }
};

export function Dropdown({
  title,
  description,
  children,
  level,
  isActive,
  onToggle,
  rootWidth
}: DropdownProps) {
  const styles =
    levelStyles[level as keyof typeof levelStyles] || levelStyles[0];

  const renderDescription = () => {
    if (!description || description.length === 0) return null;

    const [firstDescription, ...remaining] = description;

    return (
      <div className="space-y-3 pt-[10px]">
        <p className="font-main font-light text-sm text-black leading-relaxed">
          {firstDescription}
        </p>

        {remaining.length > 1 ? (
          <ul className="space-y-1">
            {remaining.map((item, index) => (
              <li
                key={index}
                className="font-main font-light text-sm text-black leading-relaxed flex items-start"
              >
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : remaining.length === 1 ? (
          <p className="font-main font-light text-sm text-[#78815C] italic leading-relaxed">
            {remaining[0]}
          </p>
        ) : null}
      </div>
    );
  };

  const hasContent = description && description.length > 0;
  const hasChildren = children && React.Children.count(children) > 0;

  return (
    <div
      className="w-full"
      style={rootWidth ? { width: rootWidth } : undefined}
    >
      {/* Dropdown Header */}
      <button
        onClick={onToggle}
        className={`w-full px-4 py-3 text-left transition-colors duration-200 sm:rounded-[10px] rounded-[7px] ${
          isActive ? styles.active : styles.default
        } shadow-[2px_2px_4px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex items-center justify-between">
          <span className="font-main font-medium text-[14px] md:text-[20px] text-black">
            {title}
          </span>
          {(hasContent || hasChildren) && (
            <ChevronDown
              className={`w-5 h-5 text-black transition-transform duration-200 ${
                isActive ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
      </button>

      {/* Dropdown Content */}
      {isActive && (
        <div className="bg-white">
          {hasContent && renderDescription()}
          {hasChildren && <div className="mt-3 space-y-2">{children}</div>}
        </div>
      )}
    </div>
  );
}
