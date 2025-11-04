"use server";
import { FormSchema } from "@/app/thread/create/components/CreateThreadForm";
import { cookies } from "next/headers";
import z from "zod";

export const createThread = async (payload: z.infer<typeof FormSchema>) => {
  try {
    const c = await cookies();
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/thread/`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: String(c.get("token")?.value),
      },
      credentials: "include",
    });
    const d = await res.json();
    return d;
  } catch (error) {
    console.log(error);
    return null;
  }
};
