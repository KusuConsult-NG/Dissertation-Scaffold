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
    Search,
    BookOpen
} from "lucide-react";
import { toast } from "sonner";

interface AuditResult {
    impactScore: number;
    citationPotential: number;
    gapDescription: string;
    problem: string;
    method: string;
    outcome: string;
    feedback: string;
    literatureComparison: {
        dimension: string;
        existing: string;
        contribution: string;
    }[];
}

export default function NoveltyPage() {
    const [statement, setStatement] = useState("");
    const [loading, setLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

    const handleAiAnalysis = async () => {
        if (!statement) {
            toast.error("Please enter a research abstract or topic first.");
            return;
        }
        setLoading(true);
        const toastId = toast.loading("Analyzing research novelty...");

        // Simulate API delay
        setTimeout(() => {
            // Mock Response based on input length or randomness
            const mockResult: AuditResult = {
                impactScore: 8.5 + Math.random(),
                citationPotential: 85 + Math.floor(Math.random() * 14),
                gapDescription: `The intersection of "${statement.substring(0, 20)}..." and modern ethical frameworks is currently under-explored in Q1 journals.`,
                problem: "Existing frameworks fail to account for the specific variables introduced in your study.",
                method: "Your mixed-methods approach offers a higher granularity of data than the prevailing theoretical models.",
                outcome: "Potential to establish a new baseline for policy decisions in this specific domain.",
                feedback: "Your core argument is strong. Consider tightening the scope of the 'Method' section to explicitly exclude edge cases.",
                literatureComparison: [
                    {
                        dimension: "Scope",
                        existing: "Limited to general theoretical models",
                        contribution: "applies specific empirical constraints"
                    },
                    {
                        dimension: "Methodology",
                        existing: "Qualitative / Case Study based",
                        contribution: "Quantitative / Longitudinal"
                    },
                    {
                        dimension: "Context",
                        existing: "Western-centric focus",
                        contribution: "Global / Cross-cultural perspective"
                    }
                ]
            };

            setAuditResult(mockResult);
            // setStatement is kept as is
            setLoading(false);
            toast.success("Analysis complete!", { id: toastId });
        }, 2000);
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
                                Research Novelty Audit
                            </h1>
                            <p className="text-[#616f89] dark:text-gray-400 text-base max-w-2xl">
                                Verify the uniqueness of your dissertation against existing literature.
                            </p>
                        </div>
                        {/* Impact Scorecards */}
                        <div className="flex gap-4 flex-shrink-0">
                            <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441] min-w-[140px]">
                                <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1 truncate">
                                    Impact Score
                                </p>
                                <div className="flex items-end gap-2">
                                    {auditResult ? (
                                        <>
                                            <span className="text-2xl font-bold text-[#111318] dark:text-white">
                                                {auditResult.impactScore.toFixed(1)}
                                            </span>
                                            <span className="text-green-500 text-xs font-medium mb-1 flex items-center truncate">
                                                <ArrowUp className="w-3.5 h-3.5 mr-1" /> High
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-400">---</span>
                                    )}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441] min-w-[140px]">
                                <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1 truncate">
                                    Citation Potential
                                </p>
                                <div className="flex items-end gap-2">
                                    {auditResult ? (
                                        <>
                                            <span className="text-2xl font-bold text-[#111318] dark:text-white">
                                                {auditResult.citationPotential}%
                                            </span>
                                            <span className="text-primary text-xs font-medium mb-1 truncate">
                                                Top Tier
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-400">---</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Right Column: Editor (Swapped to Left for Flow - Input First) */}
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            {/* Novelty Statement Editor */}
                            <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm flex flex-col h-full min-h-[500px]">
                                <div className="p-5 border-b border-[#f0f2f4] dark:border-[#2a3441]">
                                    <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                                        Your Research Input
                                    </h3>
                                    <p className="text-xs text-[#616f89] dark:text-gray-400 mt-1">
                                        Paste your abstract, problem statement, or a summary of your proposed research.
                                    </p>
                                </div>
                                <div className="flex-1 p-5 relative">
                                    <textarea
                                        value={statement}
                                        onChange={(e) => setStatement(e.target.value)}
                                        className="w-full h-full resize-none border-none focus:ring-0 bg-transparent text-base text-[#111318] dark:text-white leading-relaxed p-0 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none"
                                        placeholder="E.g. This study explores the impact of Generative AI on junior developer retention rates in remote-first startups..."
                                    />
                                    {/* Action Button */}
                                    <div className="absolute bottom-5 right-5 left-5">
                                        <button
                                            onClick={handleAiAnalysis}
                                            disabled={loading || !statement}
                                            className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg text-sm font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Search className="w-4 h-4" />
                                            )}
                                            {loading ? "Scanning Literature..." : "Analyze Novelty"}
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Feedback Panel */}
                                {auditResult && (
                                    <div className="bg-background-light dark:bg-[#101622] p-5 border-t border-[#f0f2f4] dark:border-[#2a3441] animate-in slide-in-from-bottom-5">
                                        <div className="flex items-start gap-3">
                                            <div className="p-1.5 bg-primary/10 rounded-md">
                                                <Brain className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs font-bold text-[#111318] dark:text-white uppercase tracking-wide">
                                                    AI Feedback
                                                </p>
                                                <p className="text-sm text-[#616f89] dark:text-gray-400 leading-relaxed">
                                                    {auditResult.feedback}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Middle/Left Column: Visualization & Results */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* Research Gap Visualizer Card */}
                            <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-[#f0f2f4] dark:border-[#2a3441] flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[#111318] dark:text-white flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-gray-400" />
                                        Gap Analysis
                                    </h3>
                                    {loading && <span className="text-xs text-primary animate-pulse">Analyzing...</span>}
                                </div>
                                <div className="relative w-full h-80 bg-[#f8f9fc] dark:bg-[#101622] flex items-center justify-center overflow-hidden">
                                    {/* Placeholder Visual */}
                                    <div
                                        className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${loading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUKvrBGRvkOtuJQSM4dqwRRgLT3iXVIO0YLx2yvLCpR2qdMP9w1fkZsPgr0H6D5PrMhNqPIlHtdb3lcao3tzFx7u9ntmlc0affeu1N1fb7A1CIT9le21H18Oo3EPzBAMHzxmQywGdqybhBZJLRK3n60mVhIdix2dVJPVK9r6g1V6Qp1dYKf8sui8y7tngcgf8BuwFMAwzRJEp206q5CJeBpFRfx_5eIhu2_42G4A5dAhbr8KIyfeY3-GvmmIzSC1SSkV3Jo_McK-A")',
                                            opacity: 0.6
                                        }}
                                    />
                                    {/* Overlay Result */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#1a2230]/95 backdrop-blur-sm p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                            <span className="text-xs font-bold text-[#111318] dark:text-white uppercase">
                                                Identified Gap
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-[#111318] dark:text-gray-200">
                                            {auditResult ? auditResult.gapDescription : "Run the analysis to identify the research gap within the current literature corpus."}
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
                                        <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1 line-clamp-3">
                                            {auditResult ? auditResult.problem : "Pending analysis..."}
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
                                        <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1 line-clamp-3">
                                            {auditResult ? auditResult.method : "Pending analysis..."}
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
                                        <p className="text-sm text-[#616f89] dark:text-gray-400 mt-1 line-clamp-3">
                                            {auditResult ? auditResult.outcome : "Pending analysis..."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Literature Comparison Table */}
                            {auditResult && (
                                <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4">
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
                                                {auditResult.literatureComparison.map((row, i) => (
                                                    <tr key={i} className="hover:bg-background-light/50 dark:hover:bg-[#101622]/50 transition-colors">
                                                        <td className="px-4 py-4 font-medium text-[#111318] dark:text-white">
                                                            {row.dimension}
                                                        </td>
                                                        <td className="px-4 py-4 text-[#616f89] dark:text-gray-400">
                                                            {row.existing}
                                                        </td>
                                                        <td className="px-4 py-4 text-primary font-medium flex items-center gap-2">
                                                            <PlusCircle className="w-4 h-4 shrink-0" />
                                                            {row.contribution}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
