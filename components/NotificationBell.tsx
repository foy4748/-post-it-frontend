// components/NotificationBell.jsx
"use client";
import { useState, useEffect } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { socket } from "@/lib/socket";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotifications] = useState([]);
  // const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    socket.on("notification", (data) => {
      // console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
    socket.on("new-thread", (data) => {
      // console.log(data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      // socket.emit("disconnect", () => {
      //   console.log("Bye Bye");
      // });
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 relative"
      >
        <span className="text-2xl">🔔</span>
        {notification.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notification.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <span className="text-sm text-gray-500"> 0 unread</span>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    notification.read ? "opacity-60" : "bg-blue-50"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {notification.title}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        {notification.message}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
