import { NextResponse } from "next/server";
import { initializeDefaultUser } from "@/lib/firestore";

export async function POST() {
    try {
        await initializeDefaultUser();
        return NextResponse.json({
            success: true,
            message: "Default user initialized in Firestore"
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
