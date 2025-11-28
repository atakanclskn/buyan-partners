import { useState, useEffect } from "react";
import { useSite } from "../context/SiteContext";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { config, darkMode, setDarkMode } = useSite();
  const { navigation, general } = config;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > (window.innerHeight - 100);
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight - 100;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // --- DÜZELTME BURADA: CAM (GLASS) STİLİ ---
  const glassStyle = {
    backgroundColor: isScrolled
      ? darkMode
        ? "rgba(15, 23, 42, 0.9)" // Aşağı inince: %90 Opak (Okunabilirlik için)
        : "rgba(255, 255, 255, 0.95)"
      : darkMode 
        ? "rgba(0, 0, 0, 0.4)" // <-- DEĞİŞTİ: Tepedeyken: %40 Opak (Hero resmi görünsün)
        : "rgba(255, 255, 255, 0.1)",
    
    // Blur miktarını tepedeyken biraz azalttık ki resim daha net seçilsin
    backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)",
    
    border: isScrolled
      ? darkMode
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(255,255,255,0.5)"
      : "1px solid rgba(255,255,255,0.05)",
  };

  // Animasyon Varyantları
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
        
        {/* --- ANA NAVBAR --- */}
        <motion.nav
          initial={false}
          animate={{
            y: isScrolled ? 20 : 0,
            width: isScrolled ? "85%" : "100%",
            maxWidth: isScrolled ? "1000px" : "100%",
            borderRadius: isScrolled ? "50px" : "0px",
            // Padding ve Stil ayarları animate içinde
            backgroundColor: glassStyle.backgroundColor, // Stil objesinden alıyoruz
            backdropFilter: glassStyle.backdropFilter,
            border: glassStyle.border,
            
            paddingLeft: isScrolled ? "1.5rem" : "2rem",
            paddingRight: isScrolled ? "1.5rem" : "2rem",
            paddingTop: isScrolled ? "0.75rem" : "1.5rem",
            paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
          }}
          transition={{
            duration: 1.5, 
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex justify-between items-center shadow-sm box-border w-full pointer-events-auto z-50 transition-shadow"
          style={{
            boxShadow: isScrolled ? "0 10px 30px -10px rgba(0,0,0,0.1)" : "none"
          }}
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

          {/* MOBİL BUTONLAR */}
          <div className="md:hidden flex items-center gap-4">
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

        {/* --- MOBİL MENÜ (DROPDOWN) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="pointer-events-auto overflow-hidden shadow-2xl md:hidden w-full z-40 absolute"
              style={{
                // Stil ayarlarını 'style' prop'una verdik
                backgroundColor: glassStyle.backgroundColor,
                backdropFilter: glassStyle.backdropFilter,
                border: glassStyle.border,
                
                // Diğer ayarlar
                top: "100%", 
                marginTop: isScrolled ? "15px" : "0px",
                width: isScrolled ? "85%" : "100%",
                maxWidth: isScrolled ? "1000px" : "100%",
                borderRadius: isScrolled ? "30px" : "0px",
                borderTop: "none",
                borderTopLeftRadius: isScrolled ? "30px" : "0", 
                borderTopRightRadius: isScrolled ? "30px" : "0",
              }}
            >
              <div className="p-6 flex flex-col space-y-2">
                {navigation.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.path}
                    variants={itemVariants} 
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="flex items-center justify-between group p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">
                      {item.title}
                    </span>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-secondary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </motion.a>
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