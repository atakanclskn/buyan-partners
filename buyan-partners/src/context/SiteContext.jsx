import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as defaultData } from '../data/siteConfig'; // Yerel veri
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  // Başlangıçta tam dolu yerel veri ile başla
  const [config, setConfig] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  // Dark Mode Ayarları
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  // --- 1. FIREBASE VERİ ÇEKME (AKILLI BİRLEŞTİRME) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "site-content"));
        
        if (!querySnapshot.empty) {
          let firebaseData = {};
          
          querySnapshot.forEach((doc) => {
            firebaseData[doc.id] = doc.data();
          });

          // Navigation dizi kontrolü
          if (firebaseData.navigation && !Array.isArray(firebaseData.navigation) && firebaseData.navigation.items) {
             firebaseData.navigation = firebaseData.navigation.items;
          }

          // YEREL + FIREBASE BİRLEŞTİRME
          setConfig(prev => {
            return {
              ...prev, 
              ...firebaseData, 
              // Kritik ayarları koru
              theme: firebaseData.theme || prev.theme, 
              general: { ...prev.general, ...firebaseData.general },
              hero: { ...prev.hero, ...firebaseData.hero }
            };
          });

          console.log("🔥 Veriler güncellendi!");
        }
      } catch (error) {
        console.error("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- 2. RENK TEMASINI UYGULA (GERİ EKLENEN KISIM) ---
  // Bu kısım eksik olduğu için renkler gitmişti. Şimdi geri geldi.
  useEffect(() => {
    if (config.theme && config.theme.activeTheme) {
      const activeThemeKey = config.theme.activeTheme;
      const colors = config.theme.themes[activeThemeKey];
      
      if (colors) {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-bg', colors.background);
        root.style.setProperty('--color-text', colors.text);
      }
    }
  }, [config]); // Config her değiştiğinde (Firebase yüklenince) renkleri tekrar boyar.

  // --- 3. DARK MODE TETİKLEYİCİ ---
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const value = {
    config,
    setConfig,
    darkMode,
    setDarkMode,
    loading
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => useContext(SiteContext);