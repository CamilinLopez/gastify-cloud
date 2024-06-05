import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gris: { '1': '#F0F2F5', '2': '#637887' },
        negro: '#121417',
        blanco: '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
