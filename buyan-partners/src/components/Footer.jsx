import { useSite } from '../context/SiteContext';
import { Linkedin, Twitter, Instagram, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const { config } = useSite();
  const { footer, general, navigation } = config;

  // Yukarı Çık Fonksiyonu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        
        {/* Üst Kısım: Grid Yapı */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Kolon: Logo ve Açıklama */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold text-white">{general.logoText}</h2>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* 2. Kolon: Site Haritası */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Menü</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.path} 
                    className="text-gray-400 hover:text-secondary transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Kolon: Yasal & Sosyal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Yasal</h3>
            <ul className="space-y-2 mb-6">
              {footer.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="text-gray-400 hover:text-secondary transition-colors text-sm">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            {/* Sosyal İkonlar */}
            <div className="flex space-x-4">
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Alt Kısım: Telif Hakkı */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            {general.footerText}
          </p>

          {/* Yukarı Çık Butonu */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-secondary transition-colors cursor-pointer"
          >
            <span>Yukarı Dön</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;