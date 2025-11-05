"use client";
import { getNestedComments } from "@/actions/comment/getNestedComments";
import { TSingleComment, TSingleNestedComment } from "@/types/comment";
import { useParams } from "next/navigation";
import { useState } from "react";

function Comments({ comments }: { comments: TSingleComment[] }) {
  const { postId } = useParams();
  const [replies, setReplies] = useState<TSingleNestedComment[]>([]);
  const loadReplies = async (commentId: string) => {
    const replies: TSingleNestedComment[] = await getNestedComments(
      String(postId),
      commentId,
    );
    setReplies(replies);
  };
  return (
    <>
      {comments?.map((c) => (
        <div key={c._id}>
          <p>{c.content}</p>
          <p onClick={() => loadReplies(c._id)}>Reply</p>
          {replies
            ?.filter((r) => r.parentComment == c._id)
            ?.map((r) => <p>{r.content}</p>)}
        </div>
      ))}
    </>
  );
}

export default Comments;
