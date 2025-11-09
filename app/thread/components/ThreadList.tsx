"use client";
// import React, {useState} from "react"
import { getThreads } from "@/actions/thread/getThreads";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { TSingleThread } from "@/types/thread";
import { MessageCircle } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import ThreadCard from "./ThreadCard";

// type propType = {
//   params: Promise<{
//     threadId: string;
//   }>;
// };

export default function ThreadList() {
  const [threadData, setThreads] = useState<TSingleThread[]>([]);
  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on(`new-thread`, () => {
      fetchThreads();
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for new-thread is closed`);
    };
  }, []);

  const fetchThreads = async () => {
    getThreads().then((d: TSingleThread[]) => {
      setThreads(d);
    });
  };
  return (
    <div className="mt-12">
      <div>
        <div className="my-6 flex items-center">
          <h2 className="text-2xl font-bold text-foreground">
            {threadData.length} {threadData.length === 1 ? "Thread" : "Threads"}
          </h2>
        </div>

        {/* Thread list */}
        <div className="space-y-4 mb-8">
          {threadData.map((thread) => (
            <ThreadCard thread={thread} />
          ))}
        </div>

        {/* Reply input */}
        {/*
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Thread an Answer</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Share your thoughts or provide an answer..."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              rows={4}
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleThreadReply} disabled={!replyText.trim()}>
                Thread Answer
              </Button>
            </div>
          </div> 
		  */}
      </div>
    </div>
  );
}
