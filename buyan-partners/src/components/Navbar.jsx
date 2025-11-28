import { useState, useEffect } from "react";
import { useSite } from "../context/SiteContext";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { config, darkMode, setDarkMode } = useSite();
  const { navigation, general } = config;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- KRİTİK DÜZELTME 1: STATE BAŞLANGICI ---
  // Varsayılan olarak 'false' demek yerine, o anki konumu kontrol ederek başlıyoruz.
  // Böylece sayfa yenilendiğinde veya Preloader bittiğinde Navbar "şaşırmaz".
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > (window.innerHeight - 100);
    }
    return false;
  });

  // Scroll Takibi (Değişiklikleri yakalamak için)
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight - 100;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    // İlk açılışta da bir kez tetikleyelim ki garanti olsun
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil Menü Kilidi
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Yumuşak Scroll
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e, path) => {
    if (path === "/") {
      handleScrollToTop(e);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none">
        
        <motion.nav
          // --- KRİTİK DÜZELTME 2: INITIAL FALSE ---
          // Bu ayar, bileşen ilk ekrana geldiğinde animasyon oynatmasını engeller.
          // Direkt olarak 'animate' içindeki doğru değerlerle başlar.
          initial={false} 
          
          animate={{
            y: isScrolled ? 20 : 0,
            width: isScrolled ? "85%" : "100%",
            maxWidth: isScrolled ? "1000px" : "100%",
            borderRadius: isScrolled ? "50px" : "0px",
            backgroundColor: isScrolled
              ? darkMode
                ? "rgba(15, 23, 42, 0.85)"
                : "rgba(255, 255, 255, 0.9)"
              : "rgba(0, 0, 0, 0)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            border: isScrolled
              ? darkMode
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(255,255,255,0.5)"
              : "1px solid rgba(0,0,0,0)",
            paddingLeft: isScrolled ? "1.5rem" : "2rem",
            paddingRight: isScrolled ? "1.5rem" : "2rem",
            paddingTop: isScrolled ? "0.75rem" : "1.5rem",
            paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
          }}
          transition={{
            duration: 1.6, 
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex justify-between items-center shadow-sm box-border w-full pointer-events-auto"
          style={{
            boxShadow: isScrolled
              ? "0 10px 30px -10px rgba(0,0,0,0.1)"
              : "none",
          }}
        >
          {/* LOGO */}
          <div className="text-2xl font-bold cursor-pointer shrink-0 whitespace-nowrap">
            <a
              href="/"
              onClick={handleScrollToTop}
              className={`${
                isScrolled ? "text-gray-900 dark:text-white" : "text-white"
              } transition-colors duration-300`}
            >
              {general.logoText}
            </a>
          </div>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center space-x-8 font-medium whitespace-nowrap">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`relative group transition-colors duration-300
                  ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-200 hover:text-secondary"
                      : "text-white/90 hover:text-white"
                  }
                `}
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-4 p-2 rounded-full transition-all cursor-pointer overflow-hidden border
                ${
                  isScrolled
                    ? "bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white"
                    : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              <motion.div
                key={darkMode}
                initial={{ rotate: -180, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>
          </div>

          {/* MOBİL BUTON */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`transition-colors cursor-pointer ${
                isScrolled ? "text-gray-900 dark:text-white" : "text-white"
              }`}
            >
              <Menu size={28} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* MOBİL MENÜ OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col bg-white dark:bg-slate-950"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {general.logoText}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-900 dark:text-white hover:text-secondary p-2 bg-gray-100 dark:bg-white/10 rounded-full"
                >
                  <X size={28} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow space-y-8">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className="text-3xl font-bold text-gray-900 dark:text-white hover:text-secondary transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;