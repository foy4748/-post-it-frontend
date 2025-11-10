"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            T
          </div>
          <span className="font-semibold text-lg">ThreadHub</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link href="#" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}
