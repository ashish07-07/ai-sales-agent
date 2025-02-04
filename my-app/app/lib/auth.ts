import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../db";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password", placeholder: "••••••" },
      },
      async authorize(credentials: any) {
        const email = credentials.email;
        const password = credentials.password;

        const existingUser = await prisma.user.findFirst({
          where: { email },
        });

        if (existingUser) {
          const passwordValidator = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (passwordValidator) {
            return { id: existingUser.id.toString(), email: existingUser.email };
          }
          return null;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
          const user = await prisma.user.create({
            data: { email, password: hashedPassword },
          });

          return { id: user.id.toString(), email: user.email };
        } catch (e) {
          console.error("Error creating user:", e);
          return null;
        }
      },
    }),

    GitHubProvider({
        clientId: process.env.GITHUB_ID|| "",
        clientSecret: process.env.GITHUB_SECRET|| ""
      })
    
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ token, session }: any) {
      if (token) {
        session.user = {
          id: token.sub,
          email: token.email,
        };
        // session.role = "rider"; // Consider making this dynamic
      }
      return session;
    },
  },
};
