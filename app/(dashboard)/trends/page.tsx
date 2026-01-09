"use client";

import React, { useState, useEffect } from "react";
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

// Mock Data Configuration
const DATA_BY_REGION = {
    Global: { papers: "1,240,052", grants: "+45", topMethod: "Qualitative NLP" },
    "North America": { papers: "450,230", grants: "+22", topMethod: "Mixed Methods" },
    Europe: { papers: "380,110", grants: "+15", topMethod: "Longitudinal Studies" },
    Asia: { papers: "310,500", grants: "+8", topMethod: "Quantitative AI" },
};

const DATA_BY_FIELD = {
    "All Sciences": { multiplier: 1 },
    "Social Sciences": { multiplier: 0.4 },
    "Computer Science": { multiplier: 0.8 },
    "Life Sciences": { multiplier: 0.6 },
};

export default function TrendsPage() {
    const [region, setRegion] = useState<keyof typeof DATA_BY_REGION>("Global");
    const [field, setField] = useState<keyof typeof DATA_BY_FIELD>("All Sciences");
    const [time, setTime] = useState("Last 5 Years");

    // Derived stats for display
    const currentStats = DATA_BY_REGION[region];
    const [animate, setAnimate] = useState(false);

    // Trigger animation on filter change
    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 500);
        return () => clearTimeout(timer);
    }, [region, field, time]);

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
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border hover:border-primary/50 transition-all shadow-sm">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                        Field:{" "}
                                        <span className="text-primary font-semibold">
                                            {field}
                                        </span>
                                    </span>
                                    <ChevronDown className="text-slate-400 group-hover:text-primary w-5 h-5 flex-shrink-0" />
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-card-dark rounded-lg shadow-xl border border-slate-100 dark:border-card-border p-1 hidden group-hover:block z-10">
                                    {Object.keys(DATA_BY_FIELD).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setField(f as any)}
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border hover:border-primary/50 transition-all shadow-sm">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                        Time:{" "}
                                        <span className="text-primary font-semibold">
                                            {time}
                                        </span>
                                    </span>
                                    <ChevronDown className="text-slate-400 group-hover:text-primary w-5 h-5 flex-shrink-0" />
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-card-dark rounded-lg shadow-xl border border-slate-100 dark:border-card-border p-1 hidden group-hover:block z-10">
                                    {["Last Year", "Last 5 Years", "Last Decade"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTime(t)}
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark border border-slate-200 dark:border-card-border hover:border-primary/50 transition-all shadow-sm">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                        Region:{" "}
                                        <span className="text-primary font-semibold">{region}</span>
                                    </span>
                                    <ChevronDown className="text-slate-400 group-hover:text-primary w-5 h-5 flex-shrink-0" />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-card-dark rounded-lg shadow-xl border border-slate-100 dark:border-card-border p-1 hidden group-hover:block z-10">
                                    {Object.keys(DATA_BY_REGION).map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRegion(r as any)}
                                            className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
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
                            <h3 className={`text-3xl font-bold text-slate-900 dark:text-white truncate transition-all duration-300 ${animate ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
                                {currentStats.papers}
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
                            <h3 className={`text-3xl font-bold text-slate-900 dark:text-white truncate transition-all duration-300 ${animate ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
                                {currentStats.grants}{" "}
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
                            <h3 className={`text-3xl font-bold text-slate-900 dark:text-white truncate transition-all duration-300 ${animate ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
                                {currentStats.topMethod}
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

                            {/* Filter Overlay for Visual Transition */}
                            {animate && <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-[1px] z-20 transition-all duration-300"></div>}

                            {/* Bubbles (CSS Simulation) - Positions randomized slightly by filter to feel dynamic */}
                            <div
                                className="absolute transition-all duration-700 ease-in-out w-24 h-24 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center text-xs font-bold animate-pulse"
                                style={{
                                    top: region === "Global" ? "30%" : "40%",
                                    left: region === "Global" ? "20%" : "25%",
                                    animationDuration: "4s"
                                }}
                            >
                                Deep Learning
                            </div>
                            <div
                                className="absolute transition-all duration-700 ease-in-out w-32 h-32 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 flex items-center justify-center text-xs font-bold text-center p-2"
                                style={{
                                    top: region === "Global" ? "60%" : "55%",
                                    left: region === "Global" ? "50%" : "45%"
                                }}
                            >
                                Climate Resilience
                            </div>
                            <div
                                className="absolute transition-all duration-700 ease-in-out w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-500 flex items-center justify-center text-xs font-bold"
                                style={{
                                    top: "20%",
                                    left: region === "Global" ? "70%" : "65%"
                                }}
                            >
                                CRISPR
                            </div>
                            <div
                                className="absolute transition-all duration-700 ease-in-out w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center text-xs font-bold"
                                style={{
                                    top: "75%",
                                    left: region === "Global" ? "30%" : "60%"
                                }}
                            >
                                VR
                            </div>
                            <div
                                className="absolute transition-all duration-700 ease-in-out w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500 text-rose-400 flex items-center justify-center text-xs font-bold text-center"
                                style={{
                                    top: "45%",
                                    left: region === "Global" ? "80%" : "75%"
                                }}
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
