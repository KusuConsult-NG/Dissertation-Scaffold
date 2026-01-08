"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    Plus,
    Image as ImageIcon,
    Link as LinkIcon,
    MoreHorizontal,
    Heart,
    MessageCircle,
    RotateCw,
    UserPlus,
} from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <DashboardHeader
                breadcrumbs={[
                    { label: "Community" },
                    { label: "Scholar Connect", href: "/community" },
                ]}
            />
            <main className="flex-1 flex w-full overflow-hidden">
                {/* Left Sidebar: Navigation & Groups */}
                <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-gray-800 bg-white dark:bg-card-dark hidden lg:flex flex-col">
                    <div className="p-4">
                        <button className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                            <Plus className="w-5 h-5" />
                            <span>New Discussion</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                My Communities
                            </h3>
                            <nav className="space-y-1">
                                <a
                                    className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                                    href="#"
                                >
                                    <span className="text-lg">🧬</span>
                                    <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">
                                        Bio-Engineering
                                    </span>
                                    <span className="ml-auto text-xs bg-slate-100 dark:bg-gray-700 text-slate-500 px-2 py-0.5 rounded-full">
                                        12
                                    </span>
                                </a>
                                <a
                                    className="flex items-center gap-3 px-3 py-2 bg-blue-50 dark:bg-primary/20 text-primary rounded-lg transition-colors group"
                                    href="#"
                                >
                                    <span className="text-lg">🤖</span>
                                    <span className="text-sm font-medium">AI Ethics &amp; Policy</span>
                                    <span className="ml-auto text-xs bg-blue-100 dark:bg-primary/30 text-primary px-2 py-0.5 rounded-full">
                                        5
                                    </span>
                                </a>
                                <a
                                    className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                                    href="#"
                                >
                                    <span className="text-lg">📊</span>
                                    <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">
                                        Qualitative Methods
                                    </span>
                                </a>
                            </nav>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Active Threads
                            </h3>
                            <div className="space-y-3">
                                <div className="group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                                            Grant writing tips for NSF?
                                        </p>
                                    </div>
                                    <p className="text-[11px] text-slate-500 pl-3.5">
                                        Posted by Dr. Chen • 2h ago
                                    </p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors"></div>
                                        <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                                            Dealing with IRB delays
                                        </p>
                                    </div>
                                    <p className="text-[11px] text-slate-500 pl-3.5">
                                        Posted by Sarah J. • 5h ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Lower profile section removed as it is redundant with global sidebar */}
                </aside>

                {/* Middle Column: Main Feed */}
                <section className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-hidden relative">
                    {/* Live Session Banner */}
                    <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between shadow-sm z-20">
                        <div className="flex items-center gap-3">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <p className="text-sm font-medium">
                                Live Now: "Structuring your Literature Review" with Prof. Davis
                            </p>
                        </div>
                        <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors font-medium">
                            Join Room
                        </button>
                    </div>

                    {/* Feed Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                        {/* Post Input */}
                        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-gray-800 p-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="flex-1">
                                    <textarea
                                        className="w-full border-none focus:ring-0 resize-none text-sm placeholder-slate-400 dark:bg-transparent dark:text-white p-0"
                                        placeholder="Share your research milestone or ask a question..."
                                        rows={2}
                                    ></textarea>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-gray-800">
                                        <div className="flex gap-2 text-slate-500">
                                            <button className="hover:text-primary hover:bg-slate-50 dark:hover:bg-gray-800 p-1.5 rounded transition-colors flex-shrink-0">
                                                <ImageIcon className="w-5 h-5" />
                                            </button>
                                            <button className="hover:text-primary hover:bg-slate-50 dark:hover:bg-gray-800 p-1.5 rounded transition-colors flex-shrink-0">
                                                <LinkIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex-shrink-0">
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post 1 */}
                        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden">
                            <div className="p-4 md:p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold border border-purple-200 flex-shrink-0">
                                            MK
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                Maria K.
                                            </h4>
                                            <p className="text-xs text-slate-500 truncate">
                                                PhD Candidate • Stanford University
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex-shrink-0">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    Finally defended my proposal! 🎉
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                                    After 6 months of grueling revisions and endless literature
                                    reviews, my committee approved my dissertation proposal on
                                    "Algorithmic Bias in Healthcare Systems". Huge thanks to
                                    everyone in the{" "}
                                    <span className="text-primary font-medium cursor-pointer hover:underline">
                                        #AI_Ethics
                                    </span>{" "}
                                    circle for the feedback on chapter 3!
                                </p>
                                <div className="flex gap-2 mb-4">
                                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">
                                        Milestone
                                    </span>
                                    <span className="px-2 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-100">
                                        Proposal Defense
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-gray-800 text-slate-500 text-sm">
                                    <div className="flex gap-6">
                                        <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                                            <Heart className="w-5 h-5" />
                                            <span>42</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                            <span>8 Comments</span>
                                        </button>
                                    </div>
                                    <span className="text-xs text-slate-400">24 mins ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Sidebar: Suggested People & Events */}
                <aside className="w-80 flex-shrink-0 border-l border-slate-200 dark:border-gray-800 bg-white dark:bg-card-dark hidden xl:block overflow-y-auto p-6">
                    {/* Events */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Upcoming Events
                            </h3>
                            <a className="text-primary text-xs font-medium hover:underline" href="#">
                                View all
                            </a>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start group cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800 p-2 -mx-2 rounded-lg transition-colors">
                                <div className="bg-slate-100 dark:bg-gray-700 rounded-lg p-2 text-center min-w-[50px]">
                                    <span className="block text-xs font-bold text-red-500 uppercase">
                                        Oct
                                    </span>
                                    <span className="block text-xl font-bold text-slate-900 dark:text-white">
                                        15
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                                        Virtual Writing Retreat
                                    </h4>
                                    <p className="text-xs text-slate-500 mb-1">
                                        10:00 AM - 4:00 PM EST
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Scholars */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Suggested Scholars
                            </h3>
                            <button className="text-slate-500 hover:text-primary">
                                <RotateCw className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                        AL
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                            Dr. Ana Lopez
                                        </h4>
                                        <p className="text-xs text-slate-500">Sociology • Yale</p>
                                    </div>
                                </div>
                                <button className="text-primary hover:bg-primary/10 p-1.5 rounded-full transition-colors">
                                    <UserPlus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
