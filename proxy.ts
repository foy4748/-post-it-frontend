import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export default async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" ? true : false,
  });
  const isThread = req.nextUrl.pathname.startsWith("/thread");
  console.log("FROM Proxy");
  console.log(token);
  // console.log({ isThread, path: req.nextUrl.pathname });
  return NextResponse.next();
}
