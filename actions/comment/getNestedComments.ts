"use server";

export const getNestedComments = async (postId: string, commentId: string) => {
  try {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(
      `${SERVER_ADDRESS}/comment/${postId}/${commentId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    const d = await res.json();
    return d;
  } catch (error) {
    console.log(error);
    return null;
  }
};
