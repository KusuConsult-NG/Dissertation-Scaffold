"use client";

import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Check, Shield } from "lucide-react";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const plans = [
    {
        name: "Free",
        price: 0,
        description: "Essential tools for early-stage researchers.",
        features: ["Basic Outline Generator", "Limit 10 Sources", "Community Access"],
        color: "slate",
    },
    {
        name: "Pro",
        price: 500000, // 5000 NGN in kobo
        displayPrice: "₦5,000",
        description: "Advanced AI for serious scholars.",
        features: [
            "Unlimited AI Outlines",
            "Unlimited Sources",
            "Grant Potential Analysis",
            "Novelty Scoring",
            "Priority Support",
        ],
        color: "primary",
        recommended: true,
    },
    {
        name: "Enterprise",
        price: 2500000, // 25000 NGN in kobo
        displayPrice: "₦25,000",
        description: "For labs and research groups.",
        features: [
            "Team Collaboration",
            "Admin Dashboard",
            "API Access",
            "Custom Integrations",
            "Dedicated Account Manager",
        ],
        color: "purple",
    },
];

export default function PricingPage() {
    const { data: session, update } = useSession();
    const [processing, setProcessing] = useState(false);

    const handlePaymentSuccess = async (reference: any, planName: string) => {
        setProcessing(true);
        try {
            // Verify payment with backend
            const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reference: reference.reference || reference.trxref || reference,
                    plan: planName,
                }),
            });

            const data = await verifyResponse.json();

            if (data.success) {
                // Update session with new plan
                await update({ plan: data.plan });
                toast.success(`Successfully upgraded to ${planName} plan!`);
            } else {
                toast.error(data.error || "Payment verification failed");
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Failed to verify payment. Please contact support.");
        } finally {
            setProcessing(false);
        }
    };

    const handlePaymentCancel = () => {
        toast.info("Payment cancelled");
        setProcessing(false);
    };

    const handleFreeClick = () => {
        toast.success("You are already on the Free plan!");
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Pricing", href: "/pricing" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-6xl mx-auto pb-20">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                            Invest in Your Research Career
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-gray-400">
                            Unlock the full power of Dissertation Scaffold with our Pro plans.
                            Accelerate your writing and funding.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => {
                            const componentProps = plan.price > 0 && session?.user?.email ? {
                                reference: new Date().getTime().toString(),
                                email: session.user.email,
                                amount: plan.price,
                                publicKey: "pk_test_3e87802dae281fbeb004f2b0f741a6e662aba103",
                                metadata: {
                                    custom_fields: [
                                        {
                                            display_name: "Plan",
                                            variable_name: "plan",
                                            value: plan.name
                                        }
                                    ]
                                },
                                channels: ['card', 'bank', 'ussd'] as Array<'card' | 'bank' | 'ussd'>,
                                onSuccess: (reference: any) => handlePaymentSuccess(reference, plan.name),
                                onClose: handlePaymentCancel,
                            } : null;

                            return (
                                <div
                                    key={plan.name}
                                    className={`relative rounded-2xl bg-white dark:bg-card-dark border ${plan.recommended
                                            ? "border-primary shadow-xl shadow-primary/10 ring-2 ring-primary ring-opacity-50"
                                            : "border-slate-200 dark:border-gray-800"
                                        } p-8 flex flex-col`}
                                >
                                    {plan.recommended && (
                                        <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {plan.name}
                                        </h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                                {plan.price === 0 ? "Free" : plan.displayPrice}
                                            </span>
                                            {plan.price > 0 && (
                                                <span className="text-slate-500">/month</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-gray-400 mt-4">
                                            {plan.description}
                                        </p>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <div className="mt-0.5 p-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                <span className="text-sm text-slate-700 dark:text-gray-300">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.price === 0 ? (
                                        <button
                                            onClick={handleFreeClick}
                                            className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-gray-700"
                                        >
                                            Current Plan
                                        </button>
                                    ) : componentProps ? (
                                        <PaystackButton
                                            {...componentProps}
                                            className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25"
                                            text={processing ? "Processing..." : "Upgrade Now"}
                                            disabled={processing}
                                        />
                                    ) : (
                                        <button
                                            onClick={() => toast.error("Please sign in to upgrade")}
                                            className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25"
                                        >
                                            Upgrade Now
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                            <Shield className="w-4 h-4" />
                            Secure payment processing by Paystack. Cancel anytime.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
