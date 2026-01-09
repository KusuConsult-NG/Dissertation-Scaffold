import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DIAGNOSTIC ROUTE - Remove after debugging
export const runtime = 'nodejs';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        return NextResponse.json({
            hasSession: !!session,
            session: session,
            timestamp: new Date().toISOString(),
            env: {
                hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
                hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
                nextAuthUrl: process.env.NEXTAUTH_URL,
                hasFirebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
                nodeEnv: process.env.NODE_ENV,
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            stack: error.stack,
        }, { status: 500 });
    }
}
