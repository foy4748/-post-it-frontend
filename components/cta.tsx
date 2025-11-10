"use client"

import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold">Ready to Join the Conversation?</h2>
        <p className="mt-4 text-lg text-foreground/60">
          Create your account now and become part of a thriving community of developers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create Account
          </Button>
          <Button size="lg" variant="outline">
            Browse Discussions
          </Button>
        </div>
      </div>
    </section>
  )
}
