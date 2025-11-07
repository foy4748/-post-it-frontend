"use client";
import { ISingleComment, INestedComment } from "@/types/comment";
import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useParams } from "next/navigation";
import { socket } from "@/lib/socket";
import { getComments } from "@/actions/comment/getComments";

// function Comments({ comments }: { comments: ISingleComment[] }) {
function Comments() {
  const [comments, setComments] = useState<ISingleComment[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    getComments(String(postId)).then((d: ISingleComment[]) => {
      setComments((prev) => [...prev, ...d]);
    });
  }, []);

  useEffect(() => {
    socket.on(`new-comment-${postId}`, (data: ISingleComment) => {
      console.log("FROM socket", data);
      setComments((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for new-commnet-${postId} is closed`);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Comments Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Comments ({comments?.length})
        </h2>
      </div>

      {/* New Comment Form */}

      {/* Comments List */}
      <div className="space-y-4">
        {comments?.length == 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No comments yet</p>
            <p className="text-sm mt-2">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments?.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={String(postId)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
