import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as defaultData } from '../data/siteConfig'; // Yedek olarak yerel veri kalsın
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  // Başlangıçta yerel veriyi göster (Hız için), sonra Firebase'den günceli gelince değişir.
  const [config, setConfig] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  // Dark Mode Ayarları (Aynı kaldı)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved === "true" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // --- FIREBASE VERİ ÇEKME İŞLEMİ ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 'site-content' koleksiyonundaki tüm belgeleri (hero, about, services...) çek
        const querySnapshot = await getDocs(collection(db, "site-content"));
        
        if (!querySnapshot.empty) {
          let firebaseData = {};
          
          querySnapshot.forEach((doc) => {
            // Doc ID (örn: 'hero') anahtar olur, içeriği değer olur
            firebaseData[doc.id] = doc.data();
          });

          // Yerel veri ile Firebase verisini birleştir (Firebase baskın gelir)
          // navigation dizisi için özel kontrol (objeden diziye çevirme gerekebilir, ama şimdilik obje olarak saklamıştık)
          if (firebaseData.navigation && !Array.isArray(firebaseData.navigation) && firebaseData.navigation.items) {
             firebaseData.navigation = firebaseData.navigation.items;
          }

          setConfig(prev => ({ ...prev, ...firebaseData }));
          console.log("🔥 Veriler Firebase'den başarıyla çekildi!");
        }
      } catch (error) {
        console.error("Firebase veri çekme hatası:", error);
        // Hata olursa yerel veri (defaultData) zaten ekranda, site çökmez.
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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