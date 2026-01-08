"use client";

import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Bell, Clock, AlertCircle, CheckCircle } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            title: "Grant Application Deadline approaching",
            message: "The NIH R01 grant application is due in 3 days.",
            time: "2 hours ago",
            type: "alert",
            read: false,
        },
        {
            id: 2,
            title: "New Novelty Score Available",
            message: "Your latest methodology draft has been scored: 8.5/10.",
            time: "Yesterday",
            type: "success",
            read: true,
        },
        {
            id: 3,
            title: "System Maintenance",
            message: "The platform will be undergoing scheduled maintenance on Saturday.",
            time: "2 days ago",
            type: "info",
            read: true,
        },
    ];

    return (
        <>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Account" },
                    { label: "Notifications", href: "/notifications" },
                ]}
            />
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
                        <button className="text-sm text-primary hover:underline">Mark all as read</button>
                    </div>

                    <div className="space-y-4">
                        {notifications.map((note) => (
                            <div
                                key={note.id}
                                className={`p-4 rounded-xl border transition-colors flex gap-4 ${note.read
                                        ? "bg-white dark:bg-card-dark border-slate-200 dark:border-border-dark"
                                        : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                                    }`}
                            >
                                <div className={`mt-1 p-2 rounded-full ${note.type === "alert" ? "bg-red-100 text-red-600" :
                                        note.type === "success" ? "bg-green-100 text-green-600" :
                                            "bg-blue-100 text-blue-600"
                                    }`}>
                                    {note.type === "alert" ? <AlertCircle className="w-5 h-5" /> :
                                        note.type === "success" ? <CheckCircle className="w-5 h-5" /> :
                                            <Bell className="w-5 h-5" />
                                    }
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-sm font-bold ${note.read ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"}`}>
                                        {note.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        {note.message}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-3">
                                        <Clock className="w-3 h-3" />
                                        <span>{note.time}</span>
                                    </div>
                                </div>
                                {!note.read && (
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
