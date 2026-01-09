import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!adminAuth) {
            console.error("Firebase Admin not initialized. Check server logs.");
            return NextResponse.json({ error: "Server Configuration Error: Firebase Admin not accessible" }, { status: 500 });
        }

        // We use the email or a consistent ID to link NextAuth user to Firebase Auth user
        // Ideally use session.user.id if available and consistent
        // For now, let's assume email is unique and we can use it (or the ID)

        const uid = session.user.id || session.user.email;

        // Mint custom token
        const customToken = await adminAuth.createCustomToken(uid, {
            plan: session.user.plan || "free", // Add claims if needed
        });

        return NextResponse.json({ token: customToken });
    } catch (error: any) {
        console.error("Error minting token:", error);

        // Check for specific Firebase Admin errors
        if (error.code === 'auth/invalid-credential') {
            return NextResponse.json({
                error: "Firebase Service Account Key is invalid or missing. Check env vars."
            }, { status: 500 });
        }

        return NextResponse.json({
            error: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}
