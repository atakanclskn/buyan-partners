import { useState, useEffect } from "react"; // useState ve useEffect eklendi
import { useSite } from "./context/SiteContext";
import { AnimatePresence } from "framer-motion"; // AnimatePresence eklendi

import Navbar from "./components/Navbar"; 
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal"; 
import Founders from "./components/Founders"; 
import Preloader from "./components/Preloader"; // <-- İMPORT EDİLDİ

function App() {
  const { config } = useSite();
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu

  // Site açılınca 2.5 saniye bekle (Yükleme simülasyonu)
  useEffect(() => {
    // Gerçek bir proje yüklemesi olsaydı window.onload kullanırdık.
    // Şimdilik "Premium" hissi vermek için zamanlayıcı kullanıyoruz.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 Saniye

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300">
      
      {/* PRELOADER (AnimatePresence ile sarmalandı ki çıkarken animasyon oynasın) */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Site İçeriği (Yükleme bitmeden arkada render olur ama Preloader üstte durur) */}
      {!isLoading && (
        <>
          <Navbar />

          <header className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={config.hero.backgroundImage}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl px-4">
              <Reveal>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  {config.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
                  {config.hero.subtitle}
                </p>
                <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-secondary/50 cursor-pointer">
                  {config.hero.buttonText}
                </button>
              </Reveal>
            </div>
          </header>

          <Services /> 
          <About />    
          <Founders /> 
          <Contact />  
          <Footer /> 
        </>
      )}
      
    </div>
  );
}

export default App;