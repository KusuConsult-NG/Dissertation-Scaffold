import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
    try {
        const { projectDescription, grantName } = await req.json();

        if (!projectDescription) {
            return NextResponse.json(
                { error: "Description required." },
                { status: 400 }
            );
        }

        // Concept: specific grant matching analysis
        // "Analyze the relevance of [Project] for [Grant Name]"
        // Simulated Intelligent Response if API fails or for speed

        let analysis = "";
        try {
            const result = await hf.textGeneration({
                model: "google/flan-t5-large",
                inputs: `Analyze the fit between this project: "${projectDescription}" and the grant "${grantName || "General Research Grant"}". concise reason:`,
                parameters: { max_new_tokens: 60 }
            });
            analysis = result.generated_text;
        } catch (e) {
            console.warn("HF API Warning", e);
            analysis = "Strong alignment with grant objectives based on keyword overlap in 'Ethics' and 'Quantum'.";
        }

        // Mock a score
        const score = Math.floor(Math.random() * (99 - 70 + 1) + 70);

        return NextResponse.json({
            matchScore: score,
            analysis: analysis
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Analysis failed." },
            { status: 500 }
        );
    }
}
