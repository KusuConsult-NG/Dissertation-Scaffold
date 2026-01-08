"use client";

import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { TrendingUp, FileText, Zap, Clock } from "lucide-react";
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
                            Here is what's happening with your research today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Link href="/drafting" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Resume Drafting</h3>
                            <p className="text-blue-100 text-sm mt-1">Continue working on "Methodology"</p>
                        </Link>
                        <Link href="/grants" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Check Grants</h3>
                            <p className="text-purple-100 text-sm mt-1">3 new opportunities found</p>
                        </Link>
                        <Link href="/trends" className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg">Analyze Trends</h3>
                            <p className="text-emerald-100 text-sm mt-1">Explore rising keywords</p>
                        </Link>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
                    <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-[#151b26] transition-colors">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Updated Literature Review</h4>
                                    <p className="text-xs text-slate-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
