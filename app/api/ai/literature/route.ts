import { NextResponse } from "next/server";
import { summarizeText } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text || text.length < 50) {
            return NextResponse.json(
                { error: "Text is too short for summarization." },
                { status: 400 }
            );
        }

        let summary = await summarizeText(text);

        if (!summary) {
            summary = "AI Summarization unavailable (API Key missing or rate limit). This paper discusses key themes in your field.";
        }

        return NextResponse.json({ summary });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate summary." },
            { status: 500 }
        );
    }
}
