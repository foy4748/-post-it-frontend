import { IUser } from "./auth/user";

export type TSinglePost = {
  _id: string;
  content: string;
  thread: string;
  author: IUser;
  isFlagged?: boolean;
  createdAt: string;
};
