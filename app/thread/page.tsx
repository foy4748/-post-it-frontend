import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThreadList from "./components/ThreadList";
// import { Suspense } from "react";

async function ThreadsPage() {
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
