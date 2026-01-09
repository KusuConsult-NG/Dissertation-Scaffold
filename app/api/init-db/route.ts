import { NextResponse } from "next/server";
import { createUser } from "@/lib/db-admin";

// CRITICAL: firebase-admin requires Node.js runtime
export const runtime = 'nodejs';

export async function POST() {
    try {
        // Create default user using Admin SDK to bypass security rules
        const existingUser = await createUser({
            email: "user@example.com",
            name: "Dr. Researcher",
            password: "password",
            image: null,
            bio: "Researching the intersection of quantum computing mechanics and ethical policy frameworks.",
            title: "Postdoctoral Fellow, Quantum Ethics",
            plan: "free",
        });

        return NextResponse.json({
            success: true,
            message: "Default user initialized in Firestore",
            user: existingUser
        });
    } catch (error) {
        console.error("[Init] Error:", error);
        return NextResponse.json(
            { error: "Failed to initialize user" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Use POST to initialize default user in Firestore"
    });
}
