import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      // Çıkış Animasyonu (Yukarı doğru süzülerek kaybolur)
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative">
        {/* SHINY TEXT EFEKTİ */}
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-widest uppercase"
          style={{
            // Metin şeffaf, arka planı (gradient) gösteriyoruz
            color: 'transparent',
            // Arka plan: Koyu Gri -> Parlak Gümüş -> Koyu Gri
            backgroundImage: 'linear-gradient(120deg, #1e293b 40%, #94a3b8 50%, #1e293b 60%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            // Sonsuz döngü animasyonu (CSS inline olarak ekledik)
            animation: 'shine 3s linear infinite'
          }}
        >
          Buyan Partners
        </h1>

        {/* CSS Keyframes (Bu bileşene özel) */}
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