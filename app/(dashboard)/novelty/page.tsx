"use client";

import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    ArrowUp,
    AlertCircle,
    GitBranch,
    CheckCircle,
    PlusCircle,
    Sparkles,
    RefreshCw,
    Brain,
    Rocket,
} from "lucide-react";
import { toast } from "sonner";

export default function NoveltyPage() {
    const [statement, setStatement] = useState("");
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAiAnalysis = async () => {
        if (!statement) return;
        setLoading(true);
        const toastId = toast.loading("Analyzing novelty...");
        try {
            const res = await fetch("/api/ai/novelty", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: statement }),
            });
            if (!res.ok) throw new Error("Analysis failed");
            const data = await res.json();
            if (data.suggestion) {
                setSuggestion(data.suggestion);
                toast.success("Analysis complete", { id: toastId });
            } else {
                toast.dismiss(toastId);
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to analyze text", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Project" },
                    { label: "Research Novelty", href: "/novelty" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-20">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col gap-2 min-w-0">
                            <h1 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight truncate">
                                Research Novelty
                            </h1>
                            <p className="text-[#616f89] dark:text-gray-400 text-base max-w-2xl">
                                Define and visualize the unique contribution of your dissertation.
                                Ensure your work fills a distinct gap in existing literature.
                            </p>
                        </div>
                        {/* Impact Scorecards */}
                        <div className="flex gap-4 flex-shrink-0">
                            <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441] min-w-[140px]">
                                <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1 truncate">
                                    Impact Score
                                </p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-[#111318] dark:text-white">
                                        8.5
                                    </span>
                                    <span className="text-green-500 text-xs font-medium mb-1 flex items-center truncate">
                                        <ArrowUp className="w-3.5 h-3.5 mr-1" /> High
                                    </span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441] min-w-[140px]">
                                <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1 truncate">
                                    Citation Potential
                                </p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold text-[#111318] dark:text-white">
                                        92%
                                    </span>
                                    <span className="text-primary text-xs font-medium mb-1 truncate">
                                        Top Tier
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Visualization & Core Arguments */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Research Gap Visualizer Card */}
                            <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-[#f0f2f4] dark:border-[#2a3441] flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                                        The Research Gap
                                    </h3>
                                    <button className="text-primary text-sm font-medium hover:underline">
                                        Edit Diagram
                                    </button>
                                </div>
                                <div className="relative w-full h-80 bg-[#f8f9fc] dark:bg-[#101622] flex items-center justify-center overflow-hidden">
                                    {/* Abstract Venn Diagram Representation via CSS/Placeholder */}
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUKvrBGRvkOtuJQSM4dqwRRgLT3iXVIO0YLx2yvLCpR2qdMP9w1fkZsPgr0H6D5PrMhNqPIlHtdb3lcao3tzFx7u9ntmlc0affeu1N1fb7A1CIT9le21H18Oo3EPzBAMHzxmQywGdqybhBZJLRK3n60mVhIdix2dVJPVK9r6g1V6Qp1dYKf8sui8y7tngcgf8BuwFMAwzRJEp206q5CJeBpFRfx_5eIhu2_42G4A5dAhbr8KIyfeY3-GvmmIzSC1SSkV3Jo_McK-A")',
                                        }}
                                    />
                                    {/* Floating Label Overlay (Simulated UI) */}
                                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-[#1a2230]/90 backdrop-blur-sm p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm max-w-sm">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            <span className="text-xs font-bold text-[#111318] dark:text-white">
                                                Identified Gap
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#616f89] dark:text-gray-400">
                                            Intersection of Ethics, Quantum Mechanics, and Policy not
                                            currently addressed in peer-reviewed journals post-2023.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Core Arguments Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Problem */}
                                <div className="bg-white dark:bg-[#1a2230] p-5 rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-[#111318] dark:text-white">
                                            The Problem
                                        </h4>
                                        <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1">
                                            Current ethical frameworks fail to account for
                                            non-deterministic computing outcomes.
                                        </p>
                                    </div>
                                </div>
                                {/* Method */}
                                <div className="bg-white dark:bg-[#1a2230] p-5 rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
                                        <GitBranch className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-[#111318] dark:text-white">
                                            The Method
                                        </h4>
                                        <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1">
                                            A comparative longitudinal study of 50 quantum labs using
                                            a new ethical rubric.
                                        </p>
                                    </div>
                                </div>
                                {/* Outcome */}
                                <div className="bg-white dark:bg-[#1a2230] p-5 rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm flex flex-col gap-3 group hover:border-primary/30 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-[#111318] dark:text-white">
                                            The Outcome
                                        </h4>
                                        <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1">
                                            A standardized policy framework adoptable by international
                                            oversight bodies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Literature Comparison Table */}
                            <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm p-6">
                                <h3 className="text-lg font-bold text-[#111318] dark:text-white mb-4">
                                    Literature vs. Contribution
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-[#616f89] dark:text-gray-400 uppercase bg-background-light dark:bg-[#101622] rounded-lg">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg">Dimension</th>
                                                <th className="px-4 py-3">Existing Literature</th>
                                                <th className="px-4 py-3 rounded-r-lg">
                                                    Proposed Contribution
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#f0f2f4] dark:divide-[#2a3441]">
                                            <tr className="hover:bg-background-light/50 dark:hover:bg-[#101622]/50 transition-colors">
                                                <td className="px-4 py-4 font-medium text-[#111318] dark:text-white">
                                                    Scope
                                                </td>
                                                <td className="px-4 py-4 text-[#616f89] dark:text-gray-400">
                                                    Limited to classical computing ethics
                                                </td>
                                                <td className="px-4 py-4 text-primary font-medium flex items-center gap-2">
                                                    <PlusCircle className="w-4 h-4" />
                                                    Extends to Quantum Paradigm
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-background-light/50 dark:hover:bg-[#101622]/50 transition-colors">
                                                <td className="px-4 py-4 font-medium text-[#111318] dark:text-white">
                                                    Methodology
                                                </td>
                                                <td className="px-4 py-4 text-[#616f89] dark:text-gray-400">
                                                    Theoretical / Philosophy only
                                                </td>
                                                <td className="px-4 py-4 text-primary font-medium flex items-center gap-2">
                                                    <PlusCircle className="w-4 h-4" />
                                                    Empirical & Data-Driven
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-background-light/50 dark:hover:bg-[#101622]/50 transition-colors">
                                                <td className="px-4 py-4 font-medium text-[#111318] dark:text-white">
                                                    Target Audience
                                                </td>
                                                <td className="px-4 py-4 text-[#616f89] dark:text-gray-400">
                                                    Academics & Philosophers
                                                </td>
                                                <td className="px-4 py-4 text-primary font-medium flex items-center gap-2">
                                                    <PlusCircle className="w-4 h-4" />
                                                    Policymakers & Practitioners
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Editor & AI Assistant */}
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            {/* Novelty Statement Editor */}
                            <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm flex flex-col h-full min-h-[500px]">
                                <div className="p-5 border-b border-[#f0f2f4] dark:border-[#2a3441]">
                                    <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                                        Novelty Statement
                                    </h3>
                                    <p className="text-xs text-[#616f89] dark:text-gray-400 mt-1">
                                        Draft the specific paragraph that will appear in your
                                        introduction.
                                    </p>
                                </div>
                                <div className="flex-1 p-5 relative">
                                    <textarea
                                        value={statement}
                                        onChange={(e) => setStatement(e.target.value)}
                                        className="w-full h-full resize-none border-none focus:ring-0 bg-transparent text-base text-[#111318] dark:text-white leading-relaxed p-0 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none"
                                        placeholder="Start typing your novelty statement here... For example: 'This research is the first to empirically demonstrate...'"
                                    />
                                    {/* Floating AI Badge */}
                                    <div className="absolute bottom-5 right-5">
                                        <button
                                            onClick={handleAiAnalysis}
                                            disabled={loading || !statement}
                                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Sparkles className="w-4 h-4" />
                                            )}

                                            {loading ? "Analyzing..." : "AI Suggestions Available"}
                                        </button>
                                    </div>
                                </div>
                                {/* AI Feedback Panel */}
                                {suggestion && (
                                    <div className="bg-background-light dark:bg-[#101622] p-5 border-t border-[#f0f2f4] dark:border-[#2a3441]">
                                        <div className="flex items-start gap-3">
                                            <div className="p-1.5 bg-primary/10 rounded-md">
                                                <Brain className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs font-bold text-[#111318] dark:text-white uppercase tracking-wide">
                                                    Analysis
                                                </p>
                                                <p className="text-sm text-[#616f89] dark:text-gray-400 leading-relaxed">
                                                    {suggestion}
                                                </p>
                                                <div className="flex gap-2 mt-2">
                                                    <button className="text-xs text-primary font-medium hover:underline">
                                                        Apply suggestion
                                                    </button>
                                                    <button
                                                        onClick={() => setSuggestion(null)}
                                                        className="text-xs text-[#616f89] font-medium hover:text-[#111318] dark:hover:text-white"
                                                    >
                                                        Dismiss
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Progress Widget */}
                            <div className="bg-primary text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Rocket className="w-24 h-24" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 relative z-10">
                                    Novelty Strength
                                </h3>
                                <div className="w-full bg-white/20 rounded-full h-2 mb-4 relative z-10">
                                    <div
                                        className="bg-white h-2 rounded-full"
                                        style={{ width: "75%" }}
                                    ></div>
                                </div>
                                <p className="text-sm text-white/90 relative z-10 mb-4">
                                    Your project shows strong differentiation. Add 2 more citations
                                    to reach "Excellent" status.
                                </p>
                                <button className="bg-white text-primary text-sm font-bold px-4 py-2 rounded-lg w-full relative z-10 hover:bg-gray-50 transition-colors">
                                    Find Citations
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
