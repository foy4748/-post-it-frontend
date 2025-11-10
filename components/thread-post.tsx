"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, MessageCircle, ThumbsUp, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  votes: number
  hasVoted?: boolean
}

interface Post {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  timestamp: string
  votes: number
  category: string
  replies: number
  hasVoted?: boolean
  comments: Comment[]
}

interface ThreadPostProps {
  post: Post
  isExpanded: boolean
  onToggle: (e?: React.MouseEvent) => void
  onVote: (isUpvote: boolean) => void
}

export function ThreadPost({ post, isExpanded, onToggle, onVote }: ThreadPostProps) {
  const [commentVotes, setCommentVotes] = useState<Record<string, number>>({})

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md hover:border-primary/50 cursor-pointer">
      <div className="p-6">
        <div className="flex gap-4">
          {/* Vote sidebar */}
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${post.hasVoted ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => onVote(true)}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v-7a1.5 1.5 0 11-3 0v7zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </Button>
            <span className="text-sm font-semibold text-foreground">{post.votes}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => onVote(false)}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-7a1.5 1.5 0 113 0v7zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.056 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
              </svg>
            </Button>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Category badge */}
            <div className="mb-2 inline-block">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-xl font-bold text-foreground">{post.title}</h2>

            {/* Preview content */}
            <p className="mb-4 line-clamp-2 text-muted-foreground">{post.content}</p>

            {/* Author info and actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="h-8 w-8 rounded-full" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={onToggle}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="ml-1 text-sm">{post.replies}</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expand button */}
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            onClick={onToggle}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-6 border-t border-border pt-6">
            {/* Full content */}
            <p className="mb-6 text-muted-foreground">{post.content}</p>

            {/* Comments section */}
            <div>
              <h3 className="mb-4 font-semibold text-foreground">
                {post.comments.length} {post.comments.length === 1 ? "Reply" : "Replies"}
              </h3>
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg bg-muted/30 p-4">
                    <div className="mb-3 flex items-start gap-3">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{comment.content}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {comment.votes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply input */}
            <div className="mt-6 border-t border-border pt-6">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                rows={3}
              />
              <Button className="mt-3">Post Reply</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
