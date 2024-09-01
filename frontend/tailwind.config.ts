import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Habilitar el modo oscuro usando clases
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
        azul: '#1C8CD6',
        bgDark: '#2d2d2d',
        bgDark1: '#1e1e1e',
        borderDarck: '#4d4d4d',
        textDark: '#CFCFCF',
      },
      screens: {
        xl: '1300px',
        movile: '480px',
      },
    },
  },
  plugins: [],
};

export default config;
