import { IUser } from "./auth/user";

export type TSinglePost = {
  _id: string;
  content: string;
  author: IUser;
  createdAt: string;
};
