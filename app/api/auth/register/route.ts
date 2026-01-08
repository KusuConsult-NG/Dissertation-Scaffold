import { NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, state, lga, institution, researchLevel, researchArea } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const newUser = await createUser({
            name,
            email,
            password, // Note: In a real app, hash this password!
            image: null,
            bio: "",
            title: "Researcher",
            plan: "free",
            state: state || "",
            lga: lga || "",
            institution: institution || "",
            researchLevel: researchLevel || "",
            researchArea: researchArea || "",
        });

        if (!newUser) {
            return NextResponse.json(
                { message: "User already exists or failed to create" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
