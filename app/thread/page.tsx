import { getThreads } from "@/actions/thread/getThreads";
import { TSingleThread } from "@/types/thread";
import Link from "next/link";

async function ThreadsPage() {
  const threads: TSingleThread[] = await getThreads();
  return (
    <div>
      {threads.map((t) => {
        return <Link href={`/thread/${t._id}`}>{t.title}</Link>;
      })}
    </div>
  );
}

export default ThreadsPage;
