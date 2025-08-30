"use client";
import React, { useState } from "react";
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

  const handleToggle = (dropdownId: string) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }));
  };

  const renderTreatmentNode = (
    node: TreatmentNode,
    level: number,
    parentId?: string
  ): React.ReactNode => {
    const nodeId = parentId ? `${parentId}-${node.label}` : node.label;
    const isActive = activeDropdowns[nodeId] || false;

    return (
      <Dropdown
        key={nodeId}
        title={node.label}
        description={node.description}
        level={level}
        isActive={isActive}
        onToggle={() => handleToggle(nodeId)}
      >
        {node.children &&
          node.children.map((child) =>
            renderTreatmentNode(child, level + 1, nodeId)
          )}
      </Dropdown>
    );
  };

  return (
    <div className="space-y-2">
      {treatments.map((treatment) => renderTreatmentNode(treatment, 0))}
    </div>
  );
}
