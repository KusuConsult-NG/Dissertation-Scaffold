import SimplePage from "../components/SimplePage";

export default function HelpPage() {
    return (
        <SimplePage title="Help Center" description="Need assistance? We are here to help.">
            <div className="max-w-xl mx-auto text-center py-12">
                <div className="mb-8">
                    <span className="material-symbols-outlined text-6xl text-primary">support_agent</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Contact Support</h3>
                <p className="text-slate-600 mb-8">
                    Our team is available Monday to Friday, 9am - 5pm EST. We typically respond within 24 hours.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-left">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" placeholder="you@university.edu" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input type="text" className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm" placeholder="I need help with..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm h-32" placeholder="Describe your issue..." />
                        </div>
                        <button type="button" className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">Send Message</button>
                    </form>
                </div>
            </div>
        </SimplePage>
    );
}
