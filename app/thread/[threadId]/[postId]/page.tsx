import { getComments } from "@/actions/comment/getComments";
import { ISingleComment } from "@/types/comment";
import CommentForm from "./components/CommentForm";
import Comments from "./components/Comments";

type propType = {
  params: Promise<{
    threadId: string;
    postId: string;
  }>;
};

async function SinglePostPage({ params }: propType) {
  const p = await params;
  const comments: ISingleComment[] = await getComments(p.postId);
  return (
    <div>
      <p>{p.threadId}</p>
      <p>{p.postId}</p>
      <CommentForm />
      <Comments comments={comments} />
    </div>
  );
}

export default SinglePostPage;
