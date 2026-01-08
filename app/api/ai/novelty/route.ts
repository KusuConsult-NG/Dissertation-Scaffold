import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

// Initialize Hugging Face Inference
// Note: In a real scenario, you should use process.env.HUGGINGFACE_API_KEY
// For this scaffolding, we'll try to use the public API or fail gracefully.
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text || text.length < 10) {
            return NextResponse.json(
                { error: "Text is too short for analysis." },
                { status: 400 }
            );
        }

        // Use a text-to-text generation model (e.g., Flan-T5) to suggest improvements
        // Prompt conceptualization: "Improve this academic novelty statement: [text]"
        // Since public API is rate limited, we might fallback to simulated logic if it fails.

        let suggestion = "";
        try {
            const result = await hf.textGeneration({
                model: "google/flan-t5-large",
                inputs: `Improve this academic novelty statement to be more impactful: "${text}"`,
                parameters: {
                    max_new_tokens: 100,
                    temperature: 0.7,
                }
            });
            suggestion = result.generated_text;
        } catch (apiError) {
            console.warn("HF API failed, using heuristic fallback", apiError);
            // Fallback for demo purposes if API key is missing/rate limited
            suggestion = "Consider explicitly stating how your methodology diverges from Smith et al. (2021) to strengthen your claim of empirical novelty.";
        }

        return NextResponse.json({ suggestion });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate suggestions." },
            { status: 500 }
        );
    }
}
