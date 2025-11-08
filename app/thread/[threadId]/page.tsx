import { getPosts } from "@/actions/post/getPosts";
import { getSingleThread } from "@/actions/thread/getSingleThread";
import { Button } from "@/components/ui/button";
import { TSinglePost } from "@/types/post";
import { TSingleThread } from "@/types/thread";
import Link from "next/link";
import moment from "moment";
import SummarizeButton from "./components/SummarizeButton";

type propType = {
  params: Promise<{
    threadId: string;
  }>;
};

async function SingleThreadPage({ params }: propType) {
  const p = await params;
  const thread: TSingleThread = await getSingleThread(p.threadId);
  const posts: TSinglePost[] = await getPosts(p.threadId);
  return (
    <div>
      <div className="w-full flex justify-end">
        <Link href={`/thread/${p.threadId}/create-post`}>
          <Button className="cursor-pointer">Create a Post +</Button>
        </Link>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Main post */}
        <div className="rounded-lg border border-border bg-card p-6 mb-8">
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

              {/* Content */}
              <p className="mb-6 whitespace-pre-line text-muted-foreground leading-relaxed text-base">
                {thread?.content}
              </p>

              {/* Action buttons */}
              <SummarizeButton />
            </div>
          </div>
        </div>
      </div>

      {posts?.map((post) => (
        <Link key={post?._id} href={`/thread/${p?.threadId}/${post?._id}`}>
          <p>{post?.content}</p>
        </Link>
      ))}
    </div>
  );
}

export default SingleThreadPage;
