export interface ISingleComment {
  _id: string;
  content: string;
  parentComment?: string | null;
}

export interface INestedComment extends ISingleComment {
  replies?: INestedComment[];
}
