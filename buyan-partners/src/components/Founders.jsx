import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;
  const scrollContainerRef = useRef(null);

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000";

  if (!founders) return null;

  // Kaydırma Fonksiyonu
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Kart Genişliği (350px) + Gap (24px) = 374px kaydır
      const scrollAmount = 374; 
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="founders" className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Container max-w-full yaptık ki taşabilsin, ama padding ile hizaladık */}
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {founders.title && (
           <Reveal>
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{founders.title}</h2>
             </div>
           </Reveal>
        )}

        <div className="relative group/container">
          
          {/* --- CAROUSEL ALANI --- */}
          {/* flex-nowrap: Asla alt satıra inme */}
          {/* overflow-x-auto: Sağa doğru taşanları kaydırılabilir yap */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
          >
            {founders.items.map((founder, index) => (
              
              <Reveal 
                key={founder.id} 
                delay={index * 0.1} 
                // --- KRİTİK NOKTA ---
                // flex-shrink-0: Kapsayıcı daralsa bile sen asla küçülme!
                // w-[300px] md:w-[350px]: Genişliği her zaman sabit tut.
                className="flex-shrink-0 snap-center w-[300px] md:w-[350px]"
              >
                
                {/* KART (SABİT YÜKSEKLİK: 450px) */}
                <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-[450px] w-full">
                  
                  {/* Görsel Alanı */}
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>
                    
                    <img 
                      src={(founder.image && founder.image.trim() !== "") ? founder.image : DEFAULT_IMAGE} 
                      alt={founder.name}
                      // object-cover: Resmi bozmadan kutuyu doldur (taşan kısımları kırp)
                      className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                    />
                  </div>

                  {/* Bilgi Alanı */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-1 line-clamp-1">{founder.name}</h3>
                    <p className="text-secondary font-medium mb-3 uppercase tracking-wider text-xs line-clamp-1">{founder.title}</p>
                    
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-3">
                      {founder.bio}
                    </p>
                    
                    {founder.linkedin && founder.linkedin.trim() !== "" && founder.linkedin !== "#" && (
                      <a 
                        href={founder.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-secondary transition-colors text-xs font-semibold"
                      >
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* --- OKLAR --- */}
          {/* Her zaman göster veya sayıya göre (Burada her zaman gösteriyoruz) */}
          <div className="flex justify-center items-center gap-4 mt-2">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-gray-300 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-secondary transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-gray-300 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-secondary transition-all active:scale-95 cursor-pointer"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>

        </div>

      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </section>
  );
};

export default Founders;