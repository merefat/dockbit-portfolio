/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#17293c',
          light: '#2a3d52',
          lighter: '#3d5166',
          dark: '#0f1a24',
        },
        cyan: {
          DEFAULT: '#1ebbd4',
          light: '#4dd4e8',
          dark: '#0d8fa3',
        },
        orange: {
          DEFAULT: '#f89c11',
          light: '#fbbf24',
          dark: '#c77d0d',
        },
        white: '#ffffff',
        offwhite: '#f8fafb',
        lightgray: '#e5e9ef',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(23, 41, 60, 0.08), 0 1px 2px rgba(23, 41, 60, 0.05)',
        'card-hover': '0 4px 12px rgba(23, 41, 60, 0.12), 0 2px 6px rgba(23, 41, 60, 0.08)',
        'window': '0 8px 32px rgba(23, 41, 60, 0.1)',
      },
    },
  },
  plugins: [],
}
