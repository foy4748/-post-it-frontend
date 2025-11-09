import { loginUser } from "@/actions/auth/loginUser";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
const authOptions: AuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Log In",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const payload = {
          email: String(credentials?.email),
          password: String(credentials?.password),
        };
        const d = await loginUser(payload);
        console.log("From authOptions authorize");
        console.log(d);
        if (d.success) {
          // Any object returned will be saved in `user` property of the JWT
          // delete d["token"];
          return d.data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user: User }) => {
      if (User) {
        const { user } = User || {};
        token.token = String(User?.token);
        token._id = String(user?._id);
        token.username = user?.username ? String(user?.username) : "";
        token.email = user?.email ? String(user?.email) : ""; // Add this line
        token.picture = user?.picture ? String(user?.picture) : "";
        token.role = user?.role;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // Create the user object structure that matches your User interface
      session.user = {
        id: String(token?._id),
        user: {
          id: String(token?._id),
          _id: String(token?._id),
          username: String(token?.username),
          picture: token?.picture ? String(token?.picture) : null,
          email: String(token?.email), // Make sure this exists
          role: String(token?.role),
        },
        token: String(token?.token),
      };
      return session;
    },
  },
};

export default authOptions;

/*
    jwt: async ({ token, user: User }) => {
      // Add additional fields to the token
      if (User) {
        const { user } = User || {};
        console.log("From authOptions jwt");
        console.log(user);
        token.token = String(User?.token);
        token._id = String(user?._id);
        token.username = user?.username ? String(user?.username) : "";
        token.image_url = user?.picture ? String(user?.picture) : "";
        token.role = user?.role;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      // Add additional fields to the session object
      session.user.token = String(token?.token);
      session.user.user._id = String(token?._id);
      session.user.user.username = String(token?.username);
      session.user.user.picture = token?.picture
        ? String(token?.picture)
        : null;
      session.user.user.role = String(token?.role);
      return session;
    },
*/
