"use client";
// import React, {useState} from "react"
import { getPosts } from "@/actions/post/getPosts";
import { socket } from "@/lib/socket";
import { TSinglePost } from "@/types/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

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
          {postData.map((post) => (
            <SinglePost key={post._id} post={post} />
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
