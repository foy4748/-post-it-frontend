import { deleteComment } from "@/actions/comment/deleteComment";
import { Button } from "@/components/ui/button";
import { ISingleComment } from "@/types/comment";
import { TrashIcon } from "lucide-react";

function DeleteComment({ comment }: { comment: ISingleComment }) {
  const handleDelete = async () => {
    await deleteComment(comment._id);
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

export default DeleteComment;
