"use server";

import { TUserCredentialPayload } from "@/types/auth/login";
import { cookies } from "next/headers";

export const loginUser = async (data: TUserCredentialPayload) => {
  try {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${SERVER_ADDRESS}/auth/login/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const d = await res.json();
    if (d.success) {
      const ck = await cookies();
      ck.set("token", String(d.data.token), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600 * 1000,
      });
      return d;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
