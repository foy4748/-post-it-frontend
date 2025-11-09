"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { createPost } from "@/actions/post/createPost";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export const FormSchema = z.object({
  content: z
    .string()
    .min(10, "Thread content must be at least 10 characters")
    .max(5000, "Thread content cannot exceed 10000 characters"),
});
export default function CreatePostForm() {
  const [loading, setLoading] = useState(false);
  const { threadId } = useParams();
  console.log(threadId);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // mode: "all",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    // console.log(data);
    // Toaster
    toast({
      title: "Posting new thread...",
    });
    try {
      const d = await createPost(data, String(threadId));
      if (d._id) {
        toast({
          title: "New Post created Successfully",
        });
        form.reset({ content: "" });
        setLoading(false);
      } else {
        toast({
          title: "FAILED to create new post",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{d.error}</code>
            </pre>
          ),
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create new post",
      });
      setLoading(false);
    }
  }

  return (
    <section className="flex justify-center w-full">
      <div className="w-full">
        <Form {...form}>
          <h1 className="text-3xl font-bold mb-8">Create a New Post</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block my-5">Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              <Button disabled={loading} className="flex-1" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
