"use client";
import React, { useState } from "react";
import { Dropdown } from "./Dropdown";

interface DropdownItem {
  id: string;
  title: string;
  content: string;
}

interface DropdownContainerProps {
  items: DropdownItem[];
}

export function DropdownContainer({ items }: DropdownContainerProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleToggle = (dropdownId: string) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Dropdown
          key={item.id}
          title={item.title}
          content={item.content}
          isActive={activeDropdown === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
