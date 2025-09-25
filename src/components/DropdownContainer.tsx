"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "./Dropdown";

interface TreatmentNode {
  label: string;
  description?: string[];
  children?: TreatmentNode[];
}

interface DropdownContainerProps {
  treatments: TreatmentNode[];
}

interface ActiveDropdowns {
  [key: string]: boolean;
}

export function DropdownContainer({ treatments }: DropdownContainerProps) {
  const [activeDropdowns, setActiveDropdowns] = useState<ActiveDropdowns>({});
  const [rootWidth, setRootWidth] = useState<string>("w-full");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (dropdownId: string) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }));
  };

  useEffect(() => {
    const updateRootWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setRootWidth(`${width}px`);
      }
    };

    updateRootWidth();
    window.addEventListener("resize", updateRootWidth);

    return () => window.removeEventListener("resize", updateRootWidth);
  }, []);

  const renderTreatmentNode = (
    node: TreatmentNode,
    level: number,
    parentId?: string
  ): React.ReactNode => {
    const nodeId = parentId ? `${parentId}-${node.label}` : node.label;
    const isActive = activeDropdowns[nodeId] || false;

    // For root level, don't pass rootWidth (use default w-full)
    // For child levels, pass the captured root width
    const currentRootWidth = level === 0 ? undefined : rootWidth;

    return (
      <Dropdown
        key={nodeId}
        title={node.label}
        description={node.description}
        level={level}
        isActive={isActive}
        onToggle={() => handleToggle(nodeId)}
        rootWidth={currentRootWidth}
      >
        {node.children &&
          node.children.map((child) =>
            renderTreatmentNode(child, level + 1, nodeId)
          )}
      </Dropdown>
    );
  };

  return (
    <div ref={containerRef} className="space-y-2">
      {treatments.map((treatment) => renderTreatmentNode(treatment, 0))}
    </div>
  );
}
