"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { nigerianLocations } from "@/lib/locations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema, UserRegisterSchema } from "@/lib/validations/auth";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<UserRegisterSchema>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            state: "",
            lga: "",
            researchLevel: "",
        },
    });

    const selectedState = watch("state");

    const onSubmit = async (data: UserRegisterSchema) => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                // Handle specific field errors returned from server
                if (responseData.errors) {
                    throw new Error("Validation failed. Please check your inputs.");
                }
                throw new Error(responseData.message || "Something went wrong");
            }

            toast.success("Account created successfully! Logging you in...");

            // Auto-login
            const loginRes = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (loginRes?.error) {
                toast.error("Auto-login failed. Please sign in manually.");
                router.push("/login");
            } else {
                toast.success("Logged in successfully");
                window.location.href = "/dashboard";
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0d121c] p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-[#1a2230] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                            <svg
                                className="w-6 h-6"
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
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Create Account
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Start your research journey today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    autoComplete="name"
                                    {...register("name")}
                                    className={`w-full h-10 px-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email")}
                                    className={`w-full h-10 px-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="state"
                                        autoComplete="address-level1"
                                        {...register("state", {
                                            onChange: (e) => {
                                                setValue("lga", ""); // Reset LGA when state changes
                                            }
                                        })}
                                        className={`w-full h-10 px-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none`}
                                    >
                                        <option value="">Select State</option>
                                        {Object.keys(nigerianLocations).map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="lga" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    LGA / City <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="lga"
                                        autoComplete="address-level2"
                                        {...register("lga")}
                                        disabled={!selectedState}
                                        className={`w-full h-10 px-3 rounded-lg border ${errors.lga ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <option value="">Select LGA</option>
                                        {selectedState && nigerianLocations[selectedState as keyof typeof nigerianLocations]?.map((lga: string) => (
                                            <option key={lga} value={lga}>
                                                {lga}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                                {errors.lga && <p className="text-red-500 text-xs mt-1">{errors.lga.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="institution" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Institution <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="institution"
                                autoComplete="organization"
                                {...register("institution")}
                                className={`w-full h-10 px-3 rounded-lg border ${errors.institution ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                            />
                            {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="researchLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Research Level <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="researchLevel"
                                        autoComplete="off"
                                        {...register("researchLevel")}
                                        className={`w-full h-10 px-3 rounded-lg border ${errors.researchLevel ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none`}
                                    >
                                        <option value="">Select Level</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Masters">Masters</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Postdoc">Postdoc</option>
                                        <option value="Faculty">Faculty</option>
                                        <option value="Independent">Independent</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                                {errors.researchLevel && <p className="text-red-500 text-xs mt-1">{errors.researchLevel.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="researchArea" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Research Area <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="researchArea"
                                    autoComplete="off"
                                    {...register("researchArea")}
                                    className={`w-full h-10 px-3 rounded-lg border ${errors.researchArea ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                />
                                {errors.researchArea && <p className="text-red-500 text-xs mt-1">{errors.researchArea.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        {...register("password")}
                                        className={`w-full h-10 px-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        {...register("confirmPassword")}
                                        className={`w-full h-10 px-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} bg-white dark:bg-[#0d121c] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-md transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
