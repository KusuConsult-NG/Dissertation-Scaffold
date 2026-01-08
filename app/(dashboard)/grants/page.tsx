"use client";

import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    Download,
    RefreshCw,
    DollarSign,
    TrendingUp,
    BadgeCheck,
    CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

export default function GrantsPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);

    const handleReanalyze = async () => {
        setAnalyzing(true);
        setAnalysisResult(null);
        const toastId = toast.loading("Analyzing grant potential...");
        try {
            // Simulating analyzing specific grants or general project
            const res = await fetch("/api/ai/grants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectDescription:
                        "Looking for funding for Quantum Ethics research focusing on policy frameworks.",
                    grantName: "NSF Graduate Research Fellowship",
                }),
            });
            if (!res.ok) throw new Error("Analysis failed");
            const data = await res.json();
            if (data.analysis) {
                setAnalysisResult(
                    `AI Analysis: ${data.analysis} (Score: ${data.matchScore}%)`
                );
                toast.success("Analysis complete", { id: toastId });
            } else {
                toast.dismiss(toastId);
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to analyze project", { id: toastId });
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Funding" },
                    { label: "Grant Potential", href: "/grants" },
                ]}
            />
            <div className="flex-1 flex justify-center py-6 px-4 sm:px-8 overflow-y-auto">
                <div className="flex flex-col max-w-[1280px] w-full gap-6 pb-20">
                    {/* Page Heading & Actions */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col gap-2 min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-500/20 whitespace-nowrap">
                                    Active Analysis
                                </span>
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white truncate">
                                    Grant Potential Analysis
                                </h1>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg truncate">
                                Dissertation:{" "}
                                <span className="font-medium text-gray-900 dark:text-gray-200">
                                    Quantum Computing Ethics & Policy Frameworks
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                            <button className="flex items-center justify-center px-4 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                                <Download className="w-4 h-4 mr-2" />
                                Export Report
                            </button>
                            <button
                                onClick={handleReanalyze}
                                disabled={analyzing}
                                className="flex items-center justify-center px-4 h-10 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] disabled:opacity-70 whitespace-nowrap"
                            >
                                <RefreshCw
                                    className={`w-4 h-4 mr-2 ${analyzing ? "animate-spin" : ""}`}
                                />
                                {analyzing ? "Analyzing..." : "Re-analyze Project"}
                            </button>
                        </div>
                    </div>

                    {/* AI Banner Result */}
                    {analysisResult && (
                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg text-primary text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            {analysisResult}
                        </div>
                    )}

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1 p-6 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute right-0 top-0 h-24 w-24 bg-primary/5 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                                <DollarSign className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium uppercase tracking-wider truncate">
                                    Total Available Funding
                                </p>
                            </div>
                            <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight truncate">
                                $1.24 Million
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-sm font-medium">
                                <TrendingUp className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">+12% vs last month</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 p-6 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute right-0 top-0 h-24 w-24 bg-purple-500/5 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                                <BadgeCheck className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium uppercase tracking-wider truncate">
                                    High-Confidence Matches
                                </p>
                            </div>
                            <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight truncate">
                                14 Grants
                            </p>
                            <p className="text-sm text-gray-500 mt-2 truncate">
                                Based on &gt;80% semantic match
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 p-6 rounded-xl bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute right-0 top-0 h-24 w-24 bg-orange-500/5 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                                <CalendarDays className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium uppercase tracking-wider truncate">
                                    Next Critical Deadline
                                </p>
                            </div>
                            <p className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight truncate">
                                Oct 15, 2023
                            </p>
                            <p className="text-sm text-orange-500 dark:text-orange-400 font-medium mt-2 truncate">
                                12 Days Remaining
                            </p>
                        </div>
                    </div>


                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Chart Section */}
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Approval Probability Analysis
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Comparing your abstract keywords against historical grant
                                            approvals.
                                        </p>
                                    </div>
                                    <span className="flex items-center gap-1 text-sm font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                                        High Probability
                                    </span>
                                </div>
                                {/* Chart SVG */}
                                <div className="w-full aspect-[2/1] sm:aspect-[3/1] relative">
                                    <svg
                                        className="w-full h-full"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 478 150"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient
                                                gradientUnits="userSpaceOnUse"
                                                id="chart-gradient"
                                                x1="236"
                                                x2="236"
                                                y1="1"
                                                y2="149"
                                            >
                                                <stop stopColor="#135bec" stopOpacity="0.2"></stop>
                                                <stop
                                                    offset="1"
                                                    stopColor="#135bec"
                                                    stopOpacity="0"
                                                ></stop>
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                                            fill="url(#chart-gradient)"
                                        ></path>
                                        <path
                                            d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                                            stroke="#135bec"
                                            strokeLinecap="round"
                                            strokeWidth="3"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="flex justify-between mt-4 px-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Jan
                                    </span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Feb
                                    </span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Mar
                                    </span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Apr
                                    </span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        May
                                    </span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Jun
                                    </span>
                                </div>
                            </div>

                            {/* Grant Cards (Simplified for brevity) */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Matched Opportunities</h3>
                                <div className="p-4 bg-white dark:bg-card-dark rounded-lg border border-gray-200 dark:border-gray-800">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold">NSF Graduate Research Fellowship</h4>
                                        <span className="text-primary font-bold">94% Match</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Supports outstanding graduate students in NSF-supported disciplines.</p>
                                </div>
                                <div className="p-4 bg-white dark:bg-card-dark rounded-lg border border-gray-200 dark:border-gray-800">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold">Department of Energy (DOE) Grant</h4>
                                        <span className="text-primary font-bold">88% Match</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Funding for advanced research in quantum information science.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Overall Suitability</h3>
                                <div className="text-center py-4">
                                    <span className="text-4xl font-black text-gray-900 dark:text-white">87%</span>
                                    <p className="text-sm text-gray-500">Excellent Fit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
