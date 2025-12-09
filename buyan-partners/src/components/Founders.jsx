import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import { Linkedin, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Founders = () => {
  const { config } = useSite();
  const { founders } = config;

  const [selectedId, setSelectedId] = useState(null);
  const [direction, setDirection] = useState(0);

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000";

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  if (!founders) return null;

  const selectedFounder = founders.items.find(item => item.id === selectedId);

  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    const currentIndex = founders.items.findIndex(item => item.id === selectedId);
    const nextIndex = (currentIndex + 1) % founders.items.length;
    setSelectedId(founders.items[nextIndex].id);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    const currentIndex = founders.items.findIndex(item => item.id === selectedId);
    const prevIndex = (currentIndex - 1 + founders.items.length) % founders.items.length;
    setSelectedId(founders.items[prevIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  // --- ANİMASYON VARYANTLARI ---
  const nameTitleVariants = {
    initial: { y: 0 }, // Başlangıçta en dipte (0 kaydırma)
    hover: { y: -60, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } // Hoverda yukarı kay
  };

  const buttonGroupVariants = {
    initial: { opacity: 0, y: 20 }, // Başlangıçta gizli ve aşağıda
    hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } } // Hoverda belir
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  const contentVariants = {
    hidden: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: (direction) => ({ x: direction > 0 ? -30 : 30, opacity: 0, transition: { duration: 0.2 } })
  };

  return (
    <section id="founders" className="py-12 md:py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 relative">
      
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {founders.title && (
           <Reveal>
             <div className="text-center mb-8 md:mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{founders.title}</h2>
             </div>
           </Reveal>
        )}

        <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center md:gap-10">
          {founders.items.map((founder, index) => (
            <Reveal key={founder.id} delay={index * 0.05} className="w-full md:w-[380px]">
              
              <motion.div 
                whileHover="hover"
                initial="initial"
                onClick={() => { setDirection(0); setSelectedId(founder.id); }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg bg-white dark:bg-slate-800 cursor-pointer aspect-[3/4] md:aspect-auto md:h-[500px] w-full h-full hover:shadow-2xl transition-all duration-300"
              >
                {/* Görsel */}
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <img 
                    src={(founder.image && founder.image.trim() !== "") ? founder.image : DEFAULT_IMAGE} 
                    alt={founder.name}
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 block"
                  />
                </div>

                {/* Bilgi Alanı - Absolute Bottom ile en alta sabitlendi */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-20 text-white">
                  
                  {/* İsim ve Title Grubu */}
                  <motion.div variants={nameTitleVariants} className="relative z-20">
                    <h3 className="text-lg md:text-3xl font-bold mb-1 leading-tight">{founder.name}</h3>
                    <p className="text-secondary font-bold uppercase tracking-wider text-[10px] md:text-xs">{founder.title}</p>
                  </motion.div>
                  
                  {/* Buton Grubu - Absolute olarak alt kısma yerleştirildi */}
                  <motion.div 
                    variants={buttonGroupVariants} 
                    className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 flex items-center gap-2 z-10"
                  >
                     <button className="flex-1 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black text-white py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300">
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                     </button>

                     {founder.linkedin && founder.linkedin.trim() !== "" && (
                        <a 
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white text-white rounded-lg transition-all duration-300"
                        >
                          <Linkedin size={18} />
                        </a>
                     )}
                  </motion.div>
                </div>
              </motion.div>

            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedFounder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <button onClick={handlePrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 hidden md:block">
              <ChevronLeft size={32} />
            </button>
            <button onClick={handleNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/10 hidden md:block">
              <ChevronRight size={32} />
            </button>

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[85vh] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl relative z-[105] flex flex-col md:flex-row"
            >
              
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-black/5 hover:bg-red-500 hover:text-white dark:bg-white/10 dark:hover:bg-red-500 text-gray-900 dark:text-white rounded-full transition-all z-50"
              >
                <X size={24} />
              </button>

              <AnimatePresence mode='wait' custom={direction}>
                <motion.div 
                  key={selectedId}
                  custom={direction}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col md:flex-row w-full h-full"
                >
                  
                  <div className="w-full md:w-2/5 h-64 md:h-full relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
                    <img 
                      src={(selectedFounder.image && selectedFounder.image.trim() !== "") ? selectedFounder.image : DEFAULT_IMAGE} 
                      alt={selectedFounder.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-4 left-4 z-20 md:hidden text-white">
                        <h3 className="text-2xl font-bold">{selectedFounder.name}</h3>
                        <p className="text-secondary text-sm font-bold uppercase">{selectedFounder.title}</p>
                    </div>
                  </div>

                  <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col h-full bg-white dark:bg-slate-900">
                    
                    <div className="hidden md:block mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">
                      <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedFounder.name}
                      </h3>
                      <p className="text-secondary font-bold uppercase tracking-widest">
                        {selectedFounder.title}
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base space-y-4">
                      {selectedFounder.bio.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 shrink-0">
                       {selectedFounder.linkedin && selectedFounder.linkedin.trim() !== "" && (
                        <a 
                          href={selectedFounder.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all font-medium text-sm"
                        >
                          <Linkedin size={18} />
                          <span>LinkedIn Profile</span>
                        </a>
                      )}
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Founders;