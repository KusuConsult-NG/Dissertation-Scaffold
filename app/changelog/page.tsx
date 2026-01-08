import SimplePage from "../components/SimplePage";

export default function ChangelogPage() {
    return (
        <SimplePage title="Changelog" description="See what is new in Dissertation Scaffold.">
            <div className="space-y-12">
                <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-[#0d121c]"></div>
                    <span className="text-sm font-mono text-slate-500 mb-2 block">v2.1.0 • January 8, 2026</span>
                    <h3 className="text-xl font-bold mb-4">The "Smart Scaffold" Update</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Check out the new <span className="font-bold text-primary">Smart Outlining</span> engine.</li>
                        <li>Added <span className="font-bold text-primary">Grant Calendar</span> with sync capabilities.</li>
                        <li>Reduced literature synthesis latency by 40%.</li>
                        <li>Fixed minor bugs in the settings profile update flow.</li>
                    </ul>
                </div>
                <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-[#0d121c]"></div>
                    <span className="text-sm font-mono text-slate-500 mb-2 block">v2.0.0 • December 15, 2025</span>
                    <h3 className="text-xl font-bold mb-4">Next.js Migration</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Complete rewrite in Next.js 14 and React Server Components.</li>
                        <li>Enhanced SEO and performance matching.</li>
                        <li>New Dark Mode support.</li>
                    </ul>
                </div>
            </div>
        </SimplePage>
    );
}
