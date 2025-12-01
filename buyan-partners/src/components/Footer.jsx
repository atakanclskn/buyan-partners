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

  // --- GENİŞLETİLMİŞ İKON EŞLEŞTİRME ---
  // Admin panelindeki "value" değerleri ile buradaki case'ler birebir aynı olmalı.
  const getSocialIcon = (name) => {
    // Gelen ismin null olma ihtimaline karşı güvenli küçük harfe çevirme
    const safeName = name ? name.toLowerCase() : '';

    switch (safeName) {
      case 'linkedin': return <Linkedin size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'facebook': return <Facebook size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'github': return <Github size={20} />;
      case 'whatsapp': return <MessageCircle size={20} />; // WhatsApp için
      case 'telegram': return <Send size={20} />; // Telegram için
      case 'dribbble': return <Dribbble size={20} />;
      case 'behance': return <span className="font-bold text-lg">Be</span>; // Lucide'de Behance yoksa text
      case 'medium': return <span className="font-bold text-lg">M</span>; // Medium
      case 'discord': return (
         <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
      );
      case 'x': return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
      case 'tiktok': return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
           <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.24 1.84-.06.77.29 1.55.82 2.07.65.59 1.59.84 2.45.69.89-.13 1.73-.61 2.29-1.29.56-.72.82-1.61.82-2.52.01-3.83.01-7.65.01-11.47Z"/>
        </svg>
      );
      default: return <Globe size={20} />;
    }
  };

  return (
    <footer className="bg-primary dark:bg-slate-950 text-white pt-20 pb-10 border-t border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 tracking-wide">{general.logoText}</h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              {footer.description}
            </p>
          </div>

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