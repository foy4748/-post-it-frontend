"use client";

// import { createContext, useContext, useState } from "react";

// interface NotificationContextType {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }
// const NotificationContext = createContext<NotificationContextType | undefined>(
//   undefined,
// );

// <NotificationContext.Provider value={}>
//   {children}
// </NotificationContext.Provider>
function NotificationProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default NotificationProvider;
