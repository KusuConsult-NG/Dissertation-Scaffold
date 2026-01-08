"use client";

import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    Plus,
    ArrowUpDown,
    Sparkles,
    RefreshCw,
    FileText,
    Edit,
    CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function LiteraturePage() {
    const [summarizingId, setSummarizingId] = useState<number | null>(null);
    const [summaries, setSummaries] = useState<Record<number, string>>({});

    const sources = [
        {
            id: 1,
            type: "Journal Article",
            typeColor: "blue",
            year: "2023",
            source: "Nature Machine Intelligence",
            title: "Ethical Guidelines for Quantum Machine Learning Algorithms",
            authors: "Smith, J., & Doe, A.",
            tags: ["#QuantumEthics", "#Policy"],
            abstract:
                "This paper explores the ethical implications of quantum machine learning algorithms, focusing on bias, fairness, and accountability. We propose a set of guidelines for researchers and practitioners to ensure the responsible development and deployment of these powerful technologies.",
        },
        {
            id: 2,
            type: "Conference Paper",
            typeColor: "purple",
            year: "2022",
            source: "IEEE Quantum Week",
            title: "Benchmarking Fairness in Superposition States",
            authors: "Lee, K., Chen, Y., & Patel, R.",
            tags: ["#Technical"],
            abstract:
                "We present a novel method for benchmarking fairness in quantum algorithms that exploit superposition. Our results show that traditional fairness metrics are insufficient for quantum systems and propose new metrics based on quantum information theory.",
        },
        {
            id: 3,
            type: "Book Chapter",
            typeColor: "green",
            year: "2021",
            source: "Oxford University Press",
            title: "Foundations of Digital Ethics: From Binary to Qubit",
            authors: "Henderson, M. (Ed.)",
            tags: ["#Theory", "#Philosophy"],
            abstract:
                "This chapter traces the history of digital ethics from the early days of binary computing to the emerging era of quantum computing. It argues that the shift to quantum mechanics requires a fundamental rethinking of ethical principles.",
        },
    ];

    const handleSummarize = async (id: number, abstract: string) => {
        if (summaries[id]) return; // Already summarized
        setSummarizingId(id);
        const toastId = toast.loading("Summarizing article...");
        try {
            const res = await fetch("/api/ai/literature", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: abstract }),
            });
            if (!res.ok) throw new Error("Summarization failed");
            const data = await res.json();
            if (data.summary) {
                setSummaries((prev) => ({ ...prev, [id]: data.summary }));
                toast.success("Summary generated", { id: toastId });
            } else {
                toast.dismiss(toastId);
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to summarize article", { id: toastId });
        } finally {
            setSummarizingId(null);
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Research" },
                    { label: "Literature Review", href: "/literature" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-20">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#111318] dark:text-white mb-2">
                                Literature Review
                            </h1>
                            <p className="text-[#616f89] dark:text-gray-400">
                                Organize your bibliography, reading lists, and citation notes.
                            </p>
                        </div>
                        <button className="bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-primary/25 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Add Source
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                Total Sources
                            </p>
                            <span className="text-2xl font-bold text-[#111318] dark:text-white">
                                142
                            </span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                To Read
                            </p>
                            <span className="text-2xl font-bold text-orange-500">24</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                Annotated
                            </p>
                            <span className="text-2xl font-bold text-green-500">85</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                Citations Used
                            </p>
                            <span className="text-2xl font-bold text-primary">63</span>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-[#f0f2f4] dark:border-[#2a3441] flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-lg bg-background-light dark:bg-[#101622] text-sm font-medium text-[#111318] dark:text-white">
                                    All Sources
                                </button>
                                <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#616f89] hover:bg-background-light dark:hover:bg-[#101622] transition-colors">
                                    Reading List
                                </button>
                                <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#616f89] hover:bg-background-light dark:hover:bg-[#101622] transition-colors">
                                    Archived
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#616f89]">
                                <ArrowUpDown className="w-4 h-4" />
                                <span>Sort by: Date Added</span>
                            </div>
                        </div>
                        <div className="divide-y divide-[#f0f2f4] dark:divide-[#2a3441]">
                            {sources.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-5 hover:bg-background-light/50 dark:hover:bg-[#101622]/50 transition-colors group"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex flex-col gap-1.5 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`bg-${item.typeColor}-100 text-${item.typeColor}-700 dark:bg-${item.typeColor}-900/30 dark:text-${item.typeColor}-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}
                                                >
                                                    {item.type}
                                                </span>
                                                <span className="text-[#616f89] dark:text-gray-400 text-xs">
                                                    {item.year} • {item.source}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-[#111318] dark:text-white group-hover:text-primary transition-colors cursor-pointer">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-[#616f89] dark:text-gray-400">
                                                {item.authors}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                {item.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* AI Summary Section */}
                                            {summaries[item.id] && (
                                                <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                                    <p className="text-xs text-primary font-bold mb-1 flex items-center gap-1">
                                                        <Sparkles className="w-3.5 h-3.5" />
                                                        AI Summary
                                                    </p>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                                        {summaries[item.id]}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleSummarize(item.id, item.abstract)}
                                                    className="p-2 text-[#616f89] hover:text-primary transition-colors"
                                                    title="AI Summarize"
                                                >
                                                    {summarizingId === item.id ? (
                                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                                    ) : (
                                                        <FileText className="w-5 h-5" />
                                                    )}
                                                </button>
                                                <button
                                                    className="p-2 text-[#616f89] hover:text-primary transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="p-2 text-[#616f89] hover:text-green-600 transition-colors"
                                                    title="Mark as Read"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-background-light dark:bg-[#101622] border-t border-[#f0f2f4] dark:border-[#2a3441] text-center">
                            <button className="text-sm text-[#616f89] font-medium hover:text-primary transition-colors">
                                Load More Sources
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
