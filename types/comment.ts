export type TSingleComment = {
  _id: string;
  content: string;
};

export type TSingleNestedComment = {
  _id: string;
  content: string;
  parentComment: string;
};
