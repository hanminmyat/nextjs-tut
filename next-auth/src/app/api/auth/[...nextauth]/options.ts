import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_Secret as string,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: {
                label: "Username",
                type: "text",
                placeholder: "your-cool-username",
            },
            password: {
                label: "Password:",
                type: "password",
                placeholder: "your-awesome-password"
            }
        },
        async authorize(credentials) {
            // This is where you need to retrieve user data from your userdatabse
            // here I will use with hard-coded
            const user = { id: "42", name: "Dave", password: "nextauth" };
            
            if (credentials?.username == user.name && credentials?.password === user.password) {
                return user
            } else {
                return null
            }
        },
    }),
  ],
};