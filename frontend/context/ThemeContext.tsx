'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir los tipos para el contexto
interface ThemeContextType {
  theme: 'system' | 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'system' | 'light' | 'dark'>>;
}

// Crear el contexto del tema con un valor por defecto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Proveedor del contexto de tema
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');

  useEffect(() => {
    const root = window.document.documentElement;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'system') {
      root.classList.toggle('dark', prefersDarkMode);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Hook para usar el contexto de tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
