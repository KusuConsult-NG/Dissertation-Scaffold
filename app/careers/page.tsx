import SimplePage from "../components/SimplePage";

export default function CareersPage() {
    return (
        <SimplePage title="Careers" description="Join us in shaping the future of research.">
            <p>
                We are always looking for talented individuals to join our team. If you are passionate about academia, technology, and making a real impact, we want to hear from you.
            </p>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Open Positions</h3>
                <div className="space-y-4">
                    <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Senior Full Stack Engineer</h4>
                            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Remote</span>
                        </div>
                        <p className="text-slate-500 text-sm">Help us build the next generation of our dissertation scaffolding engine.</p>
                    </div>
                    <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">AI Research Scientist</h4>
                            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">London / Remote</span>
                        </div>
                        <p className="text-slate-500 text-sm">Work on our core NLP models for literature synthesis and novelty scoring.</p>
                    </div>
                </div>
            </div>
            <p className="mt-8 text-sm text-slate-500">
                Don&apos;t see a role that fits? Email us at careers@dissertationscaffold.com
            </p>
        </SimplePage>
    );
}
