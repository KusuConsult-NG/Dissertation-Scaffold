# Dissertation Scaffold (Next.js)

This is a Next.js port of the Dissertation Scaffold application. It includes a modern dashboard for researchers to manage their dissertation progress, analyze trends, find grants, and connect with the community.

## Features

- **Dashboard**: Overview of research trends and insights.
- **Novelty Checker**: AI-powered analysis of research novelty.
- **Literature Review**: Manage and summarize sources with AI.
- **Grant Potential**: Find and analyze grant opportunities.
- **Methodology Builder**: Visual tool for designing research methods.
- **Scholar Connect**: Community feed for researchers.
- **Settings**: Profile and workspace management.

## AI Integration

This project uses Hugging Face Inquiry API for AI features (Novelty Scoring, Literature Summarization, Grant Matching).

To enable AI features, you must set the `HUGGINGFACE_API_KEY` environment variable.

1.  Create a file named `.env.local` in the root directory.
2.  Add your Hugging Face API key:

    ```env
    HUGGINGFACE_API_KEY=hf_your_api_key_here
    ```

    *If you don't have a key, the application will use mock data and heuristic fallbacks so the UI remains functional.*

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/page.tsx`: Landing Page.
- `app/(dashboard)`: Protected dashboard routes (authed layout).
    - `trends`: Research Trends (Default Dashboard View).
    - `grants`: Grant Analysis.
    - `novelty`: Novelty Checker.
    - `literature`: Literature Review.
    - `methodology`: Methodology Builder.
    - `community`: Community Feed.
    - `settings`: User Settings.
- `app/api/ai`: Next.js API Routes for AI features.
