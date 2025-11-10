"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MessageCircle,
  //ThumbsUp,
  Share2,
  ArrowRightIcon,
} from "lucide-react";
import { TSingleThread } from "@/types/thread";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import DeleteThread from "./DeleteThread";
import { useSession } from "next-auth/react";
import { useNotification } from "@/providers/NotificationProvider";
import moment from "moment";

function ThreadCard({ thread }: { thread: TSingleThread }) {
  const { data } = useSession();
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  const { addNotification } = useNotification();
  useEffect(() => {
    socket.connect();

    // Checking Flagged Comments
    socket.on(`explicit-thread-${thread._id}`, () => {
      console.log(`explicit-thread-${thread._id}`);
      addNotification({
        link: `/thread`,
        message: "One of your thread has been flagged",
      });
      setIsFlagged(true);
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for explicit-thread-${thread._id} is closed`);
    };
  }, []);
  return (
    <div
      key={thread._id}
      className={cn(
        " rounded-lg border border-border bg-card transition-all hover:shadow-md p-6",
        {
          "border-l-3 border-red-500 hover:border-red-700":
            isFlagged || thread?.isFlagged === true,
        },
      )}
    >
      <div className="flex justify-end items-center gap-x-3">
        {/* Expand button */}
        {thread.author._id == data?.user.id && <DeleteThread thread={thread} />}
      </div>
      {/* Main content */}
      <Link className="block" href={`/thread/${thread._id}`}>
        <div className="flex-1">
          {/* Category badge */}
          <div className="mb-4 inline-block">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {thread.category.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-xl font-bold text-foreground">
            {thread.title}
          </h2>

          {/* Preview content */}
          <p className="mb-4 line-clamp-2 text-muted-foreground">
            {thread.content}
          </p>

          {/* Author info and actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img
                src={thread.author.picture || "/placeholder.svg"}
                alt={thread.author.username}
                className="h-8 w-8 rounded-full"
              />
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  {thread.author.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {moment(thread.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {(isFlagged || thread?.isFlagged === true) && (
                <Button size={"sm"} className="bg-red-500 text-white">
                  Flagged
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                // onClick={onToggle}
              >
                <MessageCircle className="h-4 w-4" />
                {/* <span className="ml-1 text-sm">{posthread.replies}</span> */}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="pointer text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ThreadCard;
