"use server";

export const getThreads = async (queryStr?: string) => {
  try {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const url = queryStr
      ? `${SERVER_ADDRESS}/thread/?${queryStr}`
      : `${SERVER_ADDRESS}/thread/`;
    console.log("From getThreads Action", url);
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const d = await res.json();
    return d;
  } catch (error) {
    console.log(error);
    return [];
  }
};
