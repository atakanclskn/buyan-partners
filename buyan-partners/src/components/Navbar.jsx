import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X, Moon, Sun } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { config, darkMode, setDarkMode } = useSite();
  const { navigation, general } = config;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // --- YAY (SPRING) AYARLARI ---
  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.5
  };

  const navVariants = {
    top: {
      width: "100%",
      maxWidth: "100%",
      y: 0,
      borderRadius: "0px",
      backgroundColor: "rgba(0,0,0,0)",
      borderBottom: "1px solid rgba(255,255,255,0)",
      paddingLeft: "2rem", // Normal padding
      paddingRight: "2rem",
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      boxShadow: "0 0 0 0 rgba(0,0,0,0)"
    },
    scrolled: {
      width: "85%", // Daralma oranı
      maxWidth: "1000px",
      y: 20,
      borderRadius: "50px",
      backgroundColor: darkMode ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(16px)",
      border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.5)",
      paddingLeft: "1.5rem", // Hafifçe daralıyor
      paddingRight: "1.5rem",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)"
    }
  };

  return (
    <>
      {/* --- NAVBAR --- */}
      <motion.nav 
        variants={navVariants}
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        transition={springTransition}
        className="fixed left-1/2 z-50 flex justify-between items-center w-full box-border"
        style={{ x: '-50%' }} // Ortalamayı buradan sabitliyoruz
      >
          
        {/* LOGO (layout prop'unu kaldırdık, artık kaymayacak) */}
        <div className="text-2xl font-bold cursor-pointer relative shrink-0">
           <a href="/" className={`${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'} transition-colors duration-500`}>
             {general.logoText}
           </a>
        </div>

        {/* MASAÜSTÜ MENÜ (layout prop'unu kaldırdık) */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navigation.map((item) => (
            <a 
              key={item.id} 
              href={item.path} 
              className={`relative group transition-colors duration-300
                ${isScrolled 
                  ? 'text-gray-700 dark:text-gray-200 hover:text-secondary' 
                  : 'text-white/90 hover:text-white' 
                }
              `}
            >
              {item.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* DARK MODE BUTONU */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-4 p-2 rounded-full transition-all cursor-pointer overflow-hidden border
              ${isScrolled 
                ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white' 
                : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
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
            className={`transition-colors cursor-pointer ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
          >
            <Menu size={28} />
          </button>
        </div>

      </motion.nav>

      {/* MOBİL MENÜ (Aynı) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col bg-white dark:bg-slate-950"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{general.logoText}</span>
              <div className="flex items-center gap-4">
                 <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 dark:text-white hover:text-secondary p-2 bg-gray-100 dark:bg-white/10 rounded-full">
                  <X size={28} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow space-y-8">
              {navigation.map((item) => (
                <a key={item.id} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-gray-900 dark:text-white hover:text-secondary transition-colors">
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