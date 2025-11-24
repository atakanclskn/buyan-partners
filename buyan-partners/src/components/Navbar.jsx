import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // Animasyon kütüphanesini çağırdık

const Navbar = () => {
  const { config } = useSite();
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

  // Linkler için animasyon ayarları (Sırayla gelme efekti)
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
          <div className="text-2xl font-bold text-white cursor-pointer z-50 relative">
             <a href="/">{general.logoText}</a>
          </div>

          <div className="hidden md:flex space-x-8 text-white/90 font-medium">
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
          </div>

          <div className="md:hidden z-50 relative">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="text-white hover:text-secondary transition-colors cursor-pointer"
            >
              <Menu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- ANİMASYONLU MOBİL MENÜ --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} // Başlangıçta görünmez
            animate={{ opacity: 1 }} // Açılınca görünür
            exit={{ opacity: 0 }}    // Kapanırken kaybolur
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col"
            style={{ backgroundColor: 'var(--color-primary)' }} 
          >
            
            {/* Üst Bar */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-2xl font-bold text-white">{general.logoText}</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-secondary transition-colors p-2 bg-white/10 rounded-full cursor-pointer"
              >
                <X size={30} />
              </button>
            </div>

            {/* Linkler Container */}
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

            {/* Alt Bilgi */}
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