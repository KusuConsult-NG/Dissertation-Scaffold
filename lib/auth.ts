import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/lib/db-admin";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.error("[Auth] Missing credentials");
                        return null;
                    }

                    const user = await getUser(credentials.email);

                    if (!user) {
                        console.error("[Auth] User not found:", credentials.email);
                        return null;
                    }

                    if (user.password !== credentials.password) {
                        console.error("[Auth] Password mismatch for:", credentials.email);
                        return null;
                    }

                    console.log("[Auth] Login successful for:", credentials.email);
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image || null,
                        plan: user.plan,
                    };
                } catch (error) {
                    console.error("[Auth] Error in authorize:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // On sign in, merge user data into token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.plan = user.plan;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.plan = token.plan as string;
                session.user.image = token.picture as string | null;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    useSecureCookies: process.env.NODE_ENV === "production",
    debug: true, // Enable debug mode to see what's happening
};
