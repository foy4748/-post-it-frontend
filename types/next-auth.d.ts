// types/next-auth.d.ts
/* eslint @typescript-eslint/no-unused-vars : off */
import NextAuth from "next-auth";
import JWT from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    user: {
      id: string;
      _id: string;
      username: string;
      picture: string | null | undefined;
      email: string;
      role: string;
      // expire_login: string | number | Date;
    };
    token: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    _id: string;
    username: string;
    picture: string;
    email: string;
    role: string;
    // expire_login: string | number | Date;
  }
}
