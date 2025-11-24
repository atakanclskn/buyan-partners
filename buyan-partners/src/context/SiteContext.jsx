import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [config, setConfig] = useState(siteConfig);

  // Renk Teması Değişince CSS Değişkenlerini Güncelle
  useEffect(() => {
    const activeThemeKey = config.theme.activeTheme;
    const colors = config.theme.themes[activeThemeKey];

    const root = document.documentElement;
    
    // CSS değişkenlerini (variables) güncelle
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-bg', colors.background);
    root.style.setProperty('--color-text', colors.text);

  }, [config]); // Config her değiştiğinde burası çalışır

  return (
    <SiteContext.Provider value={{ config, setConfig }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);