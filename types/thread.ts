import { IUser } from "./auth/user";

export type TSingleThread = {
  _id: string;
  title: string;
  content: string;
  author: IUser;
  createdAt: string;
};
