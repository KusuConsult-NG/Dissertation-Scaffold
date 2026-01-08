"use client";

import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Save, FileText, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function DraftingPage() {
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate save
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Draft saved successfully.");
        }, 1000);
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Workspace" },
                    { label: "Drafting", href: "/drafting" },
                ]}
            />
            <div className="flex-1 overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
                {/* Toolbar */}
                <div className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151b26] flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">Untitled Dissertation</span>
                        </div>
                        <span className="text-xs text-slate-400">Last saved just now</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="h-8 px-4 bg-primary text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-primary-hover transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a2230] min-h-[800px] shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-12">
                        <input
                            type="text"
                            placeholder="Chapter Title"
                            className="w-full text-4xl font-serif font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none bg-transparent mb-8"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing..."
                            className="w-full h-full min-h-[600px] resize-none outline-none text-lg leading-relaxed text-slate-700 dark:text-slate-300 bg-transparent font-serif"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
