"use client";
import moment from "moment";
import SummarizeButton from "./SummarizeButton";
import { TSingleThread } from "@/types/thread";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";

function SingleThreadCard({ thread }: { thread: TSingleThread }) {
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  useEffect(() => {
    socket.connect();

    // Checking Flagged Comments
    socket.on(`explicit-thread-${thread?._id}`, () => {
      console.log(`explicit-post-${thread?._id}`);
      setIsFlagged(true);
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for explicit-thread-${thread._id} is closed`);
    };
  }, []);
  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-6 mb-8", {
        "border-l-3 border-red-500 hover:border-red-700":
          isFlagged || thread?.isFlagged === true,
      })}
    >
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <div className="mb-3 inline-block">
            <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
              {thread?.category?.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
            {thread?.title}
          </h1>

          {/* Author info */}
          <div className="flex justify-between">
            <div className="mb-6 flex items-center gap-3 pb-6 border-b border-border">
              <img
                src={thread?.author?.picture || "/placeholder.svg"}
                alt={thread?.author?.username}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-foreground">
                  {thread?.author?.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {moment(thread?.createdAt).fromNow()}
                </p>
              </div>
            </div>
            {(isFlagged || thread?.isFlagged === true) && (
              <Button size={"sm"} className="bg-red-500 text-white">
                Flagged
              </Button>
            )}
          </div>

          {/* Content */}
          <p className="mb-6 whitespace-pre-line text-muted-foreground leading-relaxed text-base">
            {thread?.content}
          </p>

          {/* Action buttons */}
          <SummarizeButton />
        </div>
      </div>
    </div>
  );
}

export default SingleThreadCard;
