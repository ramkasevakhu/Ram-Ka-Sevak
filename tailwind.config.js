/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kesariya: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        gold: {
          50: '#fffdf5',
          100: '#fef9e8',
          200: '#fcf1cb',
          300: '#fae39d',
          400: '#f5ce62',
          500: '#ebb32b',
          600: '#d19318',
          700: '#ab6e14',
          800: '#8c5517',
          900: '#744618',
        },
        sacred: {
          maroon: '#881337',
          vermilion: '#e11d48',
          ivory: '#FFFDF9',
          cream: '#FAF7F0',
          sand: '#F3EFE6',
          charcoal: '#1E293B',
        }
      },
      boxShadow: {
        '3d-subtle': '0 10px 25px -5px rgba(234, 88, 12, 0.08), 0 8px 10px -6px rgba(245, 158, 11, 0.05)',
        '3d-card': '0 20px 35px -10px rgba(194, 65, 12, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
        '3d-hover': '0 28px 50px -12px rgba(234, 88, 12, 0.22), 0 2px 4px 0 rgba(0, 0, 0, 0.06), inset 0 2px 2px 0 rgba(255, 255, 255, 1)',
        'glow-kesariya': '0 0 35px rgba(234, 88, 12, 0.35)',
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
