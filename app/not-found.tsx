"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Large 404 Number */}
        <div className="mb-8">
          <div className="text-[120px] md:text-[150px] font-bold text-foreground/20 leading-none">
            404
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>

        {/* Error Description */}
        <p className="text-muted-foreground text-base md:text-lg mb-8">
          Oops! The thread you're looking for doesn't exist or has been removed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/threads"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
          >
            <Search size={18} />
            Browse Threads
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Need help? Check our community forums or contact support.
          </p>
        </div>
      </div>
    </main>
  );
}
