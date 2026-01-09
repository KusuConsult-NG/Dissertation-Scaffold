"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

const sourceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    authors: z.string().min(1, "Authors are required"),
    year: z.string().regex(/^\d{4}$/, "Must be a 4-digit year"),
    type: z.enum(["Journal Article", "Conference Paper", "Book Chapter", "Book", "Thesis", "Other"]),
    source: z.string().min(1, "Source/Journal name is required"),
    abstract: z.string().optional(),
    tags: z.string().optional(), // Comma separated
});

type SourceFormData = z.infer<typeof sourceSchema>;

interface AddSourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SourceFormData) => void;
    isSubmitting: boolean;
}

export default function AddSourceModal({ isOpen, onClose, onSubmit, isSubmitting }: AddSourceModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SourceFormData>({
        resolver: zodResolver(sourceSchema),
        defaultValues: {
            type: "Journal Article",
        }
    });

    const handleFormSubmit = (data: SourceFormData) => {
        onSubmit(data);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1a2230] rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Add New Source</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form id="add-source-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                            <input
                                {...register("title")}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                placeholder="e.g. Quantum Supremacy"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                                <select
                                    {...register("type")}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option>Journal Article</option>
                                    <option>Conference Paper</option>
                                    <option>Book Chapter</option>
                                    <option>Book</option>
                                    <option>Thesis</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Year</label>
                                <input
                                    {...register("year")}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="2024"
                                />
                                {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Authors</label>
                            <input
                                {...register("authors")}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Smith, J., Doe, A."
                            />
                            {errors.authors && <p className="text-red-500 text-xs mt-1">{errors.authors.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Source / Journal</label>
                            <input
                                {...register("source")}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Nature"
                            />
                            {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tags (comma separated)</label>
                            <input
                                {...register("tags")}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                placeholder="#physics, #quantum"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Abstract</label>
                            <textarea
                                {...register("abstract")}
                                rows={4}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                                placeholder="Paste the abstract here..."
                            />
                        </div>
                    </form>
                </div>

                <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        form="add-source-form"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? "Adding..." : "Add Source"}
                    </button>
                </div>
            </div>
        </div>
    );
}
