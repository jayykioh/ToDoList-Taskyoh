import { createContext, useContext, useState, useEffect } from 'react';

const BackgroundContext = createContext();

export const THEMES = {
  COZY: {
    id: 'cozy',
    label: 'Cozy',
    colors: {
      light: { primary: '#2dd4bf', secondary: '#f472b6', accent: '#fbbf24' },
      dark: { primary: '#115e59', secondary: '#be185d', accent: '#b45309' }
    }
  },
  WINTER: {
    id: 'winter',
    label: 'Winter',
    colors: {
      light: { primary: '#60a5fa', secondary: '#93c5fd', accent: '#fcd34d' }, // Ice Blue / Gold
      dark: { primary: '#1e3a8a', secondary: '#1e40af', accent: '#fbbf24' } // Deep Blue / Gold
    }
  },
  SPRING: {
    id: 'spring',
    label: 'Spring',
    colors: {
      light: { primary: '#f472b6', secondary: '#fbcfe8', accent: '#fde047' }, // Pink / Yellow
      dark: { primary: '#831843', secondary: '#9d174d', accent: '#fbbf24' } // Deep Red / Gold
    }
  },
  AUTUMN: {
    id: 'autumn',
    label: 'Autumn',
    colors: {
      light: { primary: '#fb923c', secondary: '#fdba74', accent: '#bef264' }, // Orange / Green
      dark: { primary: '#7c2d12', secondary: '#9a3412', accent: '#65a30d' } // Rust / Olive
    }
  }
};

export const BackgroundProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(THEMES.COZY);

  const switchTheme = (themeId) => {
    const theme = Object.values(THEMES).find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const cycleTheme = () => {
    const themes = Object.values(THEMES);
    const currentIndex = themes.findIndex(t => t.id === currentTheme.id);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  return (
    <BackgroundContext.Provider value={{ currentTheme, switchTheme, cycleTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
