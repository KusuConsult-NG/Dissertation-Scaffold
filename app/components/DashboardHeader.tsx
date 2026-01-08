"use client";

import React from "react";
import { ChevronRight, Search, Share } from "lucide-react";

interface DashboardHeaderProps {
    breadcrumbs: { label: string; href?: string }[];
}

export default function DashboardHeader({ breadcrumbs }: DashboardHeaderProps) {
    return (
        <header className="h-16 bg-white dark:bg-[#1a2230] border-b border-[#f0f2f4] dark:border-[#2a3441] flex items-center justify-between px-8 flex-shrink-0 z-10">
            <div className="flex items-center gap-4">
                <h2 className="text-[#111318] dark:text-white text-lg font-bold tracking-tight">
                    Dissertation Scaffold
                </h2>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-[#616f89] dark:text-gray-400">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <ChevronRight className="w-4 h-4" />}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-[#111318] dark:text-white font-medium">
                                    {crumb.label}
                                </span>
                            ) : (
                                <span>{crumb.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="relative hidden md:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#616f89]">
                        <Search className="w-5 h-5" />
                    </span>
                    <input
                        className="bg-background-light dark:bg-[#101622] text-sm rounded-lg pl-10 pr-4 py-2 w-64 border-none focus:ring-2 focus:ring-primary/50 text-[#111318] dark:text-white placeholder-[#616f89]"
                        placeholder="Search..."
                        type="text"
                    />
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Share className="w-4 h-4" />
                    Export
                </button>
            </div>
        </header>
    );
}
