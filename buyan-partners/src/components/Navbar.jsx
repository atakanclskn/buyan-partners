import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X } from 'lucide-react';

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

  // Menü açılınca arkadaki sayfayı kilitle (Scroll olmasın)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* --- ANA NAVBAR ÇUBUĞU --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-md shadow-lg py-4' 
            : 'bg-transparent py-6'
        }`}
        // Navbar arka plan rengini de garantiye alalım (Scrolled ise)
        style={{ 
          backgroundColor: isScrolled ? 'var(--color-primary)' : 'transparent',
          opacity: isScrolled ? 0.95 : 1 
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="text-2xl font-bold text-white cursor-pointer z-50 relative">
             <a href="/">{general.logoText}</a>
          </div>

          {/* Masaüstü Linkler */}
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

          {/* Mobil Hamburger Butonu */}
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

      {/* --- MOBİL MENÜ OVERLAY (DÜZELTİLEN KISIM) --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col"
          // İŞTE ÇÖZÜM BURADA: Rengi doğrudan değişkenden alıp zorluyoruz.
          style={{ backgroundColor: 'var(--color-primary)' }} 
        >
          
          {/* Mobil Menü Üst Kısım (Logo ve Kapat) */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="text-2xl font-bold text-white">{general.logoText}</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-secondary transition-colors p-2 bg-white/10 rounded-full cursor-pointer"
            >
              <X size={30} />
            </button>
          </div>

          {/* Mobil Linkler */}
          <div className="flex flex-col items-center justify-center flex-grow space-y-8">
            {navigation.map((item) => (
              <a 
                key={item.id} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold text-white hover:text-secondary transition-colors tracking-wide"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Alt Bilgi */}
          <div className="p-6 text-center text-white/30 text-sm pb-12">
            {config.general.siteName}
          </div>

        </div>
      )}
    </>
  );
};

export default Navbar;