import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text || text.length < 50) {
            return NextResponse.json(
                { error: "Text is too short for summarization." },
                { status: 400 }
            );
        }

        let summary = "";
        try {
            const result = await hf.summarization({
                model: "facebook/bart-large-cnn",
                inputs: text,
                parameters: {
                    max_length: 130,
                    min_length: 30,
                }
            });
            summary = result.summary_text;
        } catch (apiError) {
            console.warn("HF API failed, using heuristic fallback", apiError);
            // Fallback or Mock
            summary = "AI Summarization unavailable (API Key missing or rate limit). This paper discusses the intersection of ethics and quantum computing, proposing a new framework for policy makers.";
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
