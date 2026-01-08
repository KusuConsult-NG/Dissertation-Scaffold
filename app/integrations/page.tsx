import SimplePage from "../components/SimplePage";

export default function IntegrationsPage() {
    return (
        <SimplePage title="Integrations" description="Connect your favorite tools to your workflow.">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">Z</div>
                    <h3 className="font-bold mb-2">Zotero</h3>
                    <p className="text-sm text-slate-500 mb-4">Sync your citation library seamlessly.</p>
                    <button className="text-primary text-sm font-medium hover:underline">Connect</button>
                </div>
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">W</div>
                    <h3 className="font-bold mb-2">Microsoft Word</h3>
                    <p className="text-sm text-slate-500 mb-4">Export your outline directly to .docx.</p>
                    <button className="text-primary text-sm font-medium hover:underline">Connect</button>
                </div>
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">G</div>
                    <h3 className="font-bold mb-2">Google Drive</h3>
                    <p className="text-sm text-slate-500 mb-4">Backup your drafts to the cloud.</p>
                    <button className="text-primary text-sm font-medium hover:underline">Connect</button>
                </div>
                <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer opacity-50">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center mb-4 text-xl font-bold">N</div>
                    <h3 className="font-bold mb-2">Notion</h3>
                    <p className="text-sm text-slate-500 mb-4">Coming Soon</p>
                </div>
            </div>
        </SimplePage>
    );
}
