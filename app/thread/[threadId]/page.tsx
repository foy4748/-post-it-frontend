import { getPosts } from "@/actions/post/getPosts";
import { TSinglePost } from "@/types/post";

type propType = {
  params: Promise<{
    threadId: string;
  }>;
};

async function SingleThreadPage({ params }: propType) {
  const p = await params;
  const posts: TSinglePost[] = await getPosts(p.threadId);
  return (
    <div>
      <p>{p.threadId}</p>
      {posts.map((p) => (
        <p>{p.content}</p>
      ))}
    </div>
  );
}

export default SingleThreadPage;
