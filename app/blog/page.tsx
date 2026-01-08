import SimplePage from "../components/SimplePage";

export default function BlogPage() {
    return (
        <SimplePage title="Blog" description="Insights, tips, and news for the modern researcher.">
            <div className="grid gap-8 mt-4">
                {/* Blog Post 1 */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-card-dark">
                    <div className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center text-slate-400">
                        <span>Cover Image</span>
                    </div>
                    <div className="p-6">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Research Tips</span>
                        <h3 className="text-xl font-bold mt-2 mb-3 text-slate-900 dark:text-white">How to structure your literature review in 5 days</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            Stop drowning in PDFs. Here is a step-by-step framework to synthesize hundreds of papers efficiently.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>Oct 24, 2025</span>
                            <span>•</span>
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>
                {/* Blog Post 2 */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-card-dark">
                    <div className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center text-slate-400">
                        <span>Cover Image</span>
                    </div>
                    <div className="p-6">
                        <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Grants</span>
                        <h3 className="text-xl font-bold mt-2 mb-3 text-slate-900 dark:text-white">The hidden patterns in winning grant proposals</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            We analyzed 10,000 successful NSF and NIH grants. Here is what they all had in common.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>Oct 18, 2025</span>
                            <span>•</span>
                            <span>8 min read</span>
                        </div>
                    </div>
                </div>
            </div>
        </SimplePage>
    );
}
