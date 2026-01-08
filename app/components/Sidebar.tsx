"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
    LayoutDashboard,
    TrendingUp,
    FileText,
    PieChart,
    Zap,
    Award,
    Share2,
    BookOpen,
    Users,
    CreditCard,
    Bell,
    Settings
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Drafting", href: "/drafting", icon: FileText },
        { label: "Trends", href: "/trends", icon: TrendingUp },
        { label: "Analysis", href: "/analysis", icon: PieChart },
        { label: "Grants", href: "/grants", icon: Zap },
        { label: "Novelty", href: "/novelty", icon: Award },
        { label: "Methodology", href: "/methodology", icon: Share2 },
        { label: "Literature", href: "/literature", icon: BookOpen },
        { label: "Community", href: "/community", icon: Users },
        { label: "Integrations", href: "/tools", icon: PieChart },
        { label: "Billing", href: "/billing", icon: CreditCard },
        { label: "Notifications", href: "/notifications", icon: Bell },
        { label: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <aside className="w-72 bg-white dark:bg-[#1a2230] border-r border-[#f0f2f4] dark:border-[#2a3441] flex flex-col flex-shrink-0 z-20">
            <div className="p-6 flex flex-col h-full justify-between">
                <div className="flex flex-col gap-8">
                    {/* Branding/User */}
                    <div className="flex gap-4 items-center">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABo9kXH3SbAFQ2t2KBv-CIwvZ8JZf2WPx6esBp9eHh4WEY-EAH7PEqY1x0ndoSISc6M4nv7M7IZQpjdUvz4uGfaMqJzMByOJCKVmMwsZpnqSbX0Ch6FY0MAaWojkSpJRwD2ZZ4J-HXB2URiKIkpgy0B8F3t7Jf5tVysa1RMjIRU240TSzruxJxy5NeCGN_urAfetTGqthibHhDM-0aDaA1r8W5H2T1qqVbW31LY6yrJBawnjl6t8P6TWTpgMlzX3zycwYkUHHDHj8")',
                            }}
                        />
                        <div className="flex flex-col">
                            <h1 className="text-base font-bold leading-tight dark:text-white">
                                Dr. Researcher
                            </h1>
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
                                Project: Quantum Ethics
                            </p>
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-[#616f89] dark:text-gray-400 hover:bg-background-light dark:hover:bg-[#2a3441]"
                                    )}
                                >
                                    <Icon
                                        className={clsx(
                                            "w-6 h-6 transition-colors",
                                            isActive ? "stroke-current" : "group-hover:text-primary"
                                        )}
                                    />
                                    <p
                                        className={clsx(
                                            "text-sm font-medium leading-normal",
                                            isActive
                                                ? ""
                                                : "group-hover:text-[#111318] dark:group-hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </p>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/settings"
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                            pathname === "/settings"
                                ? "bg-primary/10 text-primary"
                                : "text-[#616f89] dark:text-gray-400 hover:bg-background-light dark:hover:bg-[#2a3441]"
                        )}
                    >
                        <Settings
                            className={clsx(
                                "w-6 h-6 transition-colors",
                                pathname === "/settings"
                                    ? "stroke-current"
                                    : "group-hover:text-primary"
                            )}
                        />
                        <p
                            className={clsx(
                                "text-sm font-medium leading-normal",
                                pathname === "/settings"
                                    ? ""
                                    : "group-hover:text-[#111318] dark:group-hover:text-white"
                            )}
                        >
                            Settings
                        </p>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
