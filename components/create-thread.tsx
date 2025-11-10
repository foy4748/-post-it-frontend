"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CreateThread() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="lg" className="w-full gap-2">
        <Plus className="h-5 w-5" />
        Start a New Discussion
      </Button>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Create New Thread</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Title</label>
          <input
            type="text"
            placeholder="What's your question or topic?"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category</label>
          <select className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none">
            <option>React</option>
            <option>TypeScript</option>
            <option>Next.js</option>
            <option>JavaScript</option>
            <option>CSS</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            placeholder="Provide more details about your question or topic..."
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
            rows={5}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)} className="flex-1">
            Post Thread
          </Button>
        </div>
      </div>
    </div>
  )
}
