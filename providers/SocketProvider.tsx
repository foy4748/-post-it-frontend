// contexts/SocketContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize socket connection

    socketInstance.on("connect", () => {
      console.log("✅ Connected to server");
      setIsConnected(true);

      // Join user-specific rooms
      // if (userId) {
      //   socketInstance.emit("join-user", userId);
      //   socketInstance.emit("join-notifications", userId);
      // }
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setIsConnected(false);
    });

    socketInstance.on("notification", (notification) => {
      console.log("📨 New notification:", notification);
      setNotifications((prev) => [notification, ...prev]);

      // Show browser notification if permitted
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/notification-icon.png",
        });
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Request browser notification permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    socket,
    isConnected,
    notifications,
    markAsRead,
    clearNotifications,
    requestNotificationPermission,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};
