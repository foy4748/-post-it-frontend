import { getSingleThread } from "@/actions/thread/getSingleThread";
import { Button } from "@/components/ui/button";
import { TSingleThread } from "@/types/thread";
import Link from "next/link";
import PostList from "./components/PostList";
import SingleThreadCard from "./components/SingleThreadCard";
import CreatePostForm from "./components/CreatePostForm";

type propType = {
  params: Promise<{
    threadId: string;
  }>;
};

async function SingleThreadPage({ params }: propType) {
  const p = await params;
  const thread: TSingleThread = await getSingleThread(p.threadId);
  // const posts: TSinglePost[] = await getPosts(p.threadId);
  return (
    <div>
      <div className="mx-auto max-w-6xl px-8 py-4">
        {/* Main post / Thread */}
        <SingleThreadCard thread={thread} />
        {/* Post Creation Form */}
        <CreatePostForm />
        {/* Post List */}
        <PostList />
      </div>

      {/* posts?.map((post) => (
        <Link key={post?._id} href={`/thread/${p?.threadId}/${post?._id}`}>
        </Link>
      )) */}
    </div>
  );
}

export default SingleThreadPage;
