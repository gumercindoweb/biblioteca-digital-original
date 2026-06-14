import React, { createContext, useContext, useState } from "react";
import { Status } from "@/lib/data";

interface StatusContextType {
  resourceStatuses: Record<string, Status>;
  setResourceStatus: (resourceId: string, status: Status) => void;
  getResourceStatus: (resourceId: string, defaultStatus: Status) => Status;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [resourceStatuses, setResourceStatuses] = useState<Record<string, Status>>({});

  const setResourceStatus = (resourceId: string, status: Status) => {
    setResourceStatuses((prev) => ({ ...prev, [resourceId]: status }));
  };

  const getResourceStatus = (resourceId: string, defaultStatus: Status): Status => {
    return resourceStatuses[resourceId] || defaultStatus;
  };

  return (
    <StatusContext.Provider value={{ resourceStatuses, setResourceStatus, getResourceStatus }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatus debe usarse dentro de StatusProvider");
  }
  return context;
}
