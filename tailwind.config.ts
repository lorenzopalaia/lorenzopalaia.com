import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {},
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                theme: {
                    primary: "#55D7CF",
                    secondary: "#142D46",
                    accent: "#a8acb7",
                    "base-100": "#10172A",
                },
            },
        ],
    },
};
export default config;
