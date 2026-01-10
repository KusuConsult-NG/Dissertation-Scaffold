"use client";

import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, Bell, CreditCard, Zap, Check, Github, Slack, Mail } from "lucide-react";

type Tab = "general" | "notifications" | "integrations" | "billing";

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("general");

    // Profile Form States
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [title, setTitle] = useState("");

    // Notification States
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(false);
    const [researchAlerts, setResearchAlerts] = useState(true);

    // Initialize form with session data
    React.useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
        }
    }, [session]);

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, bio, title }),
            });

            if (res.ok) {
                await update({ name });
                toast.success("Profile updated successfully");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNotifications = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    notifications: {
                        email: emailNotifications,
                        push: pushNotifications,
                        weeklyDigest,
                        researchAlerts,
                    },
                }),
            });

            if (res.ok) {
                toast.success("Notification preferences saved");
            } else {
                toast.error("Failed to save preferences");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Settings", href: "/settings" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Settings
                        </h1>
                        <p className="text-slate-500 dark:text-gray-400">
                            Manage your profile, preferences, and workspace configuration.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-slate-200 dark:border-gray-800 overflow-x-auto">
                        <nav className="-mb-px flex space-x-8 min-w-max">
                            <button
                                onClick={() => setActiveTab("general")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "general"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300"
                                    }`}
                            >
                                General
                            </button>
                            <button
                                onClick={() => setActiveTab("notifications")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "notifications"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300"
                                    }`}
                            >
                                Notifications
                            </button>
                            <button
                                onClick={() => setActiveTab("integrations")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "integrations"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300"
                                    }`}
                            >
                                Integrations
                            </button>
                            <button
                                onClick={() => setActiveTab("billing")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "billing"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300"
                                    }`}
                            >
                                Billing
                            </button>
                        </nav>
                    </div>

                    {/* General Tab */}
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Update your photo and personal details.</p>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="relative group">
                                            <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-slate-500 overflow-hidden">
                                                {session?.user?.image ? (
                                                    <Image
                                                        src={session.user.image}
                                                        alt="Profile"
                                                        width={96}
                                                        height={96}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span>{session?.user?.name?.[0] || "U"}</span>
                                                )}
                                            </div>
                                            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer text-white text-xs font-medium">
                                                Change
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            if (file.size > 1024 * 1024) {
                                                                toast.error("Image too large. Max 1MB.");
                                                                return;
                                                            }

                                                            const reader = new FileReader();
                                                            reader.onloadend = async () => {
                                                                const base64String = reader.result as string;

                                                                try {
                                                                    const res = await fetch("/api/user/update", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({ image: base64String }),
                                                                    });

                                                                    if (res.ok) {
                                                                        await update({ image: base64String });
                                                                        toast.success("Profile photo updated!");
                                                                    } else {
                                                                        toast.error("Failed to update photo.");
                                                                    }
                                                                } catch (err) {
                                                                    toast.error("Error uploading photo.");
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Profile Photo</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Recommended 400x400px.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Display Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Email</label>
                                            <input
                                                type="text"
                                                disabled
                                                value={session?.user?.email || ""}
                                                className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-slate-100 dark:bg-gray-900/50 text-slate-500 cursor-not-allowed text-sm"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Academic Title</label>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g. PhD Candidate"
                                                className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">Bio</label>
                                            <textarea
                                                rows={3}
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                placeholder="Tell us about your research..."
                                                className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white text-sm focus:ring-primary focus:border-primary"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={loading}
                                    className="bg-primary hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm">
                                <div className="p-6 border-b border-slate-200 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Manage how you receive updates.</p>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">Email Notifications</p>
                                                <p className="text-xs text-slate-500 mt-1">Receive email updates about your research</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={emailNotifications}
                                                onChange={(e) => setEmailNotifications(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-3">
                                            <Bell className="w-5 h-5 text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">Push Notifications</p>
                                                <p className="text-xs text-slate-500 mt-1">Get real-time alerts in your browser</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={pushNotifications}
                                                onChange={(e) => setPushNotifications(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">Weekly Digest</p>
                                                <p className="text-xs text-slate-500 mt-1">Summary of your research activity every week</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={weeklyDigest}
                                                onChange={(e) => setWeeklyDigest(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-3">
                                            <Zap className="w-5 h-5 text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">Research Alerts</p>
                                                <p className="text-xs text-slate-500 mt-1">Notify me about trending topics in my field</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={researchAlerts}
                                                onChange={(e) => setResearchAlerts(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNotifications}
                                    disabled={loading}
                                    className="bg-primary hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Preferences"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Integrations Tab */}
                    {activeTab === "integrations" && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm">
                                <div className="p-6 border-b border-slate-200 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Connected Services</h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Integrate with third-party tools to enhance your workflow.</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    {[
                                        {
                                            name: "GitHub",
                                            description: "Sync your code repositories and research materials",
                                            icon: <Github className="w-6 h-6" />,
                                            connected: false,
                                        },
                                        {
                                            name: "Slack",
                                            description: "Receive notifications in your Slack workspace",
                                            icon: <Slack className="w-6 h-6" />,
                                            connected: false,
                                        },
                                        {
                                            name: "Google Scholar",
                                            description: "Import citations and publications automatically",
                                            icon: <Mail className="w-6 h-6" />,
                                            connected: true,
                                        },
                                        {
                                            name: "Zotero",
                                            description: "Sync your reference library",
                                            icon: <Zap className="w-6 h-6" />,
                                            connected: false,
                                        },
                                    ].map((service, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-200 dark:border-gray-700 rounded-lg hover:border-primary/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                                                    {service.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{service.description}</p>
                                                </div>
                                            </div>
                                            {service.connected ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                                                        <Check className="w-3 h-3" />
                                                        Connected
                                                    </span>
                                                    <button className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors">
                                                        Disconnect
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => toast.info(`${service.name} integration coming soon!`)}
                                                    className="text-xs bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    Connect
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === "billing" && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm">
                                <div className="p-6 border-b border-slate-200 dark:border-gray-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Current Plan</h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Manage your subscription and billing details.</p>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Free Plan</h4>
                                            <p className="text-sm text-slate-500 mt-1">Perfect for getting started with research</p>
                                        </div>
                                        <button
                                            onClick={() => (window.location.href = "/billing")}
                                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Upgrade Plan
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-lg">
                                            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase font-medium">Projects</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">3 / 5</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-lg">
                                            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase font-medium">AI Credits</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">42 / 100</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-lg">
                                            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase font-medium">Storage</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1.2 / 5 GB</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                                        <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Payment Method</h5>
                                        <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <CreditCard className="w-5 h-5 text-slate-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">No payment method</p>
                                                    <p className="text-xs text-slate-500">Add a card to upgrade your plan</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toast.info("Payment setup coming soon!")}
                                                className="text-xs text-primary font-medium hover:underline"
                                            >
                                                Add Card
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
