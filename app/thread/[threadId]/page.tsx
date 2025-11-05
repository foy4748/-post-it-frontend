import { getPosts } from "@/actions/post/getPosts";
import { TSinglePost } from "@/types/post";
import Link from "next/link";

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
      {posts.map((post) => (
        <Link key={post._id} href={`/thread/${p.threadId}/${post._id}`}>
          <p>{post.content}</p>
        </Link>
      ))}
    </div>
  );
}

export default SingleThreadPage;
