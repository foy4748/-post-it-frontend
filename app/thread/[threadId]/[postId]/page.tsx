import { getComments } from "@/actions/comment/getComments";
import { ISingleComment } from "@/types/comment";
import CommentForm from "./components/CommentForm";
import Comments from "./components/Comments";
import SinglePost from "../components/SinglePost";
import { TSinglePost } from "@/types/post";
import { getSinglePost } from "@/actions/post/getSinglePost";

type propType = {
  params: Promise<{
    threadId: string;
    postId: string;
  }>;
};

async function SinglePostPage({ params }: propType) {
  const p = await params;
  // const comments: ISingleComment[] = await getComments(p.postId);
  const post: TSinglePost = await getSinglePost(p.postId);
  return (
    <div>
      <SinglePost post={post} />
      <CommentForm />
      <Comments />
    </div>
  );
}

export default SinglePostPage;
