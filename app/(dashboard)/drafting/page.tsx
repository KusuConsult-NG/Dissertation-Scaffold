"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Save, FileText, Download, Share2, Sparkles, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DraftingPage() {
    const { data: session } = useSession();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Fetch initial draft
    useEffect(() => {
        const fetchDraft = async () => {
            if (!session?.user?.id) return;

            try {
                const docRef = doc(db, "users", session.user.id, "drafts", "default");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setContent(data.content || "");
                    setTitle(data.title || "");
                    if (data.updatedAt) {
                        setLastSaved(data.updatedAt.toDate());
                    }
                }
            } catch (error) {
                console.error("Error fetching draft:", error);
                toast.error("Failed to load draft");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDraft();
    }, [session?.user?.id]);

    // Save draft function
    const saveDraft = useCallback(async (newContent: string, newTitle: string) => {
        if (!session?.user?.id) return;

        setIsSaving(true);
        try {
            const docRef = doc(db, "users", session.user.id, "drafts", "default");
            const now = new Date();
            await setDoc(docRef, {
                content: newContent,
                title: newTitle,
                updatedAt: now,
                userId: session.user.id
            }, { merge: true });

            setLastSaved(now);
        } catch (error) {
            console.error("Error saving draft:", error);
            toast.error("Failed to save draft");
        } finally {
            setIsSaving(false);
        }
    }, [session?.user?.id]);

    // Debounced save
    useEffect(() => {
        if (isLoading) return; // Don't save on initial load

        const timeoutId = setTimeout(() => {
            saveDraft(content, title);
        }, 2000); // Auto-save after 2 seconds of inactivity

        return () => clearTimeout(timeoutId);
    }, [content, title, saveDraft, isLoading]);

    const handleManualSave = () => {
        saveDraft(content, title);
        toast.success("Draft saved successfully.");
    };

    const handleAiRefine = async () => {
        if (!content) return;
        setIsAiGenerating(true);
        const toastId = toast.loading("AI is refining your text...");

        // Simulate AI processing
        setTimeout(() => {
            setIsAiGenerating(false);
            // Append a simulated refinement for demo purposes
            const refinement = "\n\n[AI Refinement]: The methodology section could be strengthened by explicitly mentioning the sampling technique used for the qualitative interviews.";
            setContent(prev => prev + refinement);
            toast.success("Text refined!", { id: toastId });
        }, 2000);
    };

    const handleAiExpand = async () => {
        setIsAiGenerating(true);
        const toastId = toast.loading("AI is expanding your ideas...");

        setTimeout(() => {
            setIsAiGenerating(false);
            const expansion = "\n\nFurthermore, recent studies suggest that this approach may yield more robust results when applied to diverse population groups (Smith et al., 2024).";
            setContent(prev => prev + expansion);
            toast.success("Ideas expanded!", { id: toastId });
        }, 1500);
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
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {title || "Untitled Dissertation"}
                            </span>
                        </div>
                        <span className="text-xs text-slate-400">
                            {isSaving ? "Saving..." : lastSaved ? `Sample saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Unsaved"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleAiRefine}
                            disabled={isAiGenerating}
                            className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium mr-2"
                            title="Refine Text with AI"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span className="hidden sm:inline">Refine</span>
                        </button>
                        <button
                            onClick={handleAiExpand}
                            disabled={isAiGenerating}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium mr-2"
                            title="Expand Text with AI"
                        >
                            <Maximize2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Expand</span>
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleManualSave}
                            disabled={isSaving}
                            className="h-8 px-4 bg-primary text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-primary-hover transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a2230] min-h-[800px] shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-8 md:p-12 relative">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10 backdrop-blur-sm rounded-xl">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Chapter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-4xl font-serif font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none bg-transparent mb-8"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing your dissertation..."
                            className="w-full h-full min-h-[600px] resize-none outline-none text-lg leading-relaxed text-slate-700 dark:text-slate-300 bg-transparent font-serif"
                            spellCheck={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
