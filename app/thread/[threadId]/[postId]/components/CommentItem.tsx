"use client";
import { ISingleComment } from "@/types/comment";
import { useState } from "react";
import ReplyForm from "./ReplyForm";
import { useSession } from "next-auth/react";

const CommentItem = ({
  comment,
  postId,
  depth = 0,
}: {
  comment: ISingleComment;
  postId: string;
  depth?: number;
}) => {
  const [replies, setReplies] = useState<ISingleComment[]>([]);
  const { data } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchReplies = async () => {
    console.log("Fetching replies");
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/${postId}/${comment._id}`,
    );
    const data = await res.json();
    setReplies(data);
    setLoading(false);
  };

  const handleReply = async (content: string) => {
    console.log({ content });
    if (content && content.length) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: String(data?.user.token),
          },
          body: JSON.stringify({
            content,
            postId,
            parentComment: comment._id,
          }),
        },
      );
      const result = await res.json();
      console.log(result);
      fetchReplies(); // Refresh replies
    }
    // setShowReplyForm(false);
  };

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <p>{comment.content}</p>

      <button
        onClick={() => {
          setShowReplyForm(!showReplyForm);
          if (replies.length === 0) fetchReplies();
        }}
      >
        {isLoading ? "Loading..." : "Reply"}
      </button>

      {showReplyForm && <ReplyForm onSubmit={handleReply} />}

      {replies.map((reply) => (
        <CommentItem
          key={reply._id}
          comment={reply}
          postId={postId}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};
export default CommentItem;
