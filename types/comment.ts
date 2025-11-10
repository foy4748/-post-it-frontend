import { IUser } from "./auth/user";

export interface ISingleComment {
  _id: string;
  content: string;
  post: string;
  parentComment?: string | null;
  isFlagged?: boolean;
  user: IUser;
  createdAt: string;
}

// export interface INestedComment extends ISingleComment {
//   replies?: INestedComment[];
// }
