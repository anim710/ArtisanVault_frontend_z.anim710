import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        walnut: {
          DEFAULT: '#78350F',
          soft: '#92400E',
          deep: '#451A03',
        },
        sand: {
          DEFAULT: '#F59E0B',
          soft: '#FBBF24',
          muted: '#D97706',
        },
        charcoal: {
          DEFAULT: '#1C1917',
          soft: '#292524',
          muted: '#44403C',
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '0.75rem',
      },
      boxShadow: {
        card: '0 10px 30px -18px rgba(28, 25, 23, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
