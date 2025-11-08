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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createThread } from "@/actions/thread/createThread";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategory from "@/hooks/useCategories";

export const FormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Thread title must be at least 5 characters")
    .max(200, "Thread title cannot exceed 200 characters"),

  category: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid category ID format"), // ObjectId validation
  content: z
    .string()
    .min(10, "Thread content must be at least 10 characters")
    .max(10000, "Thread content cannot exceed 10000 characters"),
});
export default function CreateThreadForm() {
  const [, setLoading] = useState(false);
  const { categories } = useCategory();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      title: "",
      category: "",
    },
    mode: "all",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    // console.log(data);
    // Toaster
    toast({
      title: "Posting new thread...",
    });
    try {
      const d = await createThread(data);
      if (d.success) {
        toast({
          title: "Posted Thread Successfully",
        });
      } else {
        toast({
          title: "FAILED posting thread",
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
        title: "Failed to post a thread",
      });
    }
  }

  return (
    <section className="flex justify-center w-full">
      <div className="w-2/3">
        <Form {...form}>
          <h1 className="text-3xl font-bold mb-8">Create a New Thread</h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a thread Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.isArray(categories) &&
                        categories?.map(({ _id, category }) => {
                          return (
                            <SelectItem key={_id} value={_id}>
                              {category}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              <Button className="flex-1" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
