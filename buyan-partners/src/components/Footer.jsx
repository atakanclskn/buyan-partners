import { useSite } from '../context/SiteContext';
import { Linkedin, Instagram, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const { config } = useSite();
  const { footer, general } = config;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Link Tıklama Yöneticisi
  const handleLinkClick = (e, path) => {
    if (path === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  const getSocialIcon = (name) => {
    switch (name) {
      case 'linkedin': return <Linkedin size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'facebook': return <Facebook size={20} />;
      case 'x': return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
      default: return null;
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
            <h3 className="font-bold text-lg mb-6">{footer.labels.menu}</h3>
            <ul className="space-y-4 text-gray-400">
              {config.navigation.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.path} 
                    onClick={(e) => handleLinkClick(e, item.path)} // <-- BURAYI GÜNCELLEDİK
                    className="hover:text-secondary transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">{footer.labels.legal}</h3>
            <ul className="space-y-4 text-gray-400">
              {footer.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="hover:text-secondary transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-8">
              {footer.socials.map((social) => (
                <a 
                  key={social.id} 
                  href={social.url} 
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
            {footer.labels.backToTop}
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