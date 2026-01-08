"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = React.useState(false);

    // Form States
    const [name, setName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [title, setTitle] = React.useState("");

    // Initialize form with session data
    React.useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            // In a real app we would extend the session type, but for demo we can fetch or assume defaults
            // For this mock, let's just use what we have in the session or defaults
        }
    }, [session]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, bio, title }),
            });

            if (res.ok) {
                await update({ name }); // Optimistically update session
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
                            <a href="#" className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">General</a>
                            <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Notifications</a>
                            <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Integrations</a>
                            <a href="#" className="border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Billing</a>
                        </nav>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Update your photo and personal details.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-slate-500 overflow-hidden">
                                        {/* Mock Image Display */}
                                        {session?.user?.image ? (
                                            <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
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
                                                    if (file.size > 1024 * 1024) { // 1MB limit for mock db
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

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3">
                        <button className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-primary hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
