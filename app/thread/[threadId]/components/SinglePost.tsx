"use client";
import { TSinglePost } from "@/types/post";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import Link from "next/link";

function SinglePost({ post }: { post: TSinglePost }) {
  const [isFlagged, setIsFlagged] = useState<Boolean>(false);
  const { threadId } = useParams();
  console.log("from SinglePost", { post });
  console.log({ isFlagged });
  useEffect(() => {
    socket.connect();
    socket.on(`explicit-post-${post._id}`, () => {
      console.log(`explicit-post-${post._id}`);
      setIsFlagged(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Link
      href={`/thread/${threadId}/${post?._id}`}
      key={post._id}
      className={cn(
        "block rounded-lg border  bg-card p-4 hover:border-primary/50 transition-colors",
        {
          "bborder-l-3 border-red-500 hover:border-red-700":
            isFlagged || post.isFlagged === true,
        },
      )}
    >
      <div className="flex gap-4">
        {/* Post content */}
        <div className="flex-1 min-w-0">
          <div className="mb-3 flex items-center gap-3 flex-wrap">
            <img
              src={post.author.picture || "/placeholder.svg"}
              alt={post.author.username}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {post.author.username}
              </p>
            </div>
            <p className="text-sm text-muted-foreground ml-auto">
              {moment(post.createdAt).fromNow()}
            </p>
            {(isFlagged || post.isFlagged === true) && (
              <Button size={"sm"} className="bg-red-500 text-white">
                Flagged
              </Button>
            )}
          </div>
          <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
            {post.content}
          </p>
          <Button
            disabled={Boolean(isFlagged)}
            variant="ghost"
            size="sm"
            className="text-xs h-7 text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Reply
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default SinglePost;
