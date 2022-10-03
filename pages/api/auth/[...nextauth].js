import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from '../../../utils/db.server'

export const authOptions = {
    callbacks: {
        async session({ session, user }) {
            session.user.role = user.role;
            session.user.id = user.id;
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
    ],
    secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);