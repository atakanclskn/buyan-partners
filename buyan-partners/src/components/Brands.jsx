import { useSite } from '../context/SiteContext';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

// İkon bileşeni (Dinamik ikon çağırmak için)
const BrandIcon = ({ name, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const Brands = () => {
  const { config } = useSite();
  const { brands } = config;

  // Sonsuz döngü için listeyi kopyalayıp uzatıyoruz (Seamless Loop)
  // Listeyi 4 kere kopyalıyoruz ki ekran geniş olsa bile boşluk kalmasın
  const duplicatedBrands = [...brands.list, ...brands.list, ...brands.list, ...brands.list];

  return (
    <section className="py-10 bg-white dark:bg-black border-b border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          {brands.title}
        </p>

        {/* Maskeleme: Kenarları flu yapmak için (Gradient Mask) */}
        <div 
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
          }}
        >
          {/* Kayan Şerit */}
          <motion.div
            className="flex items-center gap-16 w-max"
            animate={{ x: [0, -1000] }} // Sola doğru kaydır
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40, // Hız ayarı (düşük sayı = hızlı)
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                {/* Logo İkonu */}
                <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                   <BrandIcon name={brand.icon} className="w-6 h-6" />
                </div>
                
                {/* Marka İsmi */}
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {brand.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Brands;