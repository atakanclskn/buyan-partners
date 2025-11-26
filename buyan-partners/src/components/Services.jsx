import { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { X, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} strokeWidth={1.5} />;
};

const Services = () => {
  const { config } = useSite();
  const { services } = config;
  const itemCount = services.items.length;

  const [selectedId, setSelectedId] = useState(null);
  const [direction, setDirection] = useState(0); // Kayma yönü için (1: Sağ, -1: Sol)

  // Seçili kartın verisini bul
  const selectedService = services.items.find(item => item.id === selectedId);

  // --- SCROLL KİLİTLEME ---
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  // --- NAVİGASYON ---
  const handleNext = (e) => {
    e?.stopPropagation();
    setDirection(1); // Sağa kay
    const currentIndex = services.items.findIndex(item => item.id === selectedId);
    const nextIndex = (currentIndex + 1) % services.items.length;
    setSelectedId(services.items[nextIndex].id);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setDirection(-1); // Sola kay
    const currentIndex = services.items.findIndex(item => item.id === selectedId);
    const prevIndex = (currentIndex - 1 + services.items.length) % services.items.length;
    setSelectedId(services.items[prevIndex].id);
  };

  // Klavye Kontrolü
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

  // --- ANİMASYON AYARLARI ---
  const contentVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 200 : -200, // Sağdan veya soldan gel
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200, // Ters yöne git
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  const getGridClass = (count) => {
    switch (count) {
      case 1: return "grid-cols-1 max-w-lg mx-auto";
      case 2: return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="container mx-auto px-6">
        
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              {services.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
              {services.subtitle}
            </p>
          </div>
        </Reveal>

        <div className={`grid gap-8 ${getGridClass(itemCount)}`}>
          {services.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <motion.div 
                layoutId={`card-${item.id}`} // --- SİHİRLİ ID ---
                onClick={() => { setDirection(0); setSelectedId(item.id); }}
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-secondary/30 transition-colors duration-300 h-full flex flex-col cursor-pointer relative overflow-hidden"
              >
                <div className="mb-6 text-secondary group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <DynamicIcon name={item.icon} className="w-12 h-12" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-secondary transition-colors uppercase relative z-10">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors mb-6 relative z-10 line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center text-secondary font-semibold text-sm relative z-10">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* --- TAM EKRAN AÇILAN KART --- */}
      <AnimatePresence>
        {selectedId && selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            
            {/* 1. Arka Plan (Blur) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* 2. Navigasyon Okları (Dışarıda) */}
            <button onClick={handlePrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hidden md:block">
              <ChevronLeft size={40} />
            </button>
            <button onClick={handleNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hidden md:block">
              <ChevronRight size={40} />
            </button>

            {/* 3. Büyüyen Kart */}
            <motion.div
              layoutId={`card-${selectedId}`} // --- IZGARADAKİ KARTLA AYNI ID ---
              className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 relative z-[105] flex flex-col"
            >
              
              {/* Kapat Butonu (İçeride, Sabit) */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white rounded-full transition-all z-20"
              >
                <X size={24} />
              </button>

              {/* İçerik Animasyonu (Slide) */}
              <AnimatePresence mode='wait' custom={direction}>
                <motion.div 
                  key={selectedId} // ID değişince animasyon çalışır
                  custom={direction}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between p-8 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 shrink-0">
                    <div className="flex items-center gap-6 pr-12">
                      <div className="p-4 bg-secondary text-white rounded-2xl shadow-lg shadow-secondary/30 hidden sm:block">
                        <DynamicIcon name={selectedService.icon} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                          {selectedService.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                          {selectedService.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* İçerik Listesi */}
                  <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      {selectedService.details.map((detail, i) => (
                        <div key={i}>
                          <h4 className="text-lg font-bold text-secondary mb-4 pb-2 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            {detail.title}
                          </h4>
                          <ul className="space-y-3">
                            {detail.list.map((item, j) => (
                              <li key={j} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
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

export default Services;