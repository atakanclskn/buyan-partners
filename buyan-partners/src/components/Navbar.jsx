import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Menu, X } from 'lucide-react'; // Hamburger ve Kapat ikonları

const Navbar = () => {
  const { config } = useSite();
  const { navigation, general } = config;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      // 50px'den fazla aşağı inildiyse header'ı koyulaştır
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4' // Aşağı inince veya menü açıkken
          : 'bg-transparent py-6' // En tepedeyken şeffaf
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-white cursor-pointer z-50 relative">
           <a href="/">{general.logoText}</a>
        </div>

        {/* Masaüstü Menü (Sadece büyük ekranlarda görünür) */}
        <div className="hidden md:flex space-x-8 text-white/90 font-medium">
          {navigation.map((item) => (
            <a 
              key={item.id} 
              href={item.path} 
              className="hover:text-secondary transition-colors relative group"
            >
              {item.title}
              {/* Hover Çizgisi */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobil Hamburger Butonu (Sadece küçük ekranlarda görünür) */}
        <div className="md:hidden z-50 relative">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white hover:text-secondary transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobil Menü Overlay (Tam Ekran) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
            {navigation.map((item) => (
              <a 
                key={item.id} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)} // Tıklayınca menüyü kapat
                className="text-2xl font-bold text-white hover:text-secondary transition-colors"
              >
                {item.title}
              </a>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;