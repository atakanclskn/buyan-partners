import { useSite } from '../context/SiteContext';
import { 
  Linkedin, Instagram, Facebook, Youtube, Twitter, Github, 
  Globe, ArrowUp, Send, MessageCircle, Dribbble 
} from 'lucide-react';

const Footer = () => {
  const { config } = useSite();
  const { footer, general } = config;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const WATERMARK_LOGO = "/logo-undertext-light.svg"; 

  const getSocialIcon = (name) => {
    const safeName = name ? name.toLowerCase() : '';
    // ... (İkon kodları aynı kalıyor, yer kaplamasın diye kısalttım)
    switch (safeName) {
      case 'linkedin': return <Linkedin size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/10 transition-colors duration-300 relative overflow-hidden">
      
      {/* NOT: Eski watermark alanı buradan kaldırıldı */}

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* --- SOL TARAF (METİN ALANI) --- */}
          {/* relative: İçindeki watermark logoyu konumlandırmak için */}
          <div className="col-span-1 md:col-span-2 relative">
            
            {/* --- YENİ WATERMARK KONUMU --- */}
            {/* Bu sütunun sol üstüne, metnin arkasına yerleşir. */}
            <div className="absolute left-0 top-4 pointer-events-none z-0 select-none">
                <img 
                  src={WATERMARK_LOGO} 
                  alt="" 
                  // Boyut küçültüldü, opaklık ayarlandı.
                  className="w-[250px] md:w-[350px] opacity-[0.07] blur-[0.5px]"
                />
            </div>

            {/* Metin İçeriği (z-10 ile logonun önüne çıkarıldı) */}
            <div className="relative z-10">
                <h2 className="text-2xl font-brand font-bold mb-6 tracking-wide">{general.logoText}</h2>
                <p className="text-gray-400 leading-relaxed max-w-sm">
                  {footer.description}
                </p>
            </div>
          </div>

          {/* --- DİĞER SÜTUNLAR (Menü, Legal vs.) AYNI KALIYOR --- */}
          <div>
            <h3 className="font-bold text-lg mb-6">{footer.labels?.menu || "Menu"}</h3>
            <ul className="space-y-4 text-gray-400">
              {config.navigation.map((item) => (
                <li key={item.id}>
                  <a href={item.path} className="hover:text-secondary transition-colors">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">{footer.labels?.legal || "Legal"}</h3>
            <ul className="space-y-4 text-gray-400">
              {footer.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="hover:text-secondary transition-colors">{link.title}</a>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-8 flex-wrap">
              {footer.socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {general.footerText}
          </p>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
          >
            {footer.labels?.backToTop || "Back to Top"}
            <div className="p-1 rounded-full bg-white/10 group-hover:bg-secondary group-hover:text-white transition-all">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;