"use client";

import { SetStateAction, createContext, useContext, useState } from "react";

type TNotification = {
  link?: string;
  message: string;
};

interface NotificationContextType {
  isOpen: boolean;
  notifications: TNotification[];
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setNotifications: React.Dispatch<SetStateAction<TNotification[]>>;
  addNotification: (notification: TNotification) => void;
  clearNotification: () => void;
}
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const addNotification = (notification: TNotification) => {
    setNotifications((prev) => [...prev, notification]);
  };
  const clearNotification = () => setNotifications([]);
  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        notifications,
        setIsOpen,
        setNotifications,
        addNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export default NotificationProvider;
