import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
 
const config: Config = withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}"
  ],
  theme: {
  },
  plugins: [],
})
export default config;
