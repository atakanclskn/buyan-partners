import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext'; // Context'i ekledik

const Preloader = () => {
  const { darkMode } = useSite(); // Dark mode durumunu çekiyoruz

  // --- RENK AYARLARI ---
  // Light Mode: Koyu Gri zemin üzerine Gümüş parıltı
  const lightGradient = 'linear-gradient(120deg, #1e293b 40%, #94a3b8 50%, #1e293b 60%)';
  
  // Dark Mode: Açık Gri zemin üzerine Beyaz parıltı (Daha parlak)
  const darkGradient = 'linear-gradient(120deg, #64748b 40%, #ffffff 50%, #64748b 60%)';

  return (
    <motion.div
      // Çıkış Animasyonu
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
      // ARKA PLAN: Dark mode ise siyah, değilse beyaz
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="relative">
        {/* SHINY TEXT EFEKTİ */}
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-widest uppercase"
          style={{
            color: 'transparent',
            // Dinamik Arka Plan (Gradient)
            backgroundImage: darkMode ? darkGradient : lightGradient,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            animation: 'shine 3s linear infinite'
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