import { deletePost } from "@/actions/post/deletePost";
import { Button } from "@/components/ui/button";
import { TSinglePost } from "@/types/post";
import { TrashIcon } from "lucide-react";

function DeletePost({ post }: { post: TSinglePost }) {
  const handleDelete = async () => {
    await deletePost(post._id);
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

export default DeletePost;
