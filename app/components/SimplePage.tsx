import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SimplePageProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export default function SimplePage({ title, description, children }: SimplePageProps) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0d121c] flex flex-col">
            <div className="max-w-4xl mx-auto w-full px-6 py-12 md:py-20 flex-1">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
                <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                            {description}
                        </p>
                    )}
                    <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                        {children || (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                    <span className="text-2xl">🚧</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Under Construction
                                </h3>
                                <p className="text-slate-500 mt-2">
                                    We are working hard to bring you this content. Please check back later.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] py-8 text-center text-sm text-slate-500">
                <p>© 2024 Dissertation Scaffold. All rights reserved.</p>
            </footer>
        </div>
    );
}
