/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        board: {
          light: '#B8D4E8',
          dark: '#7FA6C3',
        },
        primary: {
          purple: '#7C3AED',
          purpleHover: '#6D28D9',
        },
        success: '#10b981',
        error: '#ef4444',
        accent: '#7C3AED',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        }
      },
    },
  },
  plugins: [],
}
