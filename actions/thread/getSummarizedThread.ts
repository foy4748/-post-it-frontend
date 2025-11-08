"use server";

export const getSummarizedThread = async (threadId: string) => {
  try {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/content/summarize/${threadId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const d: { summary: string } = await res.json();
    return d;
  } catch (error) {
    console.log(error);
    return { summary: "" };
  }
};
