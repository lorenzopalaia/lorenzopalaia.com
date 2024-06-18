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
                },
            },
        ],
    },
};
export default config;
