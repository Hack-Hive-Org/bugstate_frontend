import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  plugins : [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        "changa-one": ["var(--font-changa-one)", "sans-serif"],
        "cabin": ["var(--font-cabin)", "sans-serif"],
      },
    },
  },
}

export default config