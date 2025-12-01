import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin } from 'lucide-react';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;

  if (!founders) return null;

  return (
    <section id="founders" className="py-16 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      <div className="container mx-auto px-6 max-w-7xl"> {/* max-w-6xl yerine 7xl yaptık biraz daha geniş olsun */}
        
        {founders.title && (
           <Reveal>
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{founders.title}</h2>
             </div>
           </Reveal>
        )}

        {/* --- GRID DÜZELTMESİ --- */}
        {/* Mobilde 1, Tablette 2, Masaüstünde 3 sütun. (Eğer 3 kişi varsa) */}
        {/* 'lg:grid-cols-2' yerine 'lg:grid-cols-3' eklendi ve 2 kişi varsa ortalansın diye justify-center eklendi */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${founders.items.length > 2 ? '3' : '2'} gap-8 justify-center`}>
          {founders.items.map((founder, index) => (
            <Reveal key={founder.id} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full">
                
                <div className="h-[500px] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>
                  
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-secondary font-medium mb-4 uppercase tracking-wider text-sm">{founder.title}</p>
                  
                  <p className="text-gray-200 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-4">
                    {founder.bio}
                  </p>
                  
                  <a 
                    href={founder.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-secondary transition-colors text-sm font-semibold"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn Profile</span>
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