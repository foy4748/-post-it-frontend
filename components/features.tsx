"use client"

import { MessageCircle, Users, Zap, Trophy } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "Rich Discussions",
    description: "Start meaningful conversations with formatted text, code snippets, and media attachments.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Learn from experienced developers and help others solve problems together.",
  },
  {
    icon: Zap,
    title: "Fast & Responsive",
    description: "Lightning-fast replies and real-time updates keep conversations flowing seamlessly.",
  },
  {
    icon: Trophy,
    title: "Recognition",
    description: "Earn badges and reputation points for helping the community grow and thrive.",
  },
]

export function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Why ThreadHub?</h2>
          <p className="mt-4 text-lg text-foreground/60">Everything you need for productive discussions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
