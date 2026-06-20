import React, { useState, useRef, useEffect } from "react";
import { Status, statusLabels, statusColors, ResourceType } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { useStatus } from "@/contexts/StatusContext";

const bookStatusLabels: Record<Status, string> = {
  "en-cola":    "Por leer",
  "leyendo":    "Leyendo",
  "completado": "Leído",
};

interface StatusSelectorProps {
  resourceId: string;
  currentStatus: Status;
  resourceType?: ResourceType;
}

export function StatusSelector({ resourceId, currentStatus, resourceType }: StatusSelectorProps) {
  const { setResourceStatus } = useStatus();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses: Status[] = ["en-cola", "leyendo", "completado"];
  const labels = resourceType === "libro" ? bookStatusLabels : statusLabels;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus: Status) => {
    setResourceStatus(resourceId, newStatus);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all hover:opacity-80"
        style={{
          backgroundColor: `${statusColors[currentStatus]}20`,
          color: statusColors[currentStatus],
          border: `1px solid ${statusColors[currentStatus]}40`,
        }}
      >
        {labels[currentStatus]}
        <ChevronDown size={12} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-1 left-0 bg-card border border-border rounded-lg shadow-lg z-50 min-w-48 overflow-hidden"
        >
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2 border-b border-border last:border-b-0"
              style={{
                backgroundColor: currentStatus === status ? `${statusColors[status]}15` : undefined,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColors[status] }}
              />
              <span style={{ color: statusColors[status], fontWeight: currentStatus === status ? 600 : 400 }}>
                {labels[status]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
