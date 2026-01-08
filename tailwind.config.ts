import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#135bec",
                "primary-hover": "#3b82f6",
                "background-light": "#f6f6f8",
                "background-dark": "#101622",
                "card-dark": "#161b26",
                "border-dark": "#282e39",
                "text-main": "#111318",
                "text-secondary": "#616f89",
            },
            fontFamily: {
                display: ["var(--font-manrope)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px",
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
export default config;
