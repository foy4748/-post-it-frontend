import { JwtPayload, jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export default async function proxy(req: NextRequest) {
  let decoded;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production" ? true : false,
  });

  // console.log("FROM Proxy");
  // console.log({ token });
  // console.log({ decoded });

  const isThread = req.nextUrl.pathname.startsWith("/thread");

  try {
    decoded = jwtDecode<JwtPayload>(String(token?.token));
  } catch (error) {
    console.log("Proxy Catch Hit");
    // return NextResponse.rewrite(new URL("/auth/login", req.url));
  }
  const isLoginExpired =
    (decoded?.exp && isNaN(new Date(decoded.exp).getTime())) ||
    new Date() > new Date(String(decoded?.exp));

  if (isThread && (!token || isLoginExpired)) {
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }
  // console.log({ isThread, path: req.nextUrl.pathname });
  return NextResponse.next();
}
