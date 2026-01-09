"use client";

import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    Plus,
    ArrowUpDown,
    Sparkles,
    RefreshCw,
    FileText,
    Edit,
    CheckCircle,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AddSourceModal from "../../components/AddSourceModal";

interface LiteratureSource {
    id: string;
    type: string;
    typeColor?: string; // Derived or stored
    year: string;
    source: string;
    title: string;
    authors: string;
    tags: string[];
    abstract?: string;
    summary?: string;
    userId: string;
    createdAt: any;
}

export default function LiteraturePage() {
    const { data: session } = useSession();
    const [sources, setSources] = useState<LiteratureSource[]>([]);
    const [summarizingId, setSummarizingId] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!session?.user?.email) return;

        // Note: In a real app with proper rules, we'd filter by userId. 
        // For now, fetching all or client-side filtering if rules allow 'read: true'
        // Ideally: where("userId", "==", session.user.email) or similar if using ID.
        // Given current "allow all" rules, we'll fetch all and filter in UI or use a query if index exists.
        // Let's assume we want to show everything for this demo or just user's if we had an index.
        // Using "all" for simplicity in this dev phase, acknowledging privacy in prod.

        const q = query(
            collection(db, "literature"),
            where("userId", "==", session.user.email)
            // Removed orderBy to avoid requiring composite index
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedSources = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as LiteratureSource[];

            // Sort client-side by createdAt
            fetchedSources.sort((a, b) => {
                const aTime = a.createdAt?.toMillis?.() || 0;
                const bTime = b.createdAt?.toMillis?.() || 0;
                return bTime - aTime;
            });

            setSources(fetchedSources);
        }, (err) => {
            console.error("Fetch error:", err);
            toast.error("Failed to load literature sources.");
        });

        return () => unsubscribe();
    }, [session]);

    const handleAddSource = async (data: any) => {
        if (!session?.user) {
            toast.error("You must be logged in.");
            return;
        }
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "literature"), {
                ...data,
                typeColor: getColorForType(data.type),
                tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
                userId: session.user.email, // or ID
                createdAt: serverTimestamp(),
            });
            toast.success("Source added successfully!");
            setIsAddModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add source.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSource = async (id: string) => {
        if (!confirm("Are you sure you want to delete this source?")) return;
        try {
            await deleteDoc(doc(db, "literature", id));
            toast.success("Source deleted.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete source.");
        }
    };

    const handleSummarize = async (id: string, abstract?: string) => {
        if (!abstract) {
            toast.error("No abstract to summarize.");
            return;
        }
        setSummarizingId(id);
        const toastId = toast.loading("Summarizing article...");
        try {
            const res = await fetch("/api/ai/literature", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: abstract }),
            });
            if (!res.ok) throw new Error("Summarization failed");
            const data = await res.json();

            if (data.summary) {
                // Persist summary
                await updateDoc(doc(db, "literature", id), {
                    summary: data.summary
                });
                toast.success("Summary generated and saved", { id: toastId });
            } else {
                toast.dismiss(toastId);
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to summarize article. Check API configuration.", { id: toastId });
        } finally {
            setSummarizingId(null);
        }
    };

    const getColorForType = (type: string) => {
        switch (type) {
            case "Journal Article": return "blue";
            case "Conference Paper": return "purple";
            case "Book Chapter": return "green";
            case "Book": return "amber";
            default: return "gray";
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Research" },
                    { label: "Literature Review", href: "/literature" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-20">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-[#111318] dark:text-white mb-2">
                                Literature Review
                            </h1>
                            <p className="text-[#616f89] dark:text-gray-400">
                                Organize your bibliography, reading lists, and citation notes.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-primary hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-lg shadow-primary/25 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Source
                        </button>
                    </div>

                    {/* Stats Cards - Dynamic based on sources length */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                Total Sources
                            </p>
                            <span className="text-2xl font-bold text-[#111318] dark:text-white">
                                {sources.length}
                            </span>
                        </div>
                        {/* Placeholders for other stats for now */}
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                To Read
                            </p>
                            <span className="text-2xl font-bold text-orange-500">0</span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                Annotated
                            </p>
                            <span className="text-2xl font-bold text-green-500">
                                {sources.filter(s => s.summary).length}
                            </span>
                        </div>
                        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3441]">
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-semibold uppercase mb-1">
                                Citations Used
                            </p>
                            <span className="text-2xl font-bold text-primary">0</span>
                        </div>
                    </div>

                    {/* Review List */}
                    <div className="bg-white dark:bg-[#1a2230] rounded-xl border border-[#f0f2f4] dark:border-[#2a3441] shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-[#f0f2f4] dark:border-[#2a3441] flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-lg bg-background-light dark:bg-[#101622] text-sm font-medium text-[#111318] dark:text-white">
                                    All Sources
                                </button>
                                {/* Filters could be implemented here */}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#616f89]">
                                <ArrowUpDown className="w-4 h-4" />
                                <span>Sort by: Date Added</span>
                            </div>
                        </div>

                        {sources.length === 0 ? (
                            <div className="p-10 text-center text-slate-500">
                                No sources added yet. Click &quot;Add Source&quot; to get started.
                            </div>
                        ) : (
                            <div className="divide-y divide-[#f0f2f4] dark:divide-[#2a3441]">
                                {sources.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-5 hover:bg-background-light/50 dark:hover:bg-[#101622]/50 transition-colors group"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex flex-col gap-1.5 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`bg-${item.typeColor || 'gray'}-100 text-${item.typeColor || 'gray'}-700 dark:bg-${item.typeColor || 'gray'}-900/30 dark:text-${item.typeColor || 'gray'}-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}
                                                    >
                                                        {item.type}
                                                    </span>
                                                    <span className="text-[#616f89] dark:text-gray-400 text-xs">
                                                        {item.year} • {item.source}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-bold text-[#111318] dark:text-white group-hover:text-primary transition-colors cursor-pointer">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-[#616f89] dark:text-gray-400">
                                                    {item.authors}
                                                </p>
                                                <div className="flex gap-2 mt-2">
                                                    {item.tags?.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* AI Summary Section */}
                                                {item.summary && (
                                                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                                        <p className="text-xs text-primary font-bold mb-1 flex items-center gap-1">
                                                            <Sparkles className="w-3.5 h-3.5" />
                                                            AI Summary
                                                        </p>
                                                        <p className="text-sm text-slate-700 dark:text-slate-300">
                                                            {item.summary}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2 items-end">
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleSummarize(item.id, item.abstract)}
                                                        className="p-2 text-[#616f89] hover:text-primary transition-colors"
                                                        title="AI Summarize"
                                                    >
                                                        {summarizingId === item.id ? (
                                                            <RefreshCw className="w-5 h-5 animate-spin" />
                                                        ) : (
                                                            <FileText className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSource(item.id)}
                                                        className="p-2 text-[#616f89] hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="p-4 bg-background-light dark:bg-[#101622] border-t border-[#f0f2f4] dark:border-[#2a3441] text-center">
                            <button className="text-sm text-[#616f89] font-medium hover:text-primary transition-colors">
                                Load More Sources
                            </button>
                        </div>
                    </div>
                </div>

                <AddSourceModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddSource}
                    isSubmitting={isSubmitting}
                />
            </div>
        </>
    );
}
