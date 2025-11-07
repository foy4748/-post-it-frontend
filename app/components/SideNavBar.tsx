"use client";

import { useState } from "react";
import {
  ChevronDown,
  Home,
  TrendingUp,
  Users,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/providers/SideNavBarProvider";

interface SidebarSection {
  id: string;
  title: string;
  items: { label: string; count?: number }[];
  isOpen: boolean;
}

export function ForumSidebar() {
  const { isOpen } = useSidebar();
  const [sections, setSections] = useState<SidebarSection[]>([
    {
      id: "categories",
      title: "Categories",
      isOpen: true,
      items: [
        { label: "General Discussion", count: 234 },
        { label: "Announcements", count: 12 },
        { label: "Questions & Help", count: 567 },
        { label: "Feedback", count: 89 },
      ],
    },
    {
      id: "trending",
      title: "Trending Topics",
      isOpen: true,
      items: [
        { label: "New Feature Releases" },
        { label: "Community Best Practices" },
        { label: "Getting Started Guide" },
        { label: "Troubleshooting Tips" },
      ],
    },
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section,
      ),
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30 top-16"
          onClick={() => {}}
        />
      )}

      <aside
        className={`fixed left-0 top-16 w-64 border-r border-border bg-sidebar h-[calc(100vh-4rem)] overflow-y-auto flex flex-col z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:static md:translate-x-0`}
      >
        {/* Primary Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-accent"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-accent"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Trending</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-accent"
          >
            <Users className="h-5 w-5" />
            <span>Members</span>
          </Button>
        </nav>

        {/* Collapsible Sections */}
        <div className="flex-1 px-4 space-y-4">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between py-2 px-2 rounded-md hover:bg-accent transition-colors"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {section.title}
                </h3>
                <ChevronDown
                  className="h-4 w-4 text-muted-foreground transition-transform"
                  style={{
                    transform: section.isOpen
                      ? "rotate(0deg)"
                      : "rotate(-90deg)",
                  }}
                />
              </button>

              {section.isOpen && (
                <ul className="space-y-1 ml-2 border-l border-border pl-3">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <button className="w-full text-left py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.count && (
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* User Menu */}
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-accent"
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved Posts</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-accent"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-foreground hover:bg-accent text-red-500 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
