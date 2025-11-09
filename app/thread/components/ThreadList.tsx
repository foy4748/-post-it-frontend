"use client";
// import React, {useState} from "react"
import { getThreads } from "@/actions/thread/getThreads";
import { socket } from "@/lib/socket";
import { TSingleThread } from "@/types/thread";
import { useEffect, useState } from "react";
import ThreadCard from "./ThreadCard";
import {
  SearchAndFilterThread,
  SearchAndFilterThreadForm,
} from "./SearchAndFilterThreads";
import { useSearchParams } from "next/navigation";
import useCategory from "@/hooks/useCategories";

// type propType = {
//   params: Promise<{
//     threadId: string;
//   }>;
// };

export default function ThreadList() {
  const [threadData, setThreads] = useState<TSingleThread[]>([]);
  const { mappedCategories } = useCategory();
  const s = useSearchParams();
  useEffect(() => {
    fetchThreads(s);
  }, [s]);

  useEffect(() => {
    socket.connect();
    socket.on(`new-thread`, () => {
      fetchThreads(s);
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for new-thread is closed`);
    };
  }, [s]);

  const fetchThreads = async (S: typeof s) => {
    const searchParamsObj = new URLSearchParams(S);
    // if (!searchParamsObj.get("limit")) searchParamsObj.set("limit", "12");
    const queryStr = searchParamsObj.toString();
    console.log("queryStr", queryStr);
    getThreads(queryStr).then((d: TSingleThread[]) => {
      console.log(d);
      setThreads(d);
    });
  };
  return (
    <div className="mt-12">
      <div>
        <div className="my-6 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <h2 className="text-2xl font-bold text-foreground">
              {threadData?.length}{" "}
              {threadData?.length === 1 ? "Thread" : "Threads"}
            </h2>
            {/* Category badge */}
            {s.get("category") ? (
              <div className="inline-block">
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
                  {mappedCategories[String(s.get("category"))]}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <SearchAndFilterThread />
        </div>

        {/* Thread list */}
        <div className="space-y-4 mb-8">
          {threadData?.map((thread) => <ThreadCard thread={thread} />)}
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
