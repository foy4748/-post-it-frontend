"use client";
import { getNestedComments } from "@/actions/comment/getNestedComments";
import { TSingleComment, TSingleNestedComment } from "@/types/comment";
import { useParams } from "next/navigation";
import { useState } from "react";

function Comments({ comments }: { comments: TSingleComment[] }) {
  const { postId } = useParams();
  const [replies, setReplies] = useState<TSingleNestedComment[]>([]);
  const loadReplies = async (commentId: string) => {
    console.log(commentId);
    const replies: TSingleNestedComment[] = await getNestedComments(
      String(postId),
      commentId,
    );
    setReplies((prev) => [...prev, ...replies]);
  };
  return (
    <>
      {comments?.map((c) => (
        <div key={c._id}>
          <p>{c.content}</p>
          <p onClick={() => loadReplies(c._id)}>Reply</p>
          {replies
            ?.filter((r) => r.parentComment == c._id)
            ?.map((r, idx) => {
              return (
                <div key={`${r._id}-${idx}`}>
                  <p>{r.content}</p>
                  <p onClick={() => loadReplies(r._id)}>Reply</p>
                </div>
              );
            })}
        </div>
      ))}
    </>
  );
}

export default Comments;
