import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin } from 'lucide-react';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;

  if (!founders) return null; // Eğer config'de yoksa gösterme

  return (
    <section id="founders" className="py-24 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {founders.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {founders.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {founders.items.map((founder, index) => (
            <Reveal key={founder.id} delay={index * 0.2}>
              <div className="group relative overflow-hidden rounded-3xl shadow-xl h-full bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-2">
                
                {/* Fotoğraf (Siyah-Beyaz Efektli) */}
                <div className="h-96 md:h-[500px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>

                {/* Bilgi Alanı */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                  <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-secondary font-medium mb-4">{founder.title}</p>
                  <p className="text-white/80 leading-relaxed mb-6 line-clamp-4">
                    {founder.bio}
                  </p>
                  
                  <a 
                    href={founder.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-secondary transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Founders;