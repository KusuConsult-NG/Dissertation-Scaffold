import { NextResponse } from "next/server";
import { createUser } from "@/lib/db";
import { userRegisterSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const validationResult = userRegisterSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid request data",
                    errors: validationResult.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        const { name, email, password, state, lga, institution, researchLevel, researchArea } = validationResult.data;

        const newUser = await createUser({
            name,
            email,
            password, // In a real app, hash this password!
            image: null,
            bio: "",
            title: "Researcher",
            plan: "free",
            state,
            lga,
            institution,
            researchLevel,
            researchArea,
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
