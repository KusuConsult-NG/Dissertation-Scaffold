"use client";

import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Check, Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/lib/firestore";
import { toast } from "sonner";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function IntegrationsDashboardPage() {
    const { data: session } = useSession();
    const [connectedTools, setConnectedTools] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingIds, setProcessingIds] = useState<string[]>([]); // Track which tools are being toggled

    const integrations = [
        { id: "zotero", name: "Zotero", icon: "Z" },
        { id: "google_drive", name: "Google Drive", icon: "G" },
        { id: "mendeley", name: "Mendeley", icon: "M" },
        { id: "ms_word", name: "Microsoft Word", icon: "W" },
        { id: "notion", name: "Notion", icon: "N" },
    ];

    useEffect(() => {
        let unsubscribe: () => void;

        const setupRealtimeListener = async () => {
            if (!session?.user?.email) return;

            try {
                // First get the user ID using the email
                const user = await getUser(session.user.email);

                if (user?.id) {
                    // Set up listener on the specific user document
                    unsubscribe = onSnapshot(doc(db, "users", user.id), (doc) => {
                        if (doc.exists()) {
                            const data = doc.data();
                            setConnectedTools(data.connectedTools || []);
                        }
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error setting up listener:", error);
                setLoading(false);
            }
        };

        setupRealtimeListener();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [session]);

    const handleToggle = async (toolId: string) => {
        if (!session?.user?.email) return;

        // Prevent double-clicking
        if (processingIds.includes(toolId)) return;

        setProcessingIds(prev => [...prev, toolId]);

        // Optimistic Update
        const wasConnected = connectedTools.includes(toolId);
        const newTools = wasConnected
            ? connectedTools.filter(t => t !== toolId)
            : [...connectedTools, toolId];

        // Immediate UI feedback (though snapshot will also fire, this makes it feel instant)
        setConnectedTools(newTools);

        try {
            await updateUser(session.user.email, { connectedTools: newTools });
            toast.success(wasConnected
                ? `Disconnected ${integrations.find(i => i.id === toolId)?.name}`
                : `Connected ${integrations.find(i => i.id === toolId)?.name}`
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to update connection");
            // Revert on error
            setConnectedTools(prev => wasConnected ? [...prev, toolId] : prev.filter(t => t !== toolId));
        } finally {
            setProcessingIds(prev => prev.filter(id => id !== toolId));
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Connected Tools", href: "/tools" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Connected Tools</h1>
                        <p className="text-slate-500 dark:text-slate-400">Sync your research data across your favorite platforms.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {integrations.map((tool) => {
                                const isConnected = connectedTools.includes(tool.id);
                                const isProcessing = processingIds.includes(tool.id);

                                return (
                                    <div key={tool.id} className="flex items-center justify-between p-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-sm transition-all hover:border-primary/20">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl shadow-inner transition-colors ${isConnected
                                                    ? "bg-primary text-white"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                                }`}>
                                                {tool.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{tool.name}</h3>
                                                <p className="text-sm text-slate-500">
                                                    {isConnected ? "Data syncing active" : "Not connected"}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggle(tool.id)}
                                            disabled={isProcessing}
                                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all disabled:opacity-50 min-w-[140px] flex justify-center ${isConnected
                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                                }`}
                                        >
                                            {isProcessing ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : isConnected ? (
                                                <span className="flex items-center gap-2">Connected <Check className="w-4 h-4" /></span>
                                            ) : (
                                                <span className="flex items-center gap-2">Connect <Plus className="w-4 h-4" /></span>
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
