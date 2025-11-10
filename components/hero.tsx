"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Join our community discussions
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance">
            Ask, Share, and Learn Together
          </h1>

          <p className="mt-6 text-xl text-foreground/60 text-balance">
            Connect with thousands of developers, ask questions, share
            knowledge, and grow your skills. ThreadHub is where great
            conversations happen.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={"/thread"}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
              >
                Start a Thread
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={"/thread"}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent"
              >
                Explore Discussions
              </Button>
            </Link>
          </div>

          {/*
          <div className="mt-16">
            <img
              src="/community-discussion-forum-interface-modern.jpg"
              alt="ThreadHub Interface"
              className="rounded-lg border border-border shadow-lg"
            />
          </div> 
		  */}
        </div>
      </div>
    </section>
  );
}
