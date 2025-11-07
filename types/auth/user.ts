enum UserRole {
  user = "user",
  moderator = "moderator",
  admin = "admin",
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  picture: string;
}
