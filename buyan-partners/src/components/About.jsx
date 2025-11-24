import { useSite } from '../context/SiteContext';
import Reveal from './Reveal';
import CountUp from './CountUp'; // YENİ: Kendi oluşturduğumuz dosya

const About = () => {
  const { config } = useSite();
  const { about } = config;

  // İstatistik verisini parse edip render eden fonksiyon
  const renderStatValue = (valueString) => {
    // Regex ile sayıyı (15) ve eki (+, M$ gibi) ayırıyoruz
    const match = valueString.match(/(\d+)(.*)/);
    
    if (match) {
      const number = parseInt(match[1]); // Örn: 15
      const suffix = match[2]; // Örn: + veya M$

      return (
        <span className="flex items-center">
          <CountUp 
            from={0}
            to={number} 
            separator=","
            direction="up"
            duration={1} // Saniye cinsinden süre (Yay efektiyle daha doğal durur)
            className="count-up-text"
          />
          {suffix}
        </span>
      );
    }
    return valueString;
  };

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* SOL TARAF: GÖRSEL */}
          <Reveal>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-secondary/10 rounded-2xl z-0"></div>
              <img 
                src={about.image} 
                alt="Hakkımızda" 
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg transition-colors">
                 <div className="grid grid-cols-3 gap-2">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className="w-2 h-2 rounded-full bg-secondary"></div>
                   ))}
                 </div>
              </div>
            </div>
          </Reveal>

          {/* SAĞ TARAF: METİN */}
          <Reveal delay={0.2}>
            <div>
              <span className="text-secondary font-bold tracking-wider text-sm uppercase mb-2 block">
                {about.badge}
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
                {about.title}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors">
                {about.description}
              </p>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-6 border-t border-gray-200 dark:border-slate-700 pt-8 transition-colors">
                {about.stats.map((stat, index) => (
                  <div key={index}>
                    {/* YENİ CountUp Bileşeni Burada Kullanılıyor */}
                    <div className="text-3xl font-bold text-secondary mb-1 flex items-center">
                      {renderStatValue(stat.value)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default About;