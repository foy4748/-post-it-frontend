import { deleteThread } from "@/actions/thread/deleteThread";
import { Button } from "@/components/ui/button";
import { TSingleThread } from "@/types/thread";
import { TrashIcon } from "lucide-react";

function DeleteThread({ thread }: { thread: TSingleThread }) {
  const handleDelete = async () => {
    await deleteThread(thread._id);
  };
  return (
    <Button
      onClick={handleDelete}
      size={"sm"}
      className="bg-red-500 text-white"
    >
      <TrashIcon />
    </Button>
  );
}

export default DeleteThread;
