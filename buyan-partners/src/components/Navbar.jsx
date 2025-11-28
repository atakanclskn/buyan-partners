import { useState, useEffect } from "react";
import { useSite } from "../context/SiteContext";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react"; // ArrowRight eklendi
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { config, darkMode, setDarkMode } = useSite();
  const { navigation, general } = config;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Başlangıç scroll durumunu kontrol et
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > (window.innerHeight - 100);
    }
    return false;
  });

  // Scroll Takibi
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight - 100;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // İlk yüklemede kontrol
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil Menü Açılınca Scroll Kilidi (İsteğe bağlı, bu tasarımda kilitlemeye gerek kalmayabilir ama güvenli)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

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

  // --- STİL AYARLARI (NAVBAR & MOBİL MENÜ ORTAK) ---
  const glassStyle = {
    backgroundColor: isScrolled
      ? darkMode
        ? "rgba(15, 23, 42, 0.85)" // Dark Scrolled
        : "rgba(255, 255, 255, 0.9)" // Light Scrolled
      : darkMode 
        ? "rgba(0, 0, 0, 0.6)" // Dark Top (Biraz daha belirgin olsun diye)
        : "rgba(255, 255, 255, 0.1)", // Light Top (Şeffaf)
    backdropFilter: "blur(16px)",
    border: isScrolled
      ? darkMode
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(255,255,255,0.5)"
      : "1px solid rgba(255,255,255,0.05)", // Tepedeyken hafif sınır
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-300 pointer-events-none">
        
        {/* --- ANA NAVBAR --- */}
        <motion.nav
          initial={false}
          animate={{
            y: isScrolled ? 20 : 0,
            width: isScrolled ? "85%" : "100%",
            maxWidth: isScrolled ? "1000px" : "100%",
            borderRadius: isScrolled ? "50px" : "0px",
            paddingLeft: isScrolled ? "1.5rem" : "2rem",
            paddingRight: isScrolled ? "1.5rem" : "2rem",
            paddingTop: isScrolled ? "0.75rem" : "1.5rem",
            paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-center shadow-lg box-border w-full pointer-events-auto z-50"
          style={glassStyle} // Ortak stil kullanıldı
        >
          {/* LOGO */}
          <div className="text-2xl font-bold cursor-pointer shrink-0 whitespace-nowrap">
            <a
              href="/"
              onClick={handleScrollToTop}
              className={`${
                isScrolled || isMobileMenuOpen ? "text-gray-900 dark:text-white" : "text-white"
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

          {/* MOBİL BUTONLAR (SAĞ TARAFA YASLI) */}
          <div className="md:hidden flex items-center gap-4">
             {/* Dark Mode Butonu (Mobil için buraya da ekledik) */}
             <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all cursor-pointer overflow-hidden border
                ${
                  isScrolled || isMobileMenuOpen
                    ? "bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white"
                    : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Hamburger Menü Butonu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors cursor-pointer ${
                isScrolled || isMobileMenuOpen ? "text-gray-900 dark:text-white" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </motion.nav>

        {/* --- YENİ MOBİL MENÜ (DROPDOWN GLASS) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ 
                opacity: 1, 
                y: isScrolled ? 30 : 0, // Scrolled ise biraz boşluk bırak
                height: "auto",
                // Genişlik ve Border Radius ana navbar ile senkronize
                width: isScrolled ? "85%" : "100%",
                maxWidth: isScrolled ? "1000px" : "100%",
                borderRadius: isScrolled ? "30px" : "0px",
              }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              
              className="pointer-events-auto overflow-hidden shadow-2xl mt-2 md:hidden absolute top-full"
              style={{
                ...glassStyle, // Ana navbar ile aynı cam efekti
                zIndex: 40
              }}
            >
              <div className="p-6 flex flex-col space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">
                      {item.title}
                    </span>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-secondary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Navbar;