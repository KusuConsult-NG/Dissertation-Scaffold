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
    ExternalLink,
    Bookmark,
    Check
} from "lucide-react";
import { toast } from "sonner";

interface Grant {
    id: string;
    title: string;
    agency: string;
    matchScore: number;
    amount: string;
    deadline: string;
    description: string;
    url: string;
}

const MOCK_GRANTS: Grant[] = [
    {
        id: "1",
        title: "Graduate Research Fellowship Program (GRFP)",
        agency: "National Science Foundation (NSF)",
        matchScore: 94,
        amount: "$147,000",
        deadline: "Oct 21, 2026",
        description: "Supports outstanding graduate students in NSF-supported science, technology, engineering, and mathematics disciplines.",
        url: "https://www.nsf.gov/funding/pgm_summ.jsp?pims_id=6201"
    },
    {
        id: "2",
        title: "Quantum Information Science Research",
        agency: "Department of Energy (DOE)",
        matchScore: 88,
        amount: "$50,000 - $200,000",
        deadline: "Nov 15, 2026",
        description: "Funding for advanced research in quantum information science, targeting specific ethical implementation frameworks.",
        url: "https://science.osti.gov/wdts/scgsr"
    },
    {
        id: "3",
        title: "Ethical AI & Society Grant",
        agency: "Future of Life Institute",
        matchScore: 82,
        amount: "$100,000",
        deadline: "Rolling",
        description: "Project grants for researchers working on core problems in AI safety and governance.",
        url: "https://futureoflife.org/grants/ai-safety-grants/"
    }
];

export default function GrantsPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [savedGrants, setSavedGrants] = useState<Set<string>>(new Set());

    const handleReanalyze = async () => {
        setAnalyzing(true);
        const toastId = toast.loading("Analyzing grant potential...");

        // Simulate analysis
        setTimeout(() => {
            setAnalyzing(false);
            toast.success("Analysis complete. 2 new matches found.", { id: toastId });
        }, 2000);
    };

    const toggleSave = (id: string) => {
        const newSaved = new Set(savedGrants);
        if (newSaved.has(id)) {
            newSaved.delete(id);
            toast.info("Grant removed from bookmarks");
        } else {
            newSaved.add(id);
            toast.success("Grant saved to bookmarks");
        }
        setSavedGrants(newSaved);
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
                                {analyzing ? "Scanning..." : "Re-analyze Project"}
                            </button>
                        </div>
                    </div>

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
                                {MOCK_GRANTS.length} Grants
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
                                Oct 21, 2026
                            </p>
                            <p className="text-sm text-orange-500 dark:text-orange-400 font-medium mt-2 truncate">
                                Upcoming very soon
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
                                {/* Chart SVG - Same as before but kept for context */}
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
                            </div>

                            {/* Grant Cards */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    Matched Opportunities
                                    <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                        {MOCK_GRANTS.length} found
                                    </span>
                                </h3>

                                {MOCK_GRANTS.map((grant) => (
                                    <div key={grant.id} className="p-5 bg-white dark:bg-card-dark rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-2">
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                                    {grant.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                    {grant.agency}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500 uppercase font-semibold">Match Score</p>
                                                    <p className="text-lg font-bold text-primary">{grant.matchScore}%</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full border-4 border-primary/20 flex items-center justify-center">
                                                    <div className="w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin-slow rotate-45" style={{ borderLeftColor: 'transparent', borderBottomColor: 'transparent' }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            {grant.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                Amount: <span className="font-semibold text-gray-900 dark:text-white">{grant.amount}</span>
                                            </div>
                                            <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                Deadline: <span className="font-semibold text-gray-900 dark:text-white">{grant.deadline}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <a
                                                href={grant.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold py-2 rounded-lg transition-colors"
                                            >
                                                Apply Now <ExternalLink className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => toggleSave(grant.id)}
                                                className={`p-2 rounded-lg border transition-all ${savedGrants.has(grant.id)
                                                        ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-500"
                                                        : "bg-white dark:bg-card-dark border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {savedGrants.has(grant.id) ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
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
                                <div className="space-y-3 mt-4">
                                    <div className="text-sm flex justify-between">
                                        <span className="text-gray-500">Topic Relevance</span>
                                        <span className="font-bold text-gray-900 dark:text-white">High</span>
                                    </div>
                                    <div className="text-sm flex justify-between">
                                        <span className="text-gray-500">Inst. Eligibility</span>
                                        <span className="font-bold text-gray-900 dark:text-white">Verified</span>
                                    </div>
                                    <div className="text-sm flex justify-between">
                                        <span className="text-gray-500">Career Stage</span>
                                        <span className="font-bold text-gray-900 dark:text-white">Match</span>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Grants Mini Widget */}
                            {savedGrants.size > 0 && (
                                <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm animate-in fade-in slide-in-from-right-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                        <Bookmark className="w-4 h-4 fill-current text-yellow-500" />
                                        Saved Grants
                                    </h3>
                                    <ul className="space-y-2">
                                        {Array.from(savedGrants).map(id => {
                                            const grant = MOCK_GRANTS.find(g => g.id === id);
                                            return (
                                                <li key={id} className="text-sm p-2 bg-gray-50 dark:bg-gray-800/50 rounded flex justify-between items-center group">
                                                    <span className="truncate max-w-[180px] font-medium">{grant?.title}</span>
                                                    <button onClick={() => toggleSave(id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        ×
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
