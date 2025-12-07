import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

const Preloader = () => {
  const { darkMode } = useSite();

  // Efekt Renkleri (Yazı ve İkon için ortak)
  const lightGradient = 'linear-gradient(120deg, #1e293b 40%, #94a3b8 50%, #1e293b 60%)';
  const darkGradient = 'linear-gradient(120deg, #64748b 40%, #ffffff 50%, #64748b 60%)';
  
  // Animasyon Ayarı
  const animationStyle = {
    animation: 'shine 1.5s linear infinite',
    backgroundSize: '200% 100%',
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6 relative">
        
        {/* --- SHINY ICON (MASKELEME TEKNİĞİ) --- */}
        <div 
          className="w-24 h-24 md:w-32 md:h-32 transition-all duration-300"
          style={{
            // 1. Arka planı yazı ile aynı yapıyoruz (Gradyan)
            backgroundImage: darkMode ? darkGradient : lightGradient,
            ...animationStyle,

            // 2. SVG Dosyasını "Kalıp" (Maske) olarak kullanıyoruz
            // Böylece gradyan sadece logonun olduğu yerlerde görünüyor
            maskImage: `url(${darkMode ? "/logo-icon-light.svg" : "/logo-icon-dark.svg"})`,
            WebkitMaskImage: `url(${darkMode ? "/logo-icon-light.svg" : "/logo-icon-dark.svg"})`,
            
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
          }}
        />

        {/* --- SHINY TEXT (AYNI EFEKT) --- */}
        <h1 
          className="text-4xl md:text-6xl font-brand font-bold tracking-widest uppercase text-center"
          style={{
            color: 'transparent', // Yazının kendisi şeffaf olsun ki arkadaki gradyan görünsün
            backgroundImage: darkMode ? darkGradient : lightGradient,
            WebkitBackgroundClip: 'text', // Gradyanı yazıya kırp
            backgroundClip: 'text',
            ...animationStyle
          }}
        >
          Buyan Partners
        </h1>

        <style>{`
          @keyframes shine {
            0% { background-position: 100%; }
            100% { background-position: -100%; }
          }
        `}</style>
      </div>
    </motion.div>
  );
};

export default Preloader;