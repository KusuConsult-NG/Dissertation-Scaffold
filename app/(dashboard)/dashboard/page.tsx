"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { TrendingUp, FileText, Zap, BookOpen, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardHome() {
    const { data: session } = useSession();

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Dashboard" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Welcome back, {session?.user?.name || "Scholar"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Your dissertation progress is on track. Here is your research command center.
                        </p>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <Link href="/drafting" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Resume Drafting</h3>
                            <p className="text-blue-100 text-sm mt-1">Continue &quot;Chapter 1&quot;</p>
                        </Link>
                        <Link href="/methodology" className="p-6 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Methodology</h3>
                            <p className="text-rose-100 text-sm mt-1">Refine your research steps</p>
                        </Link>
                        <Link href="/grants" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Grant Opportunities</h3>
                            <p className="text-purple-100 text-sm mt-1">3 new matches found</p>
                        </Link>
                        <Link href="/trends" className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Global Trends</h3>
                            <p className="text-emerald-100 text-sm mt-1">Explore rising keywords</p>
                        </Link>
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                            <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
                                <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-[#151b26] transition-colors">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Edited Draft &quot;Chapter 1&quot;</h4>
                                        <p className="text-xs text-slate-500">Just now</p>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-[#151b26] transition-colors">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Ran Grant Analysis</h4>
                                        <p className="text-xs text-slate-500">10 minutes ago</p>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-[#151b26] transition-colors">
                                    <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Added Source to Literature Review</h4>
                                        <p className="text-xs text-slate-500">2 hours ago</p>
                                    </div>
                                </div>
                                <Link href="/notifications" className="block p-4 text-center text-sm font-medium text-primary hover:bg-slate-50 dark:hover:bg-[#151b26] transition-colors rounded-b-xl">
                                    View full history
                                </Link>
                            </div>
                        </div>

                        {/* Progress Widget */}
                        <div className="flex flex-col gap-6">
                            <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Dissertation Roadmap</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white line-through text-opacity-70">Research Topic</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white line-through text-opacity-70">Literature Review</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Methodology Design</p>
                                            <p className="text-xs text-slate-500 mt-0.5">In Progress (80%)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 flex-shrink-0 mt-0.5"></div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Data Collection</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
