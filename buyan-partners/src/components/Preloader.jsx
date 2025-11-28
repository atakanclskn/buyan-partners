import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

const Preloader = () => {
  const { darkMode } = useSite();

  const lightGradient = 'linear-gradient(120deg, #1e293b 40%, #94a3b8 50%, #1e293b 60%)';
  const darkGradient = 'linear-gradient(120deg, #64748b 40%, #ffffff 50%, #64748b 60%)';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="relative">
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-widest uppercase"
          style={{
            color: 'transparent',
            backgroundImage: darkMode ? darkGradient : lightGradient,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            // HIZLANDIRILDI: 3s yerine 1.5s
            animation: 'shine 1.5s linear infinite' 
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