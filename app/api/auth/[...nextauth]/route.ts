import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = getUser(credentials.email);

                if (user && user.password === credentials.password) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        plan: user.plan,
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id;
                session.user.plan = token.plan;
                session.user.image = token.picture;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.plan = user.plan;
                token.picture = user.image;
            }

            // Support for session.update()
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name;
                if (session.image) token.picture = session.image;
                if (session.plan) token.plan = session.plan;
            }

            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
