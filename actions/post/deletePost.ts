"use server";

import { cookies } from "next/headers";

export const deletePost = async (postId: string) => {
  try {
    const c = await cookies();
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/post/${postId}`, {
      method: "DELETE",
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
