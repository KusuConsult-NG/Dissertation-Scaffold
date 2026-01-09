import { NextResponse } from "next/server";
import { getUser } from "@/lib/db-admin";

// DIAGNOSTIC ROUTE - Test if auth backend works
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await getUser(email);

        if (!user) {
            return NextResponse.json({
                success: false,
                reason: "User not found",
                email: email
            });
        }

        if (user.password !== password) {
            return NextResponse.json({
                success: false,
                reason: "Password mismatch",
                email: email
            });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
