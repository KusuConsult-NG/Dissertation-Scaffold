"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    ChevronDown,
    FileText,
    TrendingUp,
    DollarSign,
    LineChart,
    ZoomIn,
    Download,
} from "lucide-react";

export default function TrendsPage() {
    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Insights" },
                    { label: "Global Trends", href: "/trends" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-surface-light dark:bg-background-dark p-4 md:p-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8 pb-20">
                    {/* Page Header */}
                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                Global Research Trends & Insights
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl">
                                Visualize emerging topics and identify funding opportunities in
                                your field.
                            </p>
                        </div>
                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            <button className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border hover:border-primary/50 transition-all shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                    Field:{" "}
                                    <span className="text-primary font-semibold">
                                        All Sciences
                                    </span>
                                </span>
                                <ChevronDown className="text-slate-400 group-hover:text-primary w-5 h-5 flex-shrink-0" />
                            </button>
                            <button className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border hover:border-primary/50 transition-all shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                    Time:{" "}
                                    <span className="text-primary font-semibold">
                                        Last 5 Years
                                    </span>
                                </span>
                                <ChevronDown className="text-slate-400 group-hover:text-primary w-5 h-5 flex-shrink-0" />
                            </button>
                            <button className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border hover:border-primary/50 transition-all shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                    Region:{" "}
                                    <span className="text-primary font-semibold">Global</span>
                                </span>
                                <ChevronDown className="text-slate-400 group-hover:text-primary w-5 h-5 flex-shrink-0" />
                            </button>
                        </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Metric 1 */}
                        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border p-6 shadow-sm group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-emerald-500 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +12%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 truncate">
                                Papers Analyzed
                            </p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white truncate">
                                1,240,052
                            </h3>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        {/* Metric 2 */}
                        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border p-6 shadow-sm group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-emerald-500 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +5%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 truncate">
                                New Grants Posted
                            </p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white truncate">
                                +45{" "}
                                <span className="text-lg font-normal text-slate-500 dark:text-slate-400">
                                    this week
                                </span>
                            </h3>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        {/* Metric 3 */}
                        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border p-6 shadow-sm group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <LineChart className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-emerald-500 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +22%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 truncate">
                                Top Trending Method
                            </p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white truncate">
                                Qualitative NLP
                            </h3>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Main Visualization: Keyword Velocity Map */}
                    <div className="rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border p-6 shadow-sm flex flex-col h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                                    Keyword Velocity Map
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                    Correlation between publication frequency and grant funding
                                    over time.
                                </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    <ZoomIn className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chart Simulation Area */}
                        <div className="relative flex-1 w-full bg-slate-50 dark:bg-[#151f25] rounded-xl border border-dashed border-slate-200 dark:border-card-border overflow-hidden">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-20 pointer-events-none">
                                <div className="w-full h-px bg-slate-400"></div>
                                <div className="w-full h-px bg-slate-400"></div>
                                <div className="w-full h-px bg-slate-400"></div>
                                <div className="w-full h-px bg-slate-400"></div>
                                <div className="w-full h-px bg-slate-400"></div>
                            </div>
                            {/* Bubbles (CSS Simulation) */}
                            <div
                                className="absolute top-[30%] left-[20%] w-24 h-24 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center text-xs font-bold animate-pulse"
                                style={{ animationDuration: "4s" }}
                            >
                                Deep Learning
                            </div>
                            <div
                                className="absolute top-[60%] left-[50%] w-32 h-32 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 flex items-center justify-center text-xs font-bold text-center p-2"
                            >
                                Climate Resilience
                            </div>
                            <div
                                className="absolute top-[20%] left-[70%] w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-500 flex items-center justify-center text-xs font-bold"
                            >
                                CRISPR
                            </div>
                            <div
                                className="absolute top-[75%] left-[30%] w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center text-xs font-bold"
                            >
                                VR
                            </div>
                            <div
                                className="absolute top-[45%] left-[80%] w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500 text-rose-400 flex items-center justify-center text-xs font-bold text-center"
                            >
                                Ethical AI
                            </div>
                            {/* X/Y Axis Labels */}
                            <div className="absolute bottom-2 left-8 right-8 flex justify-between text-xs text-slate-400 font-mono">
                                <span>2019</span>
                                <span>2020</span>
                                <span>2021</span>
                                <span>2022</span>
                                <span>2023</span>
                                <span>2024</span>
                            </div>
                            <div className="absolute top-8 bottom-8 left-2 flex flex-col justify-between text-xs text-slate-400 font-mono">
                                <span>High</span>
                                <span>Med</span>
                                <span>Low</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-12 flex flex-col gap-6">
                            {/* Note: In full implementation, more widgets would go here */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
