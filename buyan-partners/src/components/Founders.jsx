import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin } from 'lucide-react';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;

  // Varsayılan Resim
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000";

  if (!founders) return null;

  return (
    <section id="founders" className="py-12 md:py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Başlık */}
        {founders.title && (
           <Reveal>
             <div className="text-center mb-8 md:mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{founders.title}</h2>
             </div>
           </Reveal>
        )}

        <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center md:gap-10">
          {founders.items.map((founder, index) => (
            
            <Reveal 
              key={founder.id} 
              delay={index * 0.1} 
              className="w-full md:w-[380px]" 
            >
              
              {/* --- DÜZELTME BURADA --- 
                  1. aspect-[3/4]: Mobilde vesikalık formatı (3'e 4) korunsun.
                  2. md:aspect-auto: Masaüstünde (md) bu orana zorlamayı İPTAL ET.
                  3. md:h-[500px]: Masaüstünde yüksekliği tekrar sabitle (Eski haline döner).
              */}
              <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl aspect-[3/4] md:aspect-auto md:h-[500px] w-full h-full">
                
                {/* Görsel Alanı */}
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <img 
                    src={(founder.image && founder.image.trim() !== "") ? founder.image : DEFAULT_IMAGE} 
                    alt={founder.name}
                    // w-full h-full: Resmi kutuya tam yayar.
                    // object-cover: Resmi bozmadan doldurur.
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out block"
                  />
                </div>

                {/* Bilgi Alanı */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  
                  {/* İsim */}
                  <h3 className="text-lg md:text-3xl font-bold mb-1 md:mb-2 leading-tight break-words">{founder.name}</h3>
                  
                  <p className="text-secondary font-bold mb-2 md:mb-4 uppercase tracking-wider text-[10px] md:text-sm">{founder.title}</p>
                  
                  <p className="hidden md:block text-gray-200 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-4">
                    {founder.bio}
                  </p>
                  
                  {founder.linkedin && founder.linkedin.trim() !== "" && founder.linkedin !== "#" && (
                    <a 
                      href={founder.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-secondary transition-colors text-xs md:text-sm font-semibold border-b border-transparent hover:border-secondary pb-1"
                    >
                      <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
                      <span className="md:inline">LinkedIn</span>
                    </a>
                  )}
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