"use server";
import { FormSchema } from "@/app/thread/[threadId]/components/CreatePostForm";
import { cookies } from "next/headers";
import z from "zod";

export const createPost = async (
  payload: z.infer<typeof FormSchema>,
  threadId: string,
) => {
  try {
    const c = await cookies();
    // console.log({
    //   authorization: String(c.get("token")?.value),
    // });
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/post/${threadId}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: String(c.get("token")?.value),
      },
      credentials: "include",
    });
    const d = await res.json();
    // console.log(d);
    return d;
  } catch (error) {
    console.log(error);
    return null;
  }
};
