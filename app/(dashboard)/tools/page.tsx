"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { CheckCircle, Plus } from "lucide-react";

export default function IntegrationsDashboardPage() {
    const integrations = [
        { name: "Zotero", connected: true, icon: "Z" },
        { name: "Google Drive", connected: false, icon: "G" },
        { name: "Mendeley", connected: false, icon: "M" },
        { name: "Microsoft Word", connected: false, icon: "W" },
    ];

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Integrations", href: "/integrations" }, // This links to /integrations but inside dashboard? No, paths are absolute. 
                    // If this page is app/(dashboard)/integrations, URL is /integrations.
                    // This conflicts with app/integrations public page if both exist?
                    // YES. app/integrations/page.tsx and app/(dashboard)/integrations/page.tsx BOTH map to /integrations.
                    // Next.js will error or pick one. 
                    // I MUST RENAME one of them. 
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Connected Tools</h1>
                    <div className="grid gap-4">
                        {integrations.map((tool) => (
                            <div key={tool.name} className="flex items-center justify-between p-4 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xl text-slate-500">
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                                        <p className="text-xs text-slate-500">{tool.connected ? "Data syncing active" : "Not connected"}</p>
                                    </div>
                                </div>
                                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tool.connected
                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                    }`}>
                                    {tool.connected ? "Connected" : "Connect"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
