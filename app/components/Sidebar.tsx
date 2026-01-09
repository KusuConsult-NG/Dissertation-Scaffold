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
    Settings,
    LogOut
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

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

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

    // Derived user initials
    const userInitials = session?.user?.name
        ? session.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : "U";

    return (
        <aside className="w-72 bg-white dark:bg-[#1a2230] border-r border-[#f0f2f4] dark:border-[#2a3441] flex flex-col flex-shrink-0 z-20">
            <div className="p-6 flex flex-col h-full justify-between">
                <div className="flex flex-col gap-8">
                    {/* Branding/User */}
                    <div className="flex gap-4 items-center">
                        {session?.user?.image ? (
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm"
                                style={{
                                    backgroundImage: `url("${session.user.image}")`,
                                }}
                            />
                        ) : (
                            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                                {userInitials}
                            </div>
                        )}

                        <div className="flex flex-col min-w-0">
                            <h1 className="text-base font-bold leading-tight dark:text-white truncate">
                                {session?.user?.name || "Guest User"}
                            </h1>
                            <p className="text-[#616f89] dark:text-gray-400 text-xs font-medium uppercase tracking-wider truncate">
                                {session?.user?.email || "No Email"}
                            </p>
                            {session?.user?.plan && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded w-fit mt-1 font-bold">
                                    {session.user.plan.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-250px)]">
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
                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group text-[#616f89] dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 w-full text-left"
                    >
                        <LogOut className="w-6 h-6 transition-colors group-hover:stroke-current" />
                        <p className="text-sm font-medium leading-normal">
                            Log Out
                        </p>
                    </button>
                </div>
            </div>
        </aside>
    );
}
