"use client";

// const SERVER_ADDRESS = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
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
import Link from "next/link";
import { uploadPhoto } from "@/actions/uploadPhoto";
import { registerUser } from "@/actions/auth/registerUser";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 0.9 * 1024 * 1024; // 900 KB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  // image: z.string(),
  image: z
    .instanceof(File, { message: "Please select an image file." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    })
    .optional(),
  picture: z.string(),
});

export default function RegisterPageView() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      image: undefined,
      picture: "",
    },
    mode: "all",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const photoFile = new FormData();
    const file = data["image"];
    photoFile.append("image", file as string | Blob);
    console.log("FROM FILE", file, photoFile);
    let picture = await uploadPhoto(photoFile);
    if (!Boolean(picture))
      picture = "https://i.ibb.co.com/Nnt2N26/user-placeholder.png";
    // Toaster
    console.log(picture);
    data["picture"] = String(picture);
    // data["role"] = "user";
    console.log(data);
    const d = await registerUser(data);
    if (d.success) {
      router.push("/");
      toast({
        title: "Account Creation was successful",
        description: `Now check your email ${data.email} to activate your account`,
      });
      form.reset();
    } else {
      toast({
        title: "Something went wrong",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(d)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <section className="flex justify-center w-full">
      <div className="w-2/3">
        <Form {...form}>
          <h1 className="text-3xl font-bold mb-8">Registration Form</h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type={"email"}
                      {...field}
                      placeholder="example@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type={"password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Pic URL</FormLabel>
                  <FormControl>
                    <Input type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
			*/}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Pic</FormLabel>
                  <FormControl>
                    <Input
                      type={"file"}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p>
              Already have an account? Please,{" "}
              <Link className="text-link" href="/login">
                Login
              </Link>{" "}
              .
            </p>

            <div className="flex">
              <Button className="flex-1" type="submit">
                Submit
              </Button>
            </div>
            {/* <p>{JSON.stringify(form.formState.errors)}</p> */}
          </form>
        </Form>
      </div>
    </section>
  );
}
