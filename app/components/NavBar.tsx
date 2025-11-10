"use client";

import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import { SearchAndFilterThread } from "../thread/components/SearchAndFilterThreads";
import { useNotification } from "@/providers/NotificationProvider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useNotification();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              F
            </div>
            <span className="hidden text-xl font-bold text-foreground sm:inline">
              Forum
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden gap-8 md:flex">
            <Link
              href="/thread"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Forums
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Register
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg">
              <SearchAndFilterThread />
              {/*
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-48"
              />
			  */}
            </div>
            {/* Mobile Search */}
            <div className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors lg:hidden">
              <SearchAndFilterThread />
              {/*
              <Search className="h-5 w-5 text-foreground" />
		    */}
            </div>

            {/* Notifications */}
            {/* 
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-foreground" />
              {notifications?.length ? (
                <>
                  <div className="absolute text-xs top-0 right-1 h-2 w-2 bg-destructive rounded-full text-white p-2">
                    <p>{notifications.length}</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </button>
			*/}

            <div>
              {/* Trigger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <span className="text-2xl">🔔</span>
                {notifications?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications?.length}
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
                      notifications.map((notification, idx) => (
                        <div
                          key={idx}
                          className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer`}
                          // onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-2">
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {notification.message}
                              </p>
                              {notification?.link ? (
                                <Link href={notification?.link}>
                                  <p className="font-medium text-sm text-right">
                                    Go
                                  </p>
                                </Link>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
              <div className="h-6 w-6 rounded-full bg-primary" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 px-2 space-y-2">
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Discussions
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Categories
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Trending
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Help
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
