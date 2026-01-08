import Link from "next/link";
import React from "react";

export default function LandingPage() {
    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b border-gray-200 -border-dark bg-white/80 -[#111318]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="size-8 text-primary">
                                <svg
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    ></path>
                                    <path
                                        clipRule="evenodd"
                                        d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <span className="text-xl font-serif font-bold tracking-tight -white">
                                Dissertation Scaffold
                            </span>
                        </div>
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                className="text-sm font-medium text-slate-600 -slate-300 hover:text-primary transition-colors"
                                href="/trends"
                            >
                                Trends
                            </Link>
                            <Link
                                className="text-sm font-medium text-slate-600 -slate-300 hover:text-primary transition-colors"
                                href="/grants"
                            >
                                Grants
                            </Link>
                            <Link
                                className="text-sm font-medium text-slate-600 -slate-300 hover:text-primary transition-colors"
                                href="/novelty"
                            >
                                Novelty
                            </Link>
                            <Link
                                className="text-sm font-medium text-slate-600 -slate-300 hover:text-primary transition-colors"
                                href="/methodology"
                            >
                                Methodology
                            </Link>
                            <Link
                                className="text-sm font-medium text-slate-600 -slate-300 hover:text-primary transition-colors"
                                href="/community"
                            >
                                Community
                            </Link>
                        </div>
                        {/* CTA */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="hidden sm:flex h-9 px-4 items-center justify-center rounded-lg border border-gray-200 -border-dark bg-white -card-dark text-sm font-medium text-slate-900 -white hover:bg-gray-50 :bg-gray-800 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="h-9 px-4 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Split Hero Section */}
            <header className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
                <div
                    className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 70% 30%, #135bec 0%, transparent 40%)",
                    }}
                ></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Text Content */}
                        <div className="flex flex-col gap-6 text-center lg:text-left">
                            <div className="inline-flex mx-auto lg:mx-0 items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit">
                                <span className="material-symbols-outlined text-primary text-[18px]">
                                    verified
                                </span>
                                <span className="text-xs font-bold text-primary uppercase tracking-wide">
                                    Trusted by 150+ Universities
                                </span>
                            </div>
                            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 -white">
                                Structure Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 italic">
                                    Scholarship.
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 -slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                The definitive scaffold for managing complex dissertations and
                                securing competitive grants. Join over 10,000 researchers
                                transforming chaotic notes into published success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link
                                    href="/signup"
                                    className="h-12 px-8 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-base shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Start Free Trial</span>
                                    <span className="material-symbols-outlined text-[20px]">
                                        arrow_forward
                                    </span>
                                </Link>
                                <button className="h-12 px-8 rounded-lg border border-slate-200 -slate-700 hover:bg-slate-50 :bg-slate-800 text-slate-900 -white font-semibold text-base transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">
                                        play_circle
                                    </span>
                                    <span>View Demo</span>
                                </button>
                            </div>
                            <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 -slate-400">
                                <div className="flex -space-x-2">
                                    <div
                                        className="w-8 h-8 rounded-full border-2 border-white -background-dark bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCsXusqlNt_Q0ga0JG-UnqBpU2tlVTmO2B-B6VE6sDwaUTChSaN5QxHSF0EFFPAkyWD7joHkUSJIYnly-u4Cb7shqKmrRFd-bYJ8HYev9Jvto8k00Lyx7P1G1RvLSUyU_s24iBfll1es5kRczNpzsM293Z-8_JKEdlGswnpr0VRE5Yo9LBgI4HP6o6PXWbuCn7PiIM3piT2ZCGZwg2rDcrVyH_DpARV7OSJ1NYkflUgdrhr7187A2-egSyXcJvTDqJeikFWDLZzoio")',
                                        }}
                                    />
                                    <div
                                        className="w-8 h-8 rounded-full border-2 border-white -background-dark bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs3A4I8iELGYNvplaP1f6GQ0QT42w6W04k4EZ5lLY3LpOV4sNP3Htp0Mx4DMHwN9OcqCuZVub_Y3o8l5KvBWqgqDRQjOnRV0Y-2UNze-he4lHwZ9e6OaFhQ1CGlv6JH2vZq3QyiNGXfAcTUHJoZdV_MVut02jglSbRZzcgQOAOzs7A80GvDCpGA2-50_zkjrvzV3VMl3-7Ct_lEZoWZn0GeDnqTJTvn5yP-gvehTCxjDhluzDusgV_SYHs75sJzMeE9CoW0MxbSX4")',
                                        }}
                                    />
                                    <div
                                        className="w-8 h-8 rounded-full border-2 border-white -background-dark bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAR9hT-68KE-E1C8gDv4t_jC82wlKHqW7FOrJEjRn75HEYsFL03HQVMHrGDeg1MzF1KBimpyImUhT0KZuBuikIuTcCV9hofPsJiwIY_kYTW1qVAWJeFFGaT-alCynlyFDC6Qx31S53gqnvs6bwKLowlqYnA5MeNZCIWG5-5qRxPo0GgbvcccwfYPkxBp7rxS0-bwLqjsUTBt71nljCWz-hZE8a6QEqDzmuL1G81wmBvXh7nzISwcwGR2rdHaRRHLs_ENsXguLgM9u0")',
                                        }}
                                    />
                                    <div className="w-8 h-8 rounded-full border-2 border-white -background-dark bg-slate-200 -slate-700 flex items-center justify-center text-[10px] font-bold">
                                        +2k
                                    </div>
                                </div>
                                <p>Researchers joined this week</p>
                            </div>
                        </div>
                        {/* Visual Content */}
                        <div className="relative lg:h-[600px] w-full flex items-center justify-center perspective-1000">
                            {/* Abstract Background shape */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
                            {/* Main Dashboard Card Mockup */}
                            <div className="relative z-10 w-full max-w-lg bg-white -[#1c1f27] rounded-xl border border-slate-200 -slate-800 shadow-2xl overflow-hidden transform rotate-y-12 transition-transform duration-500 hover:rotate-0">
                                {/* Fake browser chrome */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 -slate-800 bg-slate-50 -[#161920]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="ml-4 h-5 w-48 rounded-md bg-slate-200 -slate-700/50"></div>
                                </div>
                                {/* Dashboard Inner Content */}
                                <div className="p-6 grid gap-6">
                                    {/* Top stats row */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 rounded-lg bg-slate-50 -[#252a36]">
                                            <div className="text-xs text-slate-500 uppercase font-semibold">
                                                Citations
                                            </div>
                                            <div className="text-xl font-bold text-slate-900 -white mt-1">
                                                1,248
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-slate-50 -[#252a36]">
                                            <div className="text-xs text-slate-500 uppercase font-semibold">
                                                Sources
                                            </div>
                                            <div className="text-xl font-bold text-slate-900 -white mt-1">
                                                342
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-primary/10">
                                            <div className="text-xs text-primary uppercase font-semibold">
                                                Progress
                                            </div>
                                            <div className="text-xl font-bold text-primary mt-1">
                                                78%
                                            </div>
                                        </div>
                                    </div>
                                    {/* Graph area */}
                                    <div className="h-32 rounded-lg bg-slate-50 -[#252a36] relative overflow-hidden flex items-end justify-between px-2 pb-2 gap-1">
                                        {/* Fake bars */}
                                        <div className="w-full bg-primary/20 h-[40%] rounded-sm"></div>
                                        <div className="w-full bg-primary/40 h-[60%] rounded-sm"></div>
                                        <div className="w-full bg-primary/30 h-[30%] rounded-sm"></div>
                                        <div className="w-full bg-primary/60 h-[80%] rounded-sm"></div>
                                        <div className="w-full bg-primary/50 h-[50%] rounded-sm"></div>
                                        <div className="w-full bg-primary h-[90%] rounded-sm"></div>
                                    </div>
                                    {/* List items */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 :bg-[#252a36] transition-colors cursor-pointer border border-transparent hover:border-slate-200 :border-slate-700">
                                            <div className="p-2 rounded bg-green-500/20 text-green-500">
                                                <span className="material-symbols-outlined text-[18px]">
                                                    check_circle
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold -white">
                                                    Literature Review Draft
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Completed 2h ago
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 :bg-[#252a36] transition-colors cursor-pointer border border-transparent hover:border-slate-200 :border-slate-700">
                                            <div className="p-2 rounded bg-amber-500/20 text-amber-500">
                                                <span className="material-symbols-outlined text-[18px]">
                                                    schedule
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold -white">
                                                    Grant Application Deadline
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Due in 3 days
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating decorative card */}
                            <div
                                className="absolute -bottom-6 -left-6 z-20 bg-card-dark p-4 rounded-lg border border-border-dark shadow-xl animate-bounce"
                                style={{ animationDuration: "3s" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary rounded-full p-1.5 text-white">
                                        <span className="material-symbols-outlined text-[20px]">
                                            school
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Funding Secured</div>
                                        <div className="text-sm font-bold text-white">
                                            $125,000.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Stats Section */}
            <section className="border-y border-slate-200 -border-dark bg-white -[#1a2230]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 -slate-800/50">
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900 -white font-serif">
                                $10M+
                            </span>
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Grants Won
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900 -white font-serif">
                                5,000+
                            </span>
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Filed Dissertations
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900 -white font-serif">
                                12k
                            </span>
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Active Researchers
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-slate-900 -white font-serif">
                                150+
                            </span>
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Partner Universities
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* Feature Section */}
            <section className="py-24 bg-background-light -background-dark relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 -white mb-4">
                            Engineered for Academic Rigor
                        </h2>
                        <p className="text-lg text-slate-600 -slate-400">
                            Our platform bridges the gap between chaotic notes and published
                            success with tools designed specifically for the modern scholar.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: Smart Outlining */}
                        <Link href="/methodology" className="group relative overflow-hidden rounded-2xl bg-white/50 -card-dark/50 backdrop-blur-sm border border-slate-200 -border-dark p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent -blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[32px]">
                                        account_tree
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 -white mb-3 group-hover:text-primary transition-colors">
                                    Smart Outlining
                                </h3>
                                <p className="text-slate-600 -slate-400 leading-relaxed">
                                    Automatically structure your thesis with AI-driven templates
                                    approved by top universities. Focus on the content, not the
                                    format.
                                </p>
                            </div>
                        </Link>
                        {/* Feature 2: Grant Calendar */}
                        <Link href="/grants" className="group relative overflow-hidden rounded-2xl bg-white/50 -card-dark/50 backdrop-blur-sm border border-slate-200 -border-dark p-8 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent -purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[32px]">
                                        calendar_month
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 -white mb-3 group-hover:text-purple-500 transition-colors">
                                    Grant Calendar
                                </h3>
                                <p className="text-slate-600 -slate-400 leading-relaxed">
                                    Never miss a funding deadline. Our integrated global grant
                                    tracking system alerts you to opportunities relevant to your
                                    field.
                                </p>
                            </div>
                        </Link>
                        {/* Feature 3: Literature Synthesis */}
                        <Link href="/literature" className="group relative overflow-hidden rounded-2xl bg-white/50 -card-dark/50 backdrop-blur-sm border border-slate-200 -border-dark p-8 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent -emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[32px]">
                                        hub
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 -white mb-3 group-hover:text-emerald-500 transition-colors">
                                    Literature Synthesis
                                </h3>
                                <p className="text-slate-600 -slate-400 leading-relaxed">
                                    Connect themes across hundreds of sources with our visual
                                    knowledge graph. See the gaps in research instantly.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            {/* Testimonial Section (Split layout variant) */}
            <section className="py-24 bg-white -[#1a2230]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHwsF86SOH6-NNPqazVtGqHGuEeshdBZP5ib0CxBPHUdLXzEepqb4uFg3iRenpdRjCR296_fuwwr7Jfsq-yysPqZZ93LQ9g4-uoCobDOC1Gr-Rb3g2AQ8ukrtBSBUXDm8OPN8zCMCJz_mLQo47EWPr3lxyglVOl3nnf9tP-4lRQluf_XPmYEyUy08LA38TlCpftfN3phGArowgLJQdZTQDUfmRUM0IRx8QTxjd5KpfOzlA-XGkNd5eO9gg2aIVx24clqc6IorBx3g")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-yellow-400">
                                        star
                                    </span>
                                    <span className="material-symbols-outlined text-yellow-400">
                                        star
                                    </span>
                                    <span className="material-symbols-outlined text-yellow-400">
                                        star
                                    </span>
                                    <span className="material-symbols-outlined text-yellow-400">
                                        star
                                    </span>
                                    <span className="material-symbols-outlined text-yellow-400">
                                        star
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-slate-200">
                                    "The single most important tool in my PhD toolkit."
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-primary font-bold tracking-wide uppercase text-sm mb-2">
                                Success Stories
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 -white mb-6">
                                "Dissertation Scaffold helped me secure a $50k grant and finish
                                my thesis 6 months early."
                            </h2>
                            <p className="text-lg text-slate-600 -slate-400 mb-8 italic">
                                The structured approach to literature review and the automated
                                citation management saved me hundreds of hours of manual work.
                            </p>
                            <div className="flex items-center gap-4">
                                <div
                                    className="h-12 w-12 rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjVWWUowSvvxyYrtBCDUL3C_rYJR36ssLa6Ia9hNlnR7HAQ5_M-Nr9U3t69NUQX6Y_kbReY6HETh2ERbOIgvkekVBBCPFhmVIuGeDzLs0KZWQltko4CXGM_6v9Kvdg9rPeIW0kay8yu7k2rsvWt0o21yn7as9uCws5t6aRt7FbCDcWYMYFHipES-i19ZP232kSlzTFHxtsMcWYN14l5u61yXHkcB5RptLCZM3uVeGDJSw5xoBylhdKskhpqtrddCAIOEnDWF1xgAE")',
                                    }}
                                ></div>
                                <div>
                                    <div className="font-bold text-slate-900 -white">
                                        Dr. Sarah Jenkins
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        Postdoctoral Fellow, Neuroscience
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-background-light -background-dark border-t border-slate-200 -border-dark pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4 text-slate-900 -white">
                                <div className="size-6 text-primary">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 48 48"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                        ></path>
                                        <path
                                            clipRule="evenodd"
                                            d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <span className="text-lg font-serif font-bold">
                                    Dissertation Scaffold
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm max-w-xs mb-6">
                                Empowering the next generation of researchers with tools built for
                                rigor, clarity, and success.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    className="text-slate-400 hover:text-primary transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined">
                                        alternate_email
                                    </span>
                                </Link>
                                <Link
                                    className="text-slate-400 hover:text-primary transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined">public</span>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 -white mb-4">
                                Platform
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-500 -slate-400">
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/#features">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/pricing">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/integrations">
                                        Integrations
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/changelog">
                                        Changelog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 -white mb-4">
                                Resources
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-500 -slate-400">
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/docs">
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/docs">
                                        API Reference
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/community">
                                        Community
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/help">
                                        Help Center
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 -white mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-500 -slate-400">
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/about">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/blog">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/careers">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-primary transition-colors" href="/terms">
                                        Legal
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 -border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>© 2024 Dissertation Scaffold. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link className="hover:text-primary transition-colors" href="/privacy">
                                Privacy Policy
                            </Link>
                            <Link className="hover:text-primary transition-colors" href="/terms">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
