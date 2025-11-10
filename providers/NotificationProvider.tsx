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
}
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  return (
    <NotificationContext.Provider
      value={{ isOpen, notifications, setIsOpen, setNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
