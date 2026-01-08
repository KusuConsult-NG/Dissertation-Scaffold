import SimplePage from "../components/SimplePage";
import Link from "next/link";

export default function DocsPage() {
    return (
        <SimplePage title="Documentation" description="Learn how to get the most out of Dissertation Scaffold.">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Getting Started</h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li><Link href="#" className="hover:text-primary">Quick Start Guide</Link></li>
                        <li><Link href="#" className="hover:text-primary">Setting up your profile</Link></li>
                        <li><Link href="#" className="hover:text-primary">Importing your first paper</Link></li>
                    </ul>
                </div>
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Features</h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li><Link href="#" className="hover:text-primary">Using the Smart Outliner</Link></li>
                        <li><Link href="#" className="hover:text-primary">Grant Calendar Integrations</Link></li>
                        <li><Link href="#" className="hover:text-primary">Exporting to LaTeX/Word</Link></li>
                    </ul>
                </div>
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">API Reference</h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li><Link href="#" className="hover:text-primary">Authentication</Link></li>
                        <li><Link href="#" className="hover:text-primary">Endpoints</Link></li>
                        <li><Link href="#" className="hover:text-primary">Rate Limits</Link></li>
                    </ul>
                </div>
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Troubleshooting</h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li><Link href="#" className="hover:text-primary">Common Errors</Link></li>
                        <li><Link href="#" className="hover:text-primary">System Status</Link></li>
                        <li><Link href="#" className="hover:text-primary">Contact Support</Link></li>
                    </ul>
                </div>
            </div>
        </SimplePage>
    );
}
