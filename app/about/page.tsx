import SimplePage from "../components/SimplePage";

export default function AboutPage() {
    return (
        <SimplePage title="About Us" description="Empowering the next generation of academic excellence.">
            <p>
                Dissertation Scaffold was born out of a simple frustration: the academic tools available today are either too simple (basic text editors) or too complex (unintuitive citation managers). There was nothing designed to handle the holistic <em>structure</em> of a dissertation.
            </p>
            <p>
                Our mission is to democratize access to high-quality research tools. We believe that every student, regardless of their institution's prestige, deserves the best chance to publish groundbreaking work.
            </p>
            <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                    <h4 className="text-4xl font-bold text-primary mb-2">10k+</h4>
                    <p className="text-slate-500">Users Worldwide</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                    <h4 className="text-4xl font-bold text-primary mb-2">150+</h4>
                    <p className="text-slate-500">University Partners</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                    <h4 className="text-4xl font-bold text-primary mb-2">$10M+</h4>
                    <p className="text-slate-500">Grants Secured</p>
                </div>
            </div>
            <h3>Our Team</h3>
            <p>
                We are a diverse team of former academics, data scientists, and software engineers who are passionate about accelerating scientific discovery.
            </p>
        </SimplePage>
    );
}
