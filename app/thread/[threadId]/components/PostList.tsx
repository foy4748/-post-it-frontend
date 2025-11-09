"use client";
// import React, {useState} from "react"
import { getPosts } from "@/actions/post/getPosts";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { TSinglePost } from "@/types/post";
import { MessageCircle } from "lucide-react";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// type propType = {
//   params: Promise<{
//     threadId: string;
//   }>;
// };

export default function PostList() {
  const p = useParams();
  const [postData, setPosts] = useState<TSinglePost[]>([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on(`new-post-${p?.threadId}`, () => {
      fetchPosts();
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for new-post-${p?.threadId} is closed`);
    };
  }, []);

  const fetchPosts = async () => {
    getPosts(String(p?.threadId)).then((d: TSinglePost[]) => {
      setPosts(d);
    });
  };
  return (
    <div className="mt-12">
      <div>
        <div className="my-6 flex items-center">
          <h2 className="text-2xl font-bold text-foreground">
            {postData.length} {postData.length === 1 ? "Post" : "Posts"}
          </h2>
        </div>

        {/* Posts/Comments list */}
        <div className="space-y-4 mb-8">
          {postData.map((comment) => (
            <div
              key={comment._id}
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex gap-4">
                {/* Post content */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3 flex items-center gap-3 flex-wrap">
                    <img
                      src={comment.author.picture || "/placeholder.svg"}
                      alt={comment.author.username}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {comment.author.username}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground ml-auto">
                      {moment(comment.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                    {comment.content}
                  </p>
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
        {/*
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
		  */}
      </div>
    </div>
  );
}
