import { IUser } from "./auth/user";

export type TThreadCategory = {
  _id: string;
  category: string;
};
export type TSingleThread = {
  _id: string;
  title: string;
  content: string;
  category: TThreadCategory;
  author: IUser;
  createdAt: string;
};
