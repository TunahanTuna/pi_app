import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#b1c2fc',
          400: '#7694fa',
          500: '#3b66f8',
          600: '#355cdf',
          700: '#2c4dba',
          800: '#233d95',
          900: '#1d327a'
        },
        secondary: {
          50: '#f4f7f7',
          100: '#e2eaeb',
          200: '#c2d4d6',
          300: '#9bb5b7',
          400: '#698a8d',
          500: '#4d696b',
          600: '#405758',
          700: '#364849',
          800: '#2d3c3d',
          900: '#273334'
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        }
      }
    },
  },
  plugins: [],
};

export default config;