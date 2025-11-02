/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gpt': '#10A37F',
        'claude': '#CC9B7A',
        'gemini': '#4285F4',
        'copilot': '#7B68EE',
        'tia': '#FF6B6B',
      },
    },
  },
  plugins: [],
}
