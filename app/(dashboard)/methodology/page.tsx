"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import {
    Database,
    BarChart2,
    Shield,
    Filter,
    Undo,
    Redo,
    Plus,
    MoreHorizontal,
    BarChart,
    Edit,
    Mic,
    X,
    Sparkles,
    CheckCircle,
    Play,
    Save,
    Trash2
} from "lucide-react";
import { useSession } from "next-auth/react";
import { doc, setDoc, onSnapshot, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

interface MethodologyStep {
    id: string;
    type: "start" | "quant" | "qual" | "generic";
    title: string;
    desc: string;
    position: string; // Tailwind formatting classes for position
    tags?: string[];
    // Icon is purely UI, we'll map type to icon on render to avoid serializing JSX
}

const DEFAULT_STEPS: MethodologyStep[] = [
    {
        id: "1",
        type: "start",
        title: "Research Questions",
        desc: "Define your core research questions here.",
        position: "top-10 left-1/2 -translate-x-1/2",
    },
];

export default function MethodologyPage() {
    const { data: session } = useSession();
    const [steps, setSteps] = useState<MethodologyStep[]>(DEFAULT_STEPS);
    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!session?.user?.email) return;

        const docRef = doc(db, "methodologies", session.user.email);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.steps) {
                    setSteps(data.steps);
                }
            } else {
                // Initialize if new
                setDoc(docRef, {
                    steps: DEFAULT_STEPS,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                }, { merge: true });
            }
            setLoading(false);
        }, (err) => {
            console.error(err);
            toast.error("Failed to load methodology.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [session]);

    const saveToFirestore = async (newSteps: MethodologyStep[]) => {
        if (!session?.user?.email) return;
        setSaving(true);
        try {
            await setDoc(doc(db, "methodologies", session.user.email), {
                steps: newSteps,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Failed to save:", err);
            toast.error("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    // Debounce save to avoid too many writes while dragging or typing? 
    // For now, explicit save on "Add" and "Edit Finish" is better, or direct save.
    // Let's do direct save for simplicity but maybe debounce the "Title/Desc" typing.

    const handleUpdateStep = async (id: string, updates: Partial<MethodologyStep>) => {
        const updatedSteps = steps.map((s) => (s.id === id ? { ...s, ...updates } : s));
        setSteps(updatedSteps);
        // We trigger save immediately here. For high-frequency typing, this should be debounced.
        // Implementing simple debounce-like behavior by not awaiting?
        // Ideally we'd use a real debounce ref, but for this demo:
        // Let's assume user types slowly or we accept some writes.
        // Actually, let's just update local state and have a "Save" button in the edit panel, 
        // OR rely on onBlur or explicit save.
        // Better UX: Auto-save.
        // We'll trust Firestore SDK to handle some batching, but we should be careful.
    };

    // Helper to persist only when needed (e.g. closing modal or adding step)
    const persistSteps = (currentSteps: MethodologyStep[]) => {
        saveToFirestore(currentSteps);
    };

    const handleAddStep = () => {
        const newId = (Date.now()).toString(); // Unique ID
        const newStep: MethodologyStep = {
            id: newId,
            type: "generic",
            title: "New Step",
            desc: "Describe this step...",
            position: "top-96 left-1/2 -translate-x-1/2", // Place below start
            tags: ["Draft"],
        };
        const newSteps = [...steps, newStep];
        setSteps(newSteps);
        persistSteps(newSteps);
        setSelectedStepId(newId);
    };

    const handleDeleteStep = (id: string) => {
        if (!confirm("Delete this step?")) return;
        const newSteps = steps.filter(s => s.id !== id);
        setSteps(newSteps);
        persistSteps(newSteps);
        setSelectedStepId(null);
    };

    const handleReset = () => {
        if (!confirm("Reset entire methodology flow? This cannot be undone.")) return;
        setSteps(DEFAULT_STEPS);
        persistSteps(DEFAULT_STEPS);
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case "quant": return <BarChart className="w-4 h-4 text-[#a371f7]" />;
            case "qual": return <Mic className="w-4 h-4 text-primary" />;
            case "start": return <Play className="w-4 h-4 text-slate-900" />;
            default: return <Database className="w-4 h-4 text-slate-600" />;
        }
    };

    const selectedStep = steps.find((s) => s.id === selectedStepId);

    return (
        <div className="flex flex-col h-full bg-[#fafafa] text-slate-900">
            <DashboardHeader
                breadcrumbs={[
                    { label: "Tools" },
                    { label: "Methodology Builder", href: "/methodology" },
                ]}
            />

            <main className="flex-1 max-w-[1600px] w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 mx-auto">
                {/* Left Sidebar: Tools & Components */}
                <aside className="hidden lg:flex flex-col gap-6 sticky top-6 h-[calc(100vh-8rem)]">
                    {/* Progress */}
                    <div className="bg-white border border-slate-300 rounded-lg p-5">
                        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                            Completion Status
                        </h3>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-2xl font-bold text-slate-900">
                                {Math.min(100, Math.round((steps.length / 5) * 100))}%
                            </span>
                            <span className="text-xs text-accent-green mb-1">
                                {steps.length > 3 ? "On Track" : "Getting Started"}
                            </span>
                        </div>
                        <div className="w-full bg-border-dark rounded-full h-1.5">
                            <div
                                className="bg-accent-green h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, (steps.length / 5) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                    {/* Toolbox */}
                    <div className="bg-white border border-slate-300 rounded-lg flex-1 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-300 bg-white/50">
                            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Method Components
                            </h3>
                        </div>
                        <div className="overflow-y-auto p-2 space-y-2 flex-1 scrollbar-thin">
                            {/* Items that act as templates */}
                            {[
                                {
                                    icon: <Database className="w-5 h-5" />,
                                    title: "Data Collection",
                                    desc: "Surveys, Interviews",
                                    type: "generic"
                                },
                                {
                                    icon: <BarChart2 className="w-5 h-5" />,
                                    title: "Quantitative Analysis",
                                    desc: "Regression, Stats",
                                    type: "quant"
                                },
                                {
                                    icon: <Mic className="w-5 h-5" />,
                                    title: "Qualitative Interviews",
                                    desc: "Thematic Analysis",
                                    type: "qual"
                                },
                                {
                                    icon: <Shield className="w-5 h-5" />,
                                    title: "Ethics Protocol",
                                    desc: "IRB, Consent Forms",
                                    type: "generic"
                                },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={handleAddStep}
                                    className="w-full text-left group p-3 rounded bg-slate-50 border border-slate-300 hover:border-primary/50 transition-colors flex items-center gap-3"
                                >
                                    <span className="text-slate-600 group-hover:text-primary">
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">
                                            {item.title}
                                        </p>
                                        <p className="text-[10px] text-slate-600">{item.desc}</p>
                                    </div>
                                    <Plus className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Center: Canvas / Flowchart Builder */}
                <section className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <span className="text-xs text-slate-600 flex items-center gap-2">
                                {saving ? "Saving..." : "All changes saved"}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleAddStep}
                                className="flex items-center gap-1 text-xs font-mono text-primary bg-primary/10 px-3 py-1.5 rounded border border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                                <Plus className="w-3 h-3" /> Add Step
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1 text-xs font-mono text-red-500 bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20 hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 className="w-3 h-3" /> Reset
                            </button>
                        </div>
                    </div>
                    {/* Flowchart Canvas Area */}
                    <div
                        className="bg-white border border-slate-300 rounded-xl min-h-[600px] relative overflow-hidden"
                        style={{
                            backgroundImage: "radial-gradient(#30363d 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                        onClick={() => setSelectedStepId(null)}
                    >
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 z-50">
                                <span className="text-primary animate-pulse">Loading Methodology...</span>
                            </div>
                        )}

                        {/* Connector Lines (SVG) - Simplified for static mock */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <line x1="50%" y1="100" x2="50%" y2="600" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>

                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`absolute ${step.position} w-64 bg-slate-50 border rounded-lg shadow-xl p-4 z-10 transition-all cursor-pointer ${selectedStepId === step.id
                                    ? "border-primary ring-1 ring-primary"
                                    : "border-slate-300 hover:border-primary/50"
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedStepId(step.id);
                                }}
                            >
                                {step.type === "start" && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-700 text-slate-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Play className="w-3 h-3" /> Start
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span>{getIconForType(step.type)}</span>
                                        <h4 className="font-bold text-slate-900 text-sm">
                                            {step.title}
                                        </h4>
                                    </div>
                                    <button className="text-slate-600 hover:text-slate-900">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-600 line-clamp-2">
                                    {step.desc}
                                </p>

                                {step.tags && (
                                    <div className="flex gap-2 mt-3">
                                        {step.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] bg-slate-800 text-slate-600 px-1.5 py-0.5 rounded border border-slate-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Floating Editor */}
                        {selectedStep && (
                            <div className="absolute bottom-6 right-6 w-80 bg-white border border-slate-300 rounded-lg shadow-2xl p-4 z-20 animate-in slide-in-from-bottom-5 fade-in">
                                <div className="flex justify-between items-start mb-3">
                                    <h5 className="text-sm font-bold text-slate-900">
                                        Edit: {selectedStep.title}
                                    </h5>
                                    <div>
                                        <button
                                            onClick={() => handleDeleteStep(selectedStep.id)}
                                            className="text-red-500 hover:text-red-400 mr-2"
                                            title="Delete Step"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedStepId(null)}
                                            className="text-slate-600 hover:text-slate-900"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                                            Title
                                        </label>
                                        <input
                                            className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-700 focus:border-primary outline-none"
                                            value={selectedStep.title}
                                            onChange={(e) =>
                                                handleUpdateStep(selectedStep.id, {
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs text-slate-700 focus:border-primary outline-none resize-none h-20"
                                            value={selectedStep.desc}
                                            onChange={(e) =>
                                                handleUpdateStep(selectedStep.id, {
                                                    desc: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            persistSteps(steps);
                                            setSelectedStepId(null);
                                        }}
                                        className="w-full py-1.5 bg-primary text-slate-900 text-xs font-bold rounded hover:bg-sky-400"
                                    >
                                        Save & Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Right Column: AI Critique & Checklist */}
                <aside className="col-span-1 flex flex-col gap-6 h-[calc(100vh-8rem)] sticky top-6">
                    {/* AI Feedback */}
                    <div className="bg-gradient-to-b from-surface-dark to-background-dark border border-slate-300 rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-slate-900 text-sm">
                                Methodology Critique
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-primary/5 border-l-2 border-primary p-3 rounded-r">
                                <p className="text-xs text-slate-700 leading-relaxed">
                                    <strong className="text-primary">Suggestion:</strong> Based on your Research Questions, consider adding a
                                    <strong className="text-slate-900"> Quantitative Survey</strong> step.
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={handleAddStep}
                                        className="text-[10px] font-bold text-primary hover:underline"
                                    >
                                        Add Step
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps Checklist - Dynamic based on actual steps */}
                    <div className="flex-1 bg-white border border-slate-300 rounded-lg flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-slate-300 bg-white/50 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Your Steps
                            </h3>
                            <span className="text-[10px] bg-slate-800 text-slate-600 px-1.5 py-0.5 rounded">
                                {steps.length} Total
                            </span>
                        </div>
                        <div className="overflow-y-auto p-0 flex-1 scrollbar-thin">
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    onClick={() => setSelectedStepId(step.id)}
                                    className={`w-full flex items-center justify-between p-4 border-b border-slate-300/50 transition-colors text-left group ${selectedStepId === step.id ? 'bg-primary/10 border-l-2 border-l-primary' : 'hover:bg-slate-50/50'}`}
                                >
                                    <div className="w-[80%]">
                                        <h4 className="text-sm font-medium text-slate-700 truncate">
                                            {step.title}
                                        </h4>
                                        <p className="text-[10px] text-slate-600 truncate">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <Edit className={`w-3 h-3 ${selectedStepId === step.id ? 'text-primary' : 'text-slate-600'}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
