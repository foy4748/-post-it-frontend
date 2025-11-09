"use client";

import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import { SearchAndFilterThread } from "../thread/components/SearchAndFilterThreads";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Categories
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
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
            </button>

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
