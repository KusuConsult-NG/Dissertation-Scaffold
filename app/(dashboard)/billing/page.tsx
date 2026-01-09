"use client";

import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { CreditCard, Check, Shield, Zap, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { updateUser } from "@/lib/firestore";

export default function BillingPage() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);

    // Default to free if undefined
    const plan = (session?.user?.plan || "free").toLowerCase();
    const isPro = plan === "pro";
    const isEnterprise = plan === "enterprise";

    const handleUpgrade = async (newPlan: "pro" | "enterprise") => {
        if (!session?.user?.email) return;
        setLoading(true);
        const toastId = toast.loading(`Upgrading to ${newPlan}...`);

        try {
            // Simulate payment processing delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Update user in Firestore
            await updateUser(session.user.email, { plan: newPlan });

            // Update session
            await update({
                ...session,
                user: { ...session.user, plan: newPlan }
            });

            toast.success(`Successfully upgraded to ${newPlan.charAt(0).toUpperCase() + newPlan.slice(1)}!`, { id: toastId });
        } catch (error) {
            console.error("Upgrade failed:", error);
            toast.error("Failed to process upgrade", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Billing", href: "/billing" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Billing & Subscription</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Manage your subscription plan and billing details.</p>

                    {/* Current Plan Card */}
                    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 mb-10 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Status</h3>
                                <p className="text-slate-500 mt-1">
                                    You are currently on the <span className="font-bold text-primary capitalize">{plan} Plan</span>
                                </p>
                            </div>
                            {plan !== "enterprise" && (
                                <div className="flex gap-3">
                                    {!isPro && (
                                        <button
                                            onClick={() => handleUpgrade("pro")}
                                            disabled={loading}
                                            className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                        >
                                            Upgrade to Pro
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleUpgrade("enterprise")}
                                        disabled={loading}
                                        className="px-5 py-2.5 bg-slate-900 dark:bg-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50"
                                    >
                                        Contact Enterprise
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Usage Bar */}
                        <div className="bg-slate-50 dark:bg-[#151b26] rounded-xl p-5">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">Monthly Usage limit</span>
                                <span className="text-slate-500">{isEnterprise ? "Unlimited" : isPro ? "45% Used" : "75% Used"}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${isEnterprise ? "bg-emerald-500 w-full" :
                                            isPro ? "bg-primary w-[45%]" : "bg-orange-500 w-[75%]"
                                        }`}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                {isEnterprise
                                    ? "Enterprise plans have no caps on AI generation or storage."
                                    : `Resets in 12 days. Upgrade to ${isPro ? "Enterprise" : "Pro"} for higher limits.`}
                            </p>
                        </div>
                    </div>

                    {/* Plan Comparison */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Available Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Free Plan */}
                        <div className={`rounded-xl border p-6 flex flex-col ${plan === "free" ? "bg-primary/5 border-primary ring-1 ring-primary" : "bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark"}`}>
                            <div className="mb-4">
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Free Plan</h4>
                                <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">$0 <span className="text-sm font-normal text-slate-500">/mo</span></div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Basic Dissertation Structure</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>5 AI Summaries / month</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Community Access (Read-only)</span>
                                </li>
                            </ul>
                            {plan === "free" ? (
                                <button disabled className="w-full py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm">Current Plan</button>
                            ) : (
                                <button disabled className="w-full py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 font-bold text-sm cursor-not-allowed">Downgrade</button>
                            )}
                        </div>

                        {/* Pro Plan */}
                        <div className={`rounded-xl border p-6 flex flex-col relative overflow-hidden ${plan === "pro" ? "bg-primary/5 border-primary ring-1 ring-primary" : "bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark"}`}>
                            {!isPro && !isEnterprise && <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Popular</div>}
                            <div className="mb-4">
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                    Pro Researcher <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                </h4>
                                <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">$12 <span className="text-sm font-normal text-slate-500">/mo</span></div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span><strong>Unlimited</strong> AI Summaries</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>Advanced Grant Analysis</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>Full Community Access</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>Export to LaTeX/Word</span>
                                </li>
                            </ul>
                            {plan === "pro" ? (
                                <button disabled className="w-full py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm">Current Plan</button>
                            ) : (
                                <button
                                    onClick={() => handleUpgrade("pro")}
                                    disabled={loading || isEnterprise}
                                    className="w-full py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
                                >
                                    {isEnterprise ? "Included" : "Upgrade Now"}
                                </button>
                            )}
                        </div>

                        {/* Enterprise Plan */}
                        <div className={`rounded-xl border p-6 flex flex-col ${plan === "enterprise" ? "bg-slate-900 text-white border-slate-700" : "bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark"}`}>
                            <div className="mb-4">
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                    Institute <Shield className="w-4 h-4 text-purple-500" />
                                </h4>
                                <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">$49 <span className="text-sm font-normal text-slate-500">/mo</span></div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <span>Everything in Pro</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <span>Team Collaboration Tools</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <span>API Access</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                    <span>Priority Support</span>
                                </li>
                            </ul>
                            {plan === "enterprise" ? (
                                <button disabled className="w-full py-2 rounded-lg bg-white/10 text-white font-bold text-sm">Current Plan</button>
                            ) : (
                                <button
                                    onClick={() => handleUpgrade("enterprise")}
                                    disabled={loading}
                                    className="w-full py-2 rounded-lg border-2 border-slate-900 dark:border-slate-600 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                                >
                                    Contact Sales
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
