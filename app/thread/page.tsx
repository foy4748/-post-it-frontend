import { getThreads } from "@/actions/thread/getThreads";
import { TSingleThread } from "@/types/thread";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MessageCircle,
  ThumbsUp,
  Share2,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

async function ThreadsPage() {
  const threads: TSingleThread[] = await getThreads();
  return (
    <div>
      {threads.map((t) => {
        return (
          <div
            key={t._id}
            className="flex gap-4 rounded-lg border border-border bg-card transition-all hover:shadow-md p-6"
          >
            {/* Vote sidebar */}
            {/*
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                // ${post.hasVoted ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                className={`h-8 w-8 p-0 `}
                // onClick={() => onVote(true)}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v-7a1.5 1.5 0 11-3 0v7zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </Button>
              <span className="text-sm font-semibold text-foreground">
                Votes 0
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                // onClick={() => onVote(false)}
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-7a1.5 1.5 0 113 0v7zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.056 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
              </Button>
            </div>
			*/}
            {/* Main content */}
            <div className="flex-1">
              {/* Category badge */}
              <div className="mb-2 inline-block">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {t.category.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-3 text-xl font-bold text-foreground">
                {t.title}
              </h2>

              {/* Preview content */}
              <p className="mb-4 line-clamp-2 text-muted-foreground">
                {t.content}
              </p>

              {/* Author info and actions */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.author.picture || "/placeholder.svg"}
                    alt={t.author.username}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">
                      {t.author.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.createdAt}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    // onClick={onToggle}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {/* <span className="ml-1 text-sm">{post.replies}</span> */}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="pointer text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Link href={`/thread/${t._id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Expand button */}
            <Button
              variant="ghost"
              size="sm"
              // ${isExpanded ? "rotate-180" : ""}
              className={`h-8 w-8 p-0 transition-transform `}
              // onClick={onToggle}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default ThreadsPage;
