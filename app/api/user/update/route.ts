import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// CRITICAL: getServerSession requires Node.js runtime for firebase-admin
export const runtime = 'nodejs';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Validate image if present
        if (body.image && body.image.length > 2 * 1024 * 1024) {
            return NextResponse.json({ error: "Image too large. Maximum size is 1MB." }, { status: 400 });
        }

        // Update user in Firestore (using setDoc with merge to handle non-existent docs)
        const userRef = doc(db, "users", session.user.email);

        const updates: any = {
            updatedAt: new Date().toISOString(),
        };

        if (body.name !== undefined) updates.name = body.name;
        if (body.bio !== undefined) updates.bio = body.bio;
        if (body.title !== undefined) updates.title = body.title;
        if (body.image !== undefined) updates.image = body.image;
        if (body.notifications !== undefined) updates.notifications = body.notifications;
        if (body.theme !== undefined) updates.theme = body.theme;

        // Use setDoc with merge instead of updateDoc to handle non-existent documents
        await setDoc(userRef, updates, { merge: true });

        // Get updated user data
        const updatedDoc = await getDoc(userRef);
        const userData = updatedDoc.data();

        return NextResponse.json({ user: userData, success: true });
    } catch (error: any) {
        console.error("Update user error:", error);
        return NextResponse.json({
            error: "Failed to update profile",
            details: error.message
        }, { status: 500 });
    }
}
