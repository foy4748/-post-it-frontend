"use client"

import { useState } from "react"
import Link from "next/link"
import { ThreadPost } from "./thread-post"
import { CreateThread } from "./create-thread"

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

const mockPosts: Post[] = [
  {
    id: "1",
    title: "How to optimize React performance with code splitting?",
    content:
      "I've been working on a large React application and performance is becoming an issue. What are the best practices for code splitting and lazy loading components? Should I use React.lazy or a third-party solution?",
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
          "React.lazy is great for code splitting at the route level. For component-level splitting, consider using dynamic imports with Next.js.",
        timestamp: "1 hour ago",
        votes: 89,
        hasVoted: false,
      },
      {
        id: "c2",
        author: "Mike Johnson",
        avatar: "/man-developer.png",
        content:
          "Don't forget about bundle analysis tools like webpack-bundle-analyzer. It helps identify what's actually taking up space in your bundle.",
        timestamp: "45 minutes ago",
        votes: 156,
        hasVoted: false,
      },
    ],
  },
  {
    id: "2",
    title: "Best practices for TypeScript in large projects",
    content:
      "What configuration settings do you recommend for TypeScript in enterprise applications? I'm particularly interested in strict mode and type checking strategies.",
    author: "Jordan Smith",
    avatar: "/man-software-engineer.png",
    timestamp: "5 hours ago",
    votes: 567,
    category: "TypeScript",
    replies: 34,
    hasVoted: false,
    comments: [
      {
        id: "c3",
        author: "Emma Wilson",
        avatar: "/woman-engineer-at-work.png",
        content:
          "Always enable strict mode. It catches so many potential bugs early on. The initial setup might be tedious, but it's worth it.",
        timestamp: "4 hours ago",
        votes: 423,
        hasVoted: false,
      },
    ],
  },
]

export function ThreadSection() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [expandedThread, setExpandedThread] = useState<string | null>(null)

  const handleVote = (postId: string, isUpvote: boolean) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            votes: isUpvote ? post.votes + 1 : post.votes - 1,
            hasVoted: !post.hasVoted,
          }
        }
        return post
      }),
    )
  }

  const toggleThread = (postId: string) => {
    setExpandedThread(expandedThread === postId ? null : postId)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Discussion Threads</h1>
        <p className="text-muted-foreground">Share knowledge, ask questions, and learn from the community</p>
      </div>

      <div className="mb-8">
        <CreateThread />
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/threads/${post.id}`}>
            <ThreadPost
              post={post}
              isExpanded={expandedThread === post.id}
              onToggle={(e) => {
                e.preventDefault()
                toggleThread(post.id)
              }}
              onVote={(isUpvote) => handleVote(post.id, isUpvote)}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
