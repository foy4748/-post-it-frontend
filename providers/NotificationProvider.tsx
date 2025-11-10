"use client";

import { createContext, useContext, useState } from "react";

interface NotificationContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  return (
    <NotificationContext.Provider value={}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
