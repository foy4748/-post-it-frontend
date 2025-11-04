"use server";

export const getPosts = async (threadId: string) => {
  try {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/post/${threadId}`, {
      headers: {
        "Content-Type": "application/json",
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
