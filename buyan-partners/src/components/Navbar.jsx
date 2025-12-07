import { useState, useEffect, useRef } from "react";
import { useSite } from "../context/SiteContext";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const Navbar = () => {
  const { config, darkMode, setDarkMode } = useSite();
  const { navigation, general } = config;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const scrollStartRef = useRef(0); 

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      scrollStartRef.current = window.scrollY;
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleSmartClose = () => {
      const currentScroll = window.scrollY;
      const distance = Math.abs(currentScroll - scrollStartRef.current);
      if (distance > 100) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleSmartClose);
    return () => window.removeEventListener("scroll", handleSmartClose);
  }, [isMobileMenuOpen]);

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e, path) => {
    if (path === "/") handleScrollToTop(e);
    else setIsMobileMenuOpen(false);
  };

  // --- STİL AYARLARI ---
  const glassStyle = {
    backgroundColor: isScrolled || isMobileMenuOpen
      ? darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)"
      : darkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.1)",
    backdropFilter: (isScrolled || isMobileMenuOpen) ? "blur(20px)" : "blur(12px)",
    borderColor: (isScrolled || isMobileMenuOpen)
      ? darkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.5)"
      : "rgba(255,255,255,0.05)",
    textColor: isScrolled || isMobileMenuOpen ? (darkMode ? "text-white" : "text-gray-900") : "text-white",
  };

  const currentWidth = (isScrolled || isMobileMenuOpen) ? "90%" : "100%";
  const maxWidth = (isScrolled || isMobileMenuOpen) ? "1000px" : "100%";
  const topBarRadius = isMobileMenuOpen ? "24px 24px 0px 0px" : (isScrolled ? "50px" : "0px");

  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeInOut" } },
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
        
        <motion.nav
          initial={false}
          animate={{
            y: (isScrolled || isMobileMenuOpen) ? 20 : 0,
            width: currentWidth,
            maxWidth: maxWidth,
            borderRadius: topBarRadius,
            backgroundColor: glassStyle.backgroundColor,
            backdropFilter: glassStyle.backdropFilter,
            borderColor: glassStyle.borderColor,
            borderWidth: "1px",
            borderStyle: "solid",
            borderBottomColor: isMobileMenuOpen ? "transparent" : glassStyle.borderColor,
            paddingLeft: (isScrolled || isMobileMenuOpen) ? "1.5rem" : "2rem",
            paddingRight: (isScrolled || isMobileMenuOpen) ? "1.5rem" : "2rem",
            paddingTop: (isScrolled || isMobileMenuOpen) ? "0.75rem" : "1.5rem",
            paddingBottom: (isScrolled || isMobileMenuOpen) ? "0.75rem" : "1.5rem",
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-between items-center shadow-lg box-border w-full pointer-events-auto z-50 relative overflow-hidden"
        >
          
          {/* --- SOL TARAF: ANA LOGO (AKILLI RENK DEĞİŞİMİ) --- */}
          <div className="z-10 flex items-center">
            <a href="/" onClick={handleScrollToTop} className="flex items-center gap-3 md:gap-4 group">
              {/* İkon */}
              <img 
                // MANTIK: Eğer aşağı inildiyse (Scrolled) VE Light Mode ise KOYU ikonu göster.
                // Diğer tüm durumlarda (Dark mode veya sayfa tepesi) AÇIK ikonu göster.
                src={(isScrolled && !darkMode) ? "/logo-icon-dark.svg" : "/logo-icon-light.svg"} 
                alt="Buyan Partners Home" 
                className="h-9 md:h-11 w-auto object-contain group-hover:opacity-90 transition-opacity" 
              />
              
              {/* Şirket İsmi - GÜNCELLENDİ: Mobilde görünür, daha büyük, hizalı */}
              <span className={`
                font-brand font-bold 
                text-2xl md:text-3xl 
                tracking-wider 
                ${glassStyle.textColor} 
                block 
                transition-colors duration-300 
                whitespace-nowrap flex-shrink-0 
                mt-1
              `}>
                    BUYAN PARTNERS
              </span>
            </a>
          </div>

          {/* --- SAĞ TARAF: SADECE MENÜ VE BUTON --- */}
          <div className="hidden md:flex items-center space-x-2 font-medium whitespace-nowrap z-10" 
               onMouseLeave={() => setHoveredTab(null)}>
            
            {/* Navigasyon Linkleri */}
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                onMouseEnter={() => setHoveredTab(item.id)}
                className={`relative px-4 py-2 rounded-full transition-colors duration-300
                  ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      : "text-white/80 hover:text-white"
                  }
                `}
              >
                <span className="relative z-10">{item.title}</span>
                {hoveredTab === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gray-200/50 dark:bg-white/10 backdrop-blur-sm -z-0"
                  />
                )}
              </a>
            ))}

            {/* Dark Mode Butonu */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-2 p-2 rounded-full transition-all cursor-pointer overflow-hidden border
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

          {/* MOBİL HAMBURGER BUTONU */}
          <div className="md:hidden flex items-center gap-4 z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors cursor-pointer ${glassStyle.textColor}`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* SCROLL PROGRESS BAR */}
          <motion.div
            style={{ scaleX }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary dark:bg-white origin-left z-50"
          />

        </motion.nav>

        {/* MOBİL MENÜ (Değişiklik Yok) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="pointer-events-auto overflow-hidden shadow-xl md:hidden w-full z-40 relative"
              style={{
                backgroundColor: glassStyle.backgroundColor,
                backdropFilter: glassStyle.backdropFilter,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: glassStyle.borderColor,
                borderTop: "none", 
                borderRadius: "0px 0px 24px 24px", 
                marginTop: "-1px", 
                width: currentWidth,
                maxWidth: maxWidth,
              }}
            >
              <div className="p-4 flex flex-col space-y-1">
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

                <motion.div variants={itemVariants} className="pt-2 mt-2 border-t border-gray-200/20 dark:border-white/10">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center justify-between group p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                    <div className={`p-2 rounded-full transition-all border ${
                        darkMode ? "bg-slate-800 border-slate-700 text-yellow-400" : "bg-white border-gray-200 text-indigo-600"
                    }`}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;