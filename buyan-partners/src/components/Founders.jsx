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
    <section id="founders" className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Başlık */}
        {founders.title && (
           <Reveal>
             <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{founders.title}</h2>
             </div>
           </Reveal>
        )}

        {/* --- DÜZEN (LAYOUT) --- 
            flex: Yan yana diz.
            flex-wrap: Ekrana sığmazsa (mobil) alta geç.
            justify-center: ORTALA (2 kişi tam ortada durur).
            gap-10: Aralarına boşluk koy.
        */}
        <div className="flex flex-wrap justify-center gap-10">
          {founders.items.map((founder, index) => (
            
            <Reveal 
              key={founder.id} 
              delay={index * 0.1} 
              // --- KART BOYUTU ---
              // Mobilde: %100 genişlik (w-full)
              // Bilgisayarda: Sabit 380px (md:w-[380px]) -> İdeal portre boyutu
              className="w-full md:w-[380px]"
            >
              
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl h-[500px]">
                
                {/* Görsel Alanı */}
                <div className="w-full h-full relative">
                  {/* Karartma Efekti */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <img 
                    src={(founder.image && founder.image.trim() !== "") ? founder.image : DEFAULT_IMAGE} 
                    alt={founder.name}
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                  />
                </div>

                {/* Bilgi Alanı */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold mb-2">{founder.name}</h3>
                  <p className="text-secondary font-bold mb-4 uppercase tracking-wider text-sm">{founder.title}</p>
                  
                  <p className="text-gray-200 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-4">
                    {founder.bio}
                  </p>
                  
                  {founder.linkedin && founder.linkedin.trim() !== "" && founder.linkedin !== "#" && (
                    <a 
                      href={founder.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-secondary transition-colors text-sm font-semibold border-b border-transparent hover:border-secondary pb-1"
                    >
                      <Linkedin size={18} />
                      <span>LinkedIn Profile</span>
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