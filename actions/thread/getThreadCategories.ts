"use server";

import { TThreadCategory } from "@/types/thread";

export const getThreadCategory = async () => {
  try {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/thread/category`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const d: TThreadCategory[] = await res.json();
    const mappedCategory = d.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.category;
        return acc;
      },
      {} as { [key: string]: string },
    );

    return { categoryList: d, mappedCategory };
  } catch (error) {
    console.log(error);
    return { categoryList: [], mappedCategory: [] };
  }
};
