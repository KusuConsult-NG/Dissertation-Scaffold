import { HfInference } from "@huggingface/inference";

// Initialize the client
// You can get a free token at https://huggingface.co/settings/tokens
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const AI_MODELS = {
    summarization: "facebook/bart-large-cnn",
    reasoning: "mistralai/Mistral-7B-Instruct-v0.2",
    general: "google/flan-t5-large",
};

/**
 * Robust text generation helper that handles basic errors.
 */
export async function generateText(prompt: string, maxTokens = 200) {
    if (!process.env.HUGGINGFACE_API_KEY) {
        console.warn("[AI] HUGGINGFACE_API_KEY is missing. Returning mock response.");
        return null;
    }

    try {
        const result = await hf.textGeneration({
            model: AI_MODELS.reasoning,
            inputs: prompt,
            parameters: {
                max_new_tokens: maxTokens,
                temperature: 0.7,
                return_full_text: false, // Only return the new content
            },
        });
        return result.generated_text;
    } catch (error) {
        console.error("[AI] Text generation failed:", error);
        return null;
    }
}

/**
 * Robust summarization helper.
 */
export async function summarizeText(text: string) {
    if (!process.env.HUGGINGFACE_API_KEY) {
        console.warn("[AI] HUGGINGFACE_API_KEY is missing. Returning mock response.");
        return null;
    }

    try {
        const result = await hf.summarization({
            model: AI_MODELS.summarization,
            inputs: text,
            parameters: {
                max_length: 130,
                min_length: 30,
            },
        });
        return result.summary_text;
    } catch (error) {
        console.error("[AI] Summarization failed:", error);
        return null;
    }
}
