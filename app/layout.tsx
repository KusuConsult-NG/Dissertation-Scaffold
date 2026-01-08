import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "./components/ToasterProvider";
import { NextAuthProvider } from "./components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Dissertation Scaffold",
    description: "Structure your scholarship.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" style={{ colorScheme: 'light' }}>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
            </head>
            <body
                className={`${inter.variable} ${playfair.variable} antialiased`}
            >
                <NextAuthProvider>
                    {children}
                    <ToasterProvider />
                </NextAuthProvider>
            </body>
        </html>
    );
}
