import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";  // Import prisma client (create this in the next step)

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
      
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        // Make sure you're returning the role along with the other user info
        if (user && user.password === credentials.password) {
          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role, // Ensure this is being passed correctly
          };
        }
      
        return null;
      }
      
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;  // Add role to the JWT token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.user.role = token.role;  // Ensure role is added to the session
      return session;
    },
  },
  
  session: {
    strategy: "jwt" as const,
  },
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
