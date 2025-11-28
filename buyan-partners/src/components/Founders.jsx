import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin } from 'lucide-react';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;

  if (!founders) return null;

  return (
    <section id="founders" className="py-16 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Container genişliğini max-w-6xl yaptık (Daha derli toplu) */}
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* İsteğe bağlı başlık (Eğer config'de varsa gösterir, yoksa gizler) */}
        {founders.title && (
           <Reveal>
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{founders.title}</h2>
             </div>
           </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.items.map((founder, index) => (
            <Reveal key={founder.id} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                
                {/* GÖRSEL ALANI KÜÇÜLTÜLDÜ:
                   Eskiden: h-[75vh] (Ekranın %75'i)
                   Şimdi: h-[500px] (Sabit ve makul bir yükseklik)
                */}
                <div className="h-[500px] relative">
                  
                  {/* Karartma */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>

                {/* BİLGİ ALANI */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-secondary font-medium mb-4 uppercase tracking-wider text-sm">{founder.title}</p>
                  
                  {/* Biyografi artık daha az yer kaplıyor ve hover ile netleşiyor */}
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