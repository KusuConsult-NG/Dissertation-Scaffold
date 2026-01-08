"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface MethodologyStep {
    id: string;
    type: "start" | "quant" | "qual" | "generic";
    title: string;
    desc: string;
    position: string; // Tailwind formatting classes for position
    tags?: string[];
    icon?: React.ReactNode;
}

export default function MethodologyPage() {
    const [steps, setSteps] = useState<MethodologyStep[]>([
        {
            id: "1",
            type: "start",
            title: "Research Questions",
            desc: "How does remote work impact employee retention in tech startups?",
            position: "top-10 left-1/2 -translate-x-1/2",
        },
        {
            id: "2",
            type: "quant",
            title: "Quantitative Survey",
            desc: "N=500 tech workers, Likert scale analysis.",
            position: "top-56 left-[10%] lg:left-[15%]",
            tags: ["SurveyMonkey", "Pending IRB"],
            icon: <BarChart className="w-4 h-4 text-[#a371f7]" />,
        },
        {
            id: "3",
            type: "qual",
            title: "Qualitative Interviews",
            desc: "Semi-structured, 30 min zoom calls with founders.",
            position: "top-56 right-[10%] lg:right-[15%]",
            tags: ["Zoom", "Drafting"],
            icon: <Mic className="w-4 h-4 text-primary" />,
        },
    ]);

    const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

    const selectedStep = steps.find((s) => s.id === selectedStepId);

    const handleUpdateStep = (id: string, updates: Partial<MethodologyStep>) => {
        setSteps((prev) =>
            prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
        );
    };

    const handleAddStep = () => {
        const newId = (steps.length + 1).toString();
        const newStep: MethodologyStep = {
            id: newId,
            type: "generic",
            title: "New Step",
            desc: "Describe this step...",
            position: "top-96 left-1/2 -translate-x-1/2", // Place below start
            tags: ["Draft"],
        };
        setSteps((prev) => [...prev, newStep]);
        setSelectedStepId(newId);
    };

    return (
        <div className="flex flex-col h-full bg-background-dark text-slate-300">
            {/* Helper to force dark mode styles for this specific page if typically light, 
        but since we are mixing themes, we'll try to stick to the page's design */}
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
                    <div className="bg-surface-dark bg-[#161b22] border border-border-dark border-[#30363d] rounded-lg p-5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Completion Status
                        </h3>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-2xl font-bold text-white">45%</span>
                            <span className="text-xs text-accent-green text-[#2ea043] mb-1">
                                On Track
                            </span>
                        </div>
                        <div className="w-full bg-border-dark bg-[#30363d] rounded-full h-1.5">
                            <div
                                className="bg-accent-green bg-[#2ea043] h-1.5 rounded-full"
                                style={{ width: "45%" }}
                            ></div>
                        </div>
                    </div>
                    {/* Toolbox */}
                    <div className="bg-surface-dark bg-[#161b22] border border-border-dark border-[#30363d] rounded-lg flex-1 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-border-dark border-[#30363d] bg-surface-dark/50 bg-[#161b22]/50">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Method Components
                            </h3>
                        </div>
                        <div className="overflow-y-auto p-2 space-y-2 flex-1 scrollbar-thin">
                            {/* Draggable Items */}
                            {[
                                {
                                    icon: <Database className="w-5 h-5" />,
                                    title: "Data Collection",
                                    desc: "Surveys, Interviews",
                                },
                                {
                                    icon: <BarChart2 className="w-5 h-5" />,
                                    title: "Analysis Method",
                                    desc: "Regression, Thematic",
                                },
                                {
                                    icon: <Shield className="w-5 h-5" />,
                                    title: "Ethics Protocol",
                                    desc: "IRB, Consent Forms",
                                },
                                {
                                    icon: <Filter className="w-5 h-5" />,
                                    title: "Sampling Strategy",
                                    desc: "Random, Stratified",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group p-3 rounded bg-background-dark bg-[#0d1117] border border-border-dark border-[#30363d] hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors flex items-center gap-3"
                                >
                                    <span className="text-slate-500 group-hover:text-primary">
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">
                                            {item.title}
                                        </p>
                                        <p className="text-[10px] text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Center: Canvas / Flowchart Builder */}
                <section className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <button className="p-2 rounded hover:bg-surface-dark hover:bg-[#161b22] text-slate-400 hover:text-white transition-colors">
                                <Undo className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded hover:bg-surface-dark hover:bg-[#161b22] text-slate-400 hover:text-white transition-colors">
                                <Redo className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleAddStep}
                                className="flex items-center gap-1 text-xs font-mono text-primary bg-primary/10 px-3 py-1.5 rounded border border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                                <Plus className="w-3 h-3" /> Add Step
                            </button>
                            <div className="flex bg-surface-dark bg-[#161b22] rounded border border-border-dark border-[#30363d] p-0.5">
                                <button className="px-3 py-1 rounded text-xs font-medium bg-background-dark bg-[#0d1117] text-white shadow-sm">
                                    Visual
                                </button>
                                <button className="px-3 py-1 rounded text-xs font-medium text-slate-500 hover:text-slate-300">
                                    Text
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Flowchart Canvas Area */}
                    <div
                        className="bg-surface-dark bg-[#161b22] border border-border-dark border-[#30363d] rounded-xl min-h-[600px] relative overflow-hidden"
                        style={{
                            backgroundImage: "radial-gradient(#30363d 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                        onClick={() => setSelectedStepId(null)}
                    >
                        {/* Connector Lines (SVG) - Keeping static for now, would need dynamic calc for real app */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path
                                d="M 390 120 L 390 180"
                                fill="none"
                                stroke="#30363d"
                                strokeWidth="2"
                            ></path>
                            <path
                                d="M 390 180 L 250 220"
                                fill="none"
                                stroke="#30363d"
                                strokeWidth="2"
                            ></path>
                            <path
                                d="M 390 180 L 530 220"
                                fill="none"
                                stroke="#30363d"
                                strokeWidth="2"
                            ></path>
                            {/* Simple line for added steps if any (mock) */}
                            {steps.length > 3 && (
                                <path
                                    d="M 390 280 L 390 380"
                                    fill="none"
                                    stroke="#30363d"
                                    strokeWidth="2"
                                    strokeDasharray="4"
                                ></path>
                            )}
                        </svg>

                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`absolute ${step.position} w-64 bg-background-dark bg-[#0d1117] border rounded-lg shadow-xl p-4 z-10 transition-all cursor-pointer ${selectedStepId === step.id
                                    ? "border-primary ring-1 ring-primary"
                                    : "border-border-dark border-[#30363d] hover:border-primary/50"
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedStepId(step.id);
                                }}
                            >
                                {step.type === "start" && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Play className="w-3 h-3" /> Start
                                    </div>
                                )}
                                {step.type === "qual" && (
                                    <div className="absolute -right-2 -top-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
                                        <Edit className="w-3 h-3" />
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        {step.icon && <span>{step.icon}</span>}
                                        <h4 className="font-bold text-white text-sm">
                                            {step.title}
                                        </h4>
                                    </div>
                                    <button className="text-slate-500 hover:text-white">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-2">
                                    {step.desc}
                                </p>

                                {step.tags && (
                                    <div className="flex gap-2 mt-3">
                                        {step.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Connector Points */}
                                {step.type === "start" && (
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-500 rounded-full border-2 border-background-dark border-[#0d1117]"></div>
                                )}
                                {step.type !== "start" && (
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-500 rounded-full border-2 border-background-dark border-[#0d1117]"></div>
                                )}
                            </div>
                        ))}

                        {/* Floating Editor */}
                        {selectedStep && (
                            <div className="absolute bottom-6 right-6 w-80 bg-surface-dark bg-[#161b22] border border-border-dark border-[#30363d] rounded-lg shadow-2xl p-4 z-20 animate-in slide-in-from-bottom-5 fade-in">
                                <div className="flex justify-between items-start mb-3">
                                    <h5 className="text-sm font-bold text-white">
                                        Edit: {selectedStep.title}
                                    </h5>
                                    <button
                                        onClick={() => setSelectedStepId(null)}
                                        className="text-slate-500 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                                            Title
                                        </label>
                                        <input
                                            className="w-full bg-background-dark bg-[#0d1117] border border-border-dark border-[#30363d] rounded p-2 text-xs text-slate-300 focus:border-primary outline-none"
                                            value={selectedStep.title}
                                            onChange={(e) =>
                                                handleUpdateStep(selectedStep.id, {
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            className="w-full bg-background-dark bg-[#0d1117] border border-border-dark border-[#30363d] rounded p-2 text-xs text-slate-300 focus:border-primary outline-none resize-none h-20"
                                            value={selectedStep.desc}
                                            onChange={(e) =>
                                                handleUpdateStep(selectedStep.id, {
                                                    desc: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <button className="w-full py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-sky-400">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Right Column: AI Critique & Checklist */}
                <aside className="col-span-1 flex flex-col gap-6 h-[calc(100vh-8rem)] sticky top-6">
                    {/* AI Feedback */}
                    <div className="bg-gradient-to-b from-surface-dark from-[#161b22] to-background-dark to-[#0d1117] border border-border-dark border-[#30363d] rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-white text-sm">
                                Methodology Critique
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-primary/5 border-l-2 border-primary p-3 rounded-r">
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    <strong className="text-primary">Suggestion:</strong> Your
                                    sample size for the interviews (N=10) might be too small
                                    compared to your quantitative sample.
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <button className="text-[10px] font-bold text-primary hover:underline">
                                        Accept
                                    </button>
                                    <button className="text-[10px] font-bold text-slate-500 hover:text-slate-300">
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                            <div className="bg-red-500/5 border-l-2 border-red-500 p-3 rounded-r">
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    <strong className="text-red-500">Gap Detected:</strong> You
                                    haven't linked your data analysis method for the qualitative
                                    section yet.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Steps Checklist */}
                    <div className="flex-1 bg-surface-dark bg-[#161b22] border border-border-dark border-[#30363d] rounded-lg flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-border-dark border-[#30363d] bg-surface-dark/50 bg-[#161b22]/50 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Required Sections
                            </h3>
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                                3/7 Complete
                            </span>
                        </div>
                        <div className="overflow-y-auto p-0 flex-1 scrollbar-thin">
                            {/* Check Item */}
                            <button className="w-full flex items-center justify-between p-4 border-b border-border-dark/50 border-[#30363d]/50 hover:bg-background-dark/50 hover:bg-[#0d1117]/50 transition-colors text-left group">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-400 line-through decoration-slate-600">
                                        Research Design
                                    </h4>
                                    <p className="text-[10px] text-slate-600">
                                        Defined as Mixed-Methods
                                    </p>
                                </div>
                                <CheckCircle className="w-4 h-4 text-[#2ea043]" />
                            </button>
                            {/* Check Item */}
                            <button className="w-full flex items-center justify-between p-4 border-b border-border-dark/50 border-[#30363d]/50 bg-primary/5 hover:bg-primary/10 transition-colors text-left group border-l-2 border-l-primary">
                                <div>
                                    <h4 className="text-sm font-bold text-white">
                                        Data Collection Instruments
                                    </h4>
                                    <p className="text-[10px] text-slate-400 group-hover:text-primary transition-colors">
                                        Currently Editing
                                    </p>
                                </div>
                                <Edit className="w-4 h-4 text-primary" />
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
