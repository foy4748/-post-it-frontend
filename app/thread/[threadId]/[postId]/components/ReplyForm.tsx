"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  content: z
    .string()
    .min(10, "Thread content must be at least 10 characters")
    .max(5000, "Thread content cannot exceed 10000 characters"),
});

export default function ReplyForm({ onSubmit }: { onSubmit: Function }) {
  // const [content, setContent] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
    // mode: "all",
  });

  const handleSubmission = (data: { content: string }) => {
    onSubmit(data.content);
  };

  return (
    <Form {...form}>
      <form
        className="md:ml-8 relative"
        onSubmit={form.handleSubmit(handleSubmission)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write your reply..."
                  className="pr-16 min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="absolute right-3 bottom-3" type="submit">
          Reply
        </Button>
      </form>
    </Form>
  );
}
