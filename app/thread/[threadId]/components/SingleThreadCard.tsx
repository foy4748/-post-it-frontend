import moment from "moment";
import SummarizeButton from "./SummarizeButton";
import { TSingleThread } from "@/types/thread";

function SingleThreadCard({ thread }: { thread: TSingleThread }) {
  return (
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
  );
}

export default SingleThreadCard;
