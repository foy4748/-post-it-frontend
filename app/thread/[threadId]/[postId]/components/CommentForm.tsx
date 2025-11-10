"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createComment } from "@/actions/comment/createComment";
import { useParams } from "next/navigation";

type propType = {
  parentComment?: string;
};
export const FormSchema = z.object({
  content: z
    .string()
    .min(10, "Thread content must be at least 10 characters")
    .max(5000, "Thread content cannot exceed 10000 characters"),
  parentComment: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid category ID format")
    .optional(), // ObjectId validation
});

function CommentForm({ parentComment }: propType) {
  const [, setLoading] = useState(false);
  const { postId } = useParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parentComment,
      content: "",
    },
    mode: "all",
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    // Toaster
    toast({
      title: "Posting new comment...",
    });
    try {
      const d = await createComment(data, String(postId));
      if (d._id) {
        toast({
          title: "New comment created Successfully",
        });
        form.reset({ content: "" });
      } else {
        toast({
          title: "FAILED to create new comment",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{d.error}</code>
            </pre>
          ),
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "FAILED to create new comment",
      });
    }
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-8">
        {parentComment ? "reply" : "Write a comment"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your comment..."
                    className="pr-16 min-h-[100px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" className="absolute top-12 right-3">
            {parentComment ? "reply" : "Comments"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CommentForm;
