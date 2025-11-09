import { getThreads } from "@/actions/thread/getThreads";
import { TSingleThread } from "@/types/thread";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThreadCard from "./components/ThreadCard";
import ThreadList from "./components/ThreadList";

async function ThreadsPage() {
  const threads: TSingleThread[] = await getThreads();
  return (
    <>
      <div className="mx-auto max-w-6xl px-8 py-4">
        <div className="flex justify-end mb-8 ">
          <Link href={"/thread/create"}>
            <Button className="cursor-pointer">Create a New thread +</Button>
          </Link>
        </div>
        <ThreadList />
      </div>
    </>
  );
}

export default ThreadsPage;
