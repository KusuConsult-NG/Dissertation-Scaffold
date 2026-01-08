"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { TrendingUp, Award, Zap, BarChart3 } from "lucide-react";

export default function AnalysisPage() {
    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Intelligence" },
                    { label: "Analysis", href: "/analysis" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Research Analysis</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">Trend Alignment</span>
                            </div>
                            <div className="mt-auto">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">94%</span>
                                <p className="text-xs text-green-500 mt-1 flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +12% vs last month
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                    <Award className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">Grant Potential</span>
                            </div>
                            <div className="mt-auto">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">High</span>
                                <p className="text-xs text-slate-500 mt-1">
                                    3 new matches found
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">Novelty Score</span>
                            </div>
                            <div className="mt-auto">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">8.5/10</span>
                                <p className="text-xs text-slate-500 mt-1">
                                    Top 15% of cohort
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark flex flex-col">
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">Citations</span>
                            </div>
                            <div className="mt-auto">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">124</span>
                                <p className="text-xs text-green-500 mt-1 flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +5 this week
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Topic Keyword Analysis</h3>
                            <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-[#151b26] rounded-lg text-slate-400">
                                Chart Placeholder
                            </div>
                        </div>
                        <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Funding Success Probability</h3>
                            <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-[#151b26] rounded-lg text-slate-400">
                                Chart Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
