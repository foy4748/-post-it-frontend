"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { ISingleComment } from "@/types/comment";
import { useEffect, useState } from "react";
import ReplyForm from "./ReplyForm";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";
import moment from "moment";
import { cn } from "@/lib/utils";
import DeleteComment from "./DeleteComment";

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
  const [isFlagged, setIsFlagged] = useState(false);

  const fetchReplies = async () => {
    console.log("Fetching replies");
    setLoading(true);
    if (comment._id) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/${postId}/${comment._id}`,
      );
      const data = await res.json();
      setReplies(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    socket.connect();
    socket.on(`new-comment-${postId}-${comment._id}`, () => {
      fetchReplies();
    });

    // Checking Flagged Comments
    socket.on(`explicit-comment-${comment._id}`, () => {
      console.log(`explicit-post-${comment._id}`);
      setIsFlagged(true);
    });

    socket.on(`delete-comment`, () => {
      fetchReplies();
    });

    return () => {
      socket.disconnect();
      console.log(`Socket for new-comment-${postId}-${comment._id} is closed`);
    };
  }, []);

  const handleReply = async (content: string) => {
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
      await res.json();
      // console.log(result);
      fetchReplies(); // Refresh replies
    }
    setShowReplyForm(false);
  };

  // style={{ marginLeft: depth * 20 }}
  return (
    <div
      className={cn(
        `ml-${depth * 20} border-l-2 border-gray-200 dark:border-gray-800 p-4 rounded-lg`,
        {
          "border-l-3 border-red-500 hover:border-red-700":
            isFlagged || comment.isFlagged === true,
        },
      )}
    >
      {/* <p>{comment.content}</p> */}

      <div className="flex items-start space-x-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.user.picture} alt={comment.user.username} />
          <AvatarFallback>{comment.user.username}</AvatarFallback>
        </Avatar>
        <div className="space-y-2 w-full text-sm">
          <div className="flex items-center w-full justify-between space-x-2">
            <div>
              <div className="font-semibold">AC</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {moment(comment.createdAt).fromNow()}
              </div>
            </div>
            <div>
              {(isFlagged || comment.isFlagged === true) && (
                <Button size={"sm"} className="bg-red-500 text-white">
                  Flagged
                </Button>
              )}
              {comment.user._id == data?.user.id && (
                <DeleteComment comment={comment} />
              )}
            </div>
          </div>
          <div>
            <p>{comment.content}</p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            {/*
            <Button variant="ghost" className="p-1 rounded-full">
              <ThumbsUpIcon className="w-3 h-3.5" />
              <div /> Like
            </Button> 
			*/}
            {/*
            <Button variant="ghost" size="none" className="p-1 rounded-full">
              <ThumbsDownIcon className="w-3 h-3.5" />
              <div /> Dislike
            </Button>
			*/}
            <Button
              variant="ghost"
              className="p-1 rounded-full"
              onClick={() => {
                setShowReplyForm(!showReplyForm);
                if (replies.length === 0) fetchReplies();
              }}
            >
              <ChevronDownIcon className="w-3 h-3.5" />
              Reply
            </Button>
          </div>
        </div>
      </div>

      {/*
      <button
        onClick={() => {
          setShowReplyForm(!showReplyForm);
          if (replies.length === 0) fetchReplies();
        }}
      >
        {isLoading ? "Loading..." : "Reply"}
      </button>

	  */}
      {showReplyForm && <ReplyForm onSubmit={handleReply} />}

      {replies?.map((reply) => (
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

function ChevronDownIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ThumbsDownIcon() {
  return (
    <svg
      // {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg
      // {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
export default CommentItem;
