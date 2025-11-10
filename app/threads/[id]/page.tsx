"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data - same posts from thread-section
const mockPosts: Record<
  string,
  {
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
    comments: Array<{
      id: string
      author: string
      avatar: string
      content: string
      timestamp: string
      votes: number
      hasVoted?: boolean
    }>
  }
> = {
  "1": {
    id: "1",
    title: "How to optimize React performance with code splitting?",
    content:
      "I've been working on a large React application and performance is becoming an issue. What are the best practices for code splitting and lazy loading components? Should I use React.lazy or a third-party solution?\n\nI've tried implementing basic code splitting but I'm not seeing the performance improvements I expected. Any insights would be appreciated!",
    author: "Alex Chen",
    avatar: "/tech-developer-avatar.jpg",
    timestamp: "2 hours ago",
    votes: 245,
    category: "React",
    replies: 12,
    hasVoted: false,
    comments: [
      {
        id: "c1",
        author: "Sarah Rodriguez",
        avatar: "/woman-developer.png",
        content:
          "React.lazy is great for code splitting at the route level. For component-level splitting, consider using dynamic imports with Next.js. This approach works really well for reducing your initial bundle size.",
        timestamp: "1 hour ago",
        votes: 89,
        hasVoted: false,
      },
      {
        id: "c2",
        author: "Mike Johnson",
        avatar: "/man-developer.png",
        content:
          "Don't forget about bundle analysis tools like webpack-bundle-analyzer. It helps identify what's actually taking up space in your bundle. I recommend running it before and after implementing code splitting.",
        timestamp: "45 minutes ago",
        votes: 156,
        hasVoted: false,
      },
      {
        id: "c3",
        author: "Emma Wilson",
        avatar: "/woman-engineer-at-work.png",
        content:
          "Also consider using dynamic imports for heavy third-party libraries. Defer loading them until they're actually needed on the page.",
        timestamp: "30 minutes ago",
        votes: 45,
        hasVoted: false,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Best practices for TypeScript in large projects",
    content:
      "What configuration settings do you recommend for TypeScript in enterprise applications? I'm particularly interested in strict mode and type checking strategies.\n\nOur team is just starting to migrate a large codebase from JavaScript to TypeScript and we want to get it right from the start.",
    author: "Jordan Smith",
    avatar: "/man-software-engineer.png",
    timestamp: "5 hours ago",
    votes: 567,
    category: "TypeScript",
    replies: 34,
    hasVoted: false,
    comments: [
      {
        id: "c4",
        author: "Emma Wilson",
        avatar: "/woman-engineer-at-work.png",
        content:
          "Always enable strict mode. It catches so many potential bugs early on. The initial setup might be tedious, but it's worth it in the long run. Your future self will thank you.",
        timestamp: "4 hours ago",
        votes: 423,
        hasVoted: false,
      },
      {
        id: "c5",
        author: "David Lee",
        avatar: "/man-developer.png",
        content:
          "I'd recommend using `noImplicitAny`, `strictNullChecks`, and `strictFunctionTypes` as a minimum. You can gradually enable more strict rules as your team gets comfortable.",
        timestamp: "3 hours ago",
        votes: 234,
        hasVoted: false,
      },
    ],
  },
}

export default function ThreadDetail({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [postData, setPostData] = useState<any>(null)
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [commentVotes, setCommentVotes] = useState<Record<string, number>>({})
  const [replyText, setReplyText] = useState("")

  // Resolve params and load post data
  if (!resolvedParams) {
    Promise.resolve(params).then((p) => {
      setResolvedParams(p)
      setPostData(mockPosts[p.id] || mockPosts["1"])
    })
    return <div className="min-h-screen bg-background" />
  }

  if (!postData) {
    return <div className="min-h-screen bg-background" />
  }

  const handleVote = (isUpvote: boolean) => {
    const newVotes = isUpvote
      ? votes[postData.id]
        ? votes[postData.id] + 1
        : 1
      : votes[postData.id]
        ? votes[postData.id] - 1
        : -1
    setVotes({ ...votes, [postData.id]: newVotes })
  }

  const handleCommentVote = (commentId: string, isUpvote: boolean) => {
    const currentVotes = commentVotes[commentId] || 0
    const newVotes = isUpvote ? currentVotes + 1 : currentVotes - 1
    setCommentVotes({ ...commentVotes, [commentId]: newVotes })
  }

  const handlePostReply = () => {
    if (replyText.trim()) {
      setReplyText("")
      // Reply posted logic would go here
    }
  }

  const totalVotes = (votes[postData.id] || 0) + postData.votes

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Back to Threads
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Main post */}
        <div className="rounded-lg border border-border bg-card p-6 mb-8">
          <div className="flex gap-6">
            {/* Vote sidebar */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                onClick={() => handleVote(true)}
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <span className="text-lg font-bold text-foreground">{totalVotes}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                onClick={() => handleVote(false)}
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Category badge */}
              <div className="mb-3 inline-block">
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
                  {postData.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
                {postData.title}
              </h1>

              {/* Author info */}
              <div className="mb-6 flex items-center gap-3 pb-6 border-b border-border">
                <img
                  src={postData.avatar || "/placeholder.svg"}
                  alt={postData.author}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{postData.author}</p>
                  <p className="text-sm text-muted-foreground">{postData.timestamp}</p>
                </div>
              </div>

              {/* Content */}
              <p className="mb-6 whitespace-pre-line text-muted-foreground leading-relaxed text-base">
                {postData.content}
              </p>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts/Replies section */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {postData.comments.length} {postData.comments.length === 1 ? "Post" : "Posts"}
            </h2>
            <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
              <option>Most Helpful</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Posts/Comments list */}
          <div className="space-y-4 mb-8">
            {postData.comments.map((comment: any, index: number) => (
              <div
                key={comment.id}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Post vote */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      onClick={() => handleCommentVote(comment.id, true)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-bold text-foreground">
                      {(commentVotes[comment.id] || 0) + comment.votes}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={() => handleCommentVote(comment.id, false)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3 flex items-center gap-3 flex-wrap">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{comment.author}</p>
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary font-semibold">
                            Accepted
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground ml-auto">{comment.timestamp}</p>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-muted-foreground hover:text-foreground"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply input */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Post an Answer</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Share your thoughts or provide an answer..."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              rows={4}
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handlePostReply} disabled={!replyText.trim()}>
                Post Answer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
