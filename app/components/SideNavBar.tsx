"use client";

import { useState } from "react";
import {
  ChevronDown,
  Home,
  TrendingUp,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/providers/SideNavBarProvider";
import { signOut } from "next-auth/react";
import { TThreadCategory } from "@/types/thread";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarSection {
  id: string;
  title: string;
  items: TThreadCategory[];
  isOpen: boolean;
}

export function ForumSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [sections, setSections] = useState<SidebarSection[]>([
    {
      id: "categories",
      title: "Categories",
      isOpen: true,
      items: [
        {
          _id: "690e0bc1ed0a972bee08e2ea",
          category: "React",
        },
        {
          _id: "690e0bcbed0a972bee08e2ec",
          category: "NextJS",
        },
        {
          _id: "690e0bcfed0a972bee08e2ee",
          category: "Redux",
        },
        {
          _id: "690e0bd5ed0a972bee08e2f0",
          category: "Redux-Toolkit",
        },
        {
          _id: "690e0beded0a972bee08e2f2",
          category: "WebSocket",
        },
        {
          _id: "690e0bf9ed0a972bee08e2f4",
          category: "AI / ML",
        },
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

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (pathname == "/") return <></>;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 md:hidden z-30 top-16"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-16 w-64 border-r border-border h-full overflow-y-auto flex flex-col z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:static md:translate-x-0`}
      >
        {/* Primary Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href={"/"}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground hover:bg-accent"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Button>
          </Link>
          <Link href={"/thread"}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground hover:bg-accent"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Threads</span>
            </Button>
          </Link>
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
                      <Link href={`/thread?category=${item._id}`}>
                        <button className="w-full text-left py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors flex items-center justify-between">
                          <span>{item.category}</span>
                        </button>
                      </Link>
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
            onClick={handleSignOut}
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
