import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin } from 'lucide-react';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;

  if (!founders) return null;

  return (
    // Padding'i azalttık (py-12) ki Hero ile çok açılmasın
    <section id="founders" className="py-12 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Container'ı "max-w-full" ve "px-4" yaparak ekranın kenarlarına yaklaştırdık */}
      <div className="container mx-auto px-4 max-w-[1600px]">
        
        {/* Başlık kısmı SİLİNDİ */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {founders.items.map((founder, index) => (
            <Reveal key={founder.id} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl bg-white dark:bg-slate-800 transition-all duration-500 hover:shadow-secondary/20">
                
                {/* GÖRSEL ALANI: 
                   h-[75vh] -> Ekran yüksekliğinin %75'i kadar yer kapla (Devasa görünüm)
                   min-h-[600px] -> Mobilde çok küçülmesin
                */}
                <div className="h-[75vh] min-h-[600px] relative">
                  
                  {/* Karartma Gradyanı (Yazıların okunması için alttan siyahlık) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>

                {/* BİLGİ ALANI (Resmin üzerine biner) */}
                <div className="absolute bottom-0 left-0 right-0 p-10 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{founder.name}</h3>
                  <p className="text-secondary text-xl font-medium mb-6 uppercase tracking-widest">{founder.title}</p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {founder.bio}
                  </p>
                  
                  <a 
                    href={founder.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Linkedin size={20} />
                    <span className="font-semibold">LinkedIn Profile</span>
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