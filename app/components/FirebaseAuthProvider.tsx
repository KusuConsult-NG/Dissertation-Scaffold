"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            // Fetch custom token
            fetch("/api/auth/token", { method: "POST" })
                .then((res) => {
                    if (!res.ok) return null; // Silently fail if server is not configured
                    return res.json();
                })
                .then((data) => {
                    if (data?.token) {
                        signInWithCustomToken(auth, data.token).catch(() => {
                            // Ignore sign-in errors for public mode
                        });
                    }
                })
                .catch(() => {
                    // Ignore network errors for public mode
                });
        } else if (status === "unauthenticated") {
            signOut(auth);
        }
    }, [session, status]);

    return <>{children}</>;
}
