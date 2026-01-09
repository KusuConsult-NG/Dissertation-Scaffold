import { NextResponse } from "next/server";
import { generateText } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text || text.length < 10) {
            return NextResponse.json(
                { error: "Text is too short for analysis." },
                { status: 400 }
            );
        }

        // Use Mistral for actionable advice
        const prompt = `[INST] Enhance this academic novelty statement to be more impactful and intellectually rigorous.
Statement: "${text}"

Provide 2-3 specific improvements or a rewritten version. [/INST]
Suggestions:`;

        let suggestion = await generateText(prompt, 150);

        if (!suggestion) {
            suggestion = "Consider explicitly stating how your methodology diverges from recent studies (2024-2025) to strengthen your claim.";
        }

        return NextResponse.json({ suggestion: suggestion.trim() });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate suggestions." },
            { status: 500 }
        );
    }
}
