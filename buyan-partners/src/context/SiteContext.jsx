import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [config, setConfig] = useState(siteConfig);
  
  // YENİ: Dark Mode Durumu (Varsayılan: Kapalı)
  // İstersen localStorage'dan okuyarak kullanıcının tercihini hatırlatabiliriz.
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // 1. Renk Teması (Mevcut Kodun)
  useEffect(() => {
    const activeThemeKey = config.theme.activeTheme;
    const colors = config.theme.themes[activeThemeKey];
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-bg', colors.background);
    root.style.setProperty('--color-text', colors.text);
  }, [config]);

  // 2. YENİ: Dark Mode Tetikleyici
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Tercihi hatırla
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Value kısmına darkMode ve setDarkMode'u eklemeyi unutma!
  return (
    <SiteContext.Provider value={{ config, setConfig, darkMode, setDarkMode }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);