import { getComments } from "@/actions/comment/getComments";
import { TSingleComment } from "@/types/comment";
import CommentForm from "./components/CommentForm";

type propType = {
  params: Promise<{
    threadId: string;
    postId: string;
  }>;
};

async function SinglePostPage({ params }: propType) {
  const p = await params;
  const comments: TSingleComment[] = await getComments(p.postId);
  return (
    <div>
      <p>{p.threadId}</p>
      <p>{p.postId}</p>
      <CommentForm />
      {comments?.map((c) => (
        <div>
          {" "}
          <p>{c.content}</p> <CommentForm parentComment={c._id} />
        </div>
      ))}
    </div>
  );
}

export default SinglePostPage;
