import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUser } from "@/lib/db";

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

        const updatedUser = updateUser(session.user.email, body);

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
