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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll kilitleme
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Menü Animasyon Ayarları
  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  const linkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] }, opacity: 0 },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] }, opacity: 1 }
  };

  return (
    <>
      {/* --- ANA NAVBAR --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-md shadow-lg py-4' 
            : 'bg-transparent py-6'
        }`}
        style={{ 
          backgroundColor: isScrolled ? 'var(--color-primary)' : 'transparent',
          opacity: isScrolled ? 0.95 : 1 
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="text-2xl font-bold text-white cursor-pointer z-50 relative">
             <a href="/">{general.logoText}</a>
          </div>

          {/* MASAÜSTÜ MENÜ */}
          <div className="hidden md:flex items-center space-x-8 text-white/90 font-medium">
            {navigation.map((item) => (
              <a 
                key={item.id} 
                href={item.path} 
                className="hover:text-secondary transition-colors relative group"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* --- ANİMASYONLU DARK MODE BUTONU (MASAÜSTÜ) --- */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/5 overflow-hidden"
              title={darkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
            >
              {/* ANİMASYON BURADA: key={darkMode} sayesinde ikon her değiştiğinde animasyon baştan oynar */}
              <motion.div
                key={darkMode} 
                initial={{ rotate: -180, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>
          </div>

          {/* MOBİL HAMBURGER BUTONU */}
          <div className="md:hidden z-50 relative flex items-center gap-4">
            {/* Mobilde de Animasyonlu Buton */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-black/20 text-white border border-white/10"
            >
               <motion.div
                key={darkMode}
                initial={{ rotate: -180, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="text-white hover:text-secondary transition-colors cursor-pointer"
            >
              <Menu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBİL MENÜ OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col"
            style={{ backgroundColor: 'var(--color-primary)' }} 
          >
            
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-2xl font-bold text-white">{general.logoText}</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-secondary transition-colors p-2 bg-white/10 rounded-full cursor-pointer"
              >
                <X size={30} />
              </button>
            </div>

            <motion.div 
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center justify-center flex-grow space-y-8"
            >
              {navigation.map((item) => (
                <div key={item.id} className="overflow-hidden">
                  <motion.a 
                    variants={linkVars}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-4xl font-bold text-white hover:text-secondary transition-colors tracking-wide"
                  >
                    {item.title}
                  </motion.a>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 text-center text-white/30 text-sm pb-12"
            >
              {config.general.siteName}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;