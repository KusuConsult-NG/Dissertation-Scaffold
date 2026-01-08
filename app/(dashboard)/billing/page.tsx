"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { CreditCard, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BillingPage() {
    const { data: session } = useSession();
    const plan = (session?.user?.plan || "free").toLowerCase();
    const isPro = plan === "pro";
    const isEnterprise = plan === "enterprise";

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Billing", href: "/billing" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Billing & Subscription</h1>

                    {/* Current Plan */}
                    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Plan</h3>
                                <p className="text-slate-500 text-sm">You are currently on the <span className="font-semibold text-primary capitalize">{plan} Plan</span></p>
                            </div>
                            {!isEnterprise && (
                                <Link href="/pricing" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
                                    {isPro ? "Upgrade to Enterprise" : "Upgrade Plan"}
                                </Link>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-sm p-4 bg-slate-50 dark:bg-[#151b26] rounded-lg mb-4">
                            <CreditCard className="w-5 h-5 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">
                                {isPro || isEnterprise ? "Payment via Paystack" : "No payment method on file"}
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full bg-primary ${isPro ? "w-[10%]" : "w-[75%]"}`}></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>{isPro ? "Unlimited Usage" : "75% of Free Plan limits used"}</span>
                            <span>{isPro ? "Active" : "Reset in 12 days"}</span>
                        </div>
                    </div>

                    {/* Invoices */}
                    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Invoices</h3>
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-[#151b26] rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <FileIcon />
                            </div>
                            <p className="text-slate-900 dark:text-white font-medium">No invoices yet</p>
                            <p className="text-slate-500 text-sm">When you subscribe, your invoices will appear here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function FileIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
    )
}
