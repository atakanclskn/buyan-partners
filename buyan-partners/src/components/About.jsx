import { useSite } from '../context/SiteContext';

const About = () => {
  const { config } = useSite();
  const { about } = config;

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* SOL TARA: GÖRSEL */}
          <div className="relative">
            {/* Dekoratif Arka Plan Karesi (Renkli) */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-secondary/10 rounded-2xl z-0"></div>
            
            {/* Ana Resim */}
            <img 
              src={about.image} 
              alt="Hakkımızda" 
              className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
            
            {/* Dekoratif Noktalar (Opsiyonel Şıklık) */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-lg">
               <div className="grid grid-cols-3 gap-2">
                 {[...Array(9)].map((_, i) => (
                   <div key={i} className="w-2 h-2 rounded-full bg-secondary"></div>
                 ))}
               </div>
            </div>
          </div>

          {/* SAĞ TARAF: METİN İÇERİĞİ */}
          <div>
            <span className="text-secondary font-bold tracking-wider text-sm uppercase mb-2 block">
              {about.badge}
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {about.title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {about.description}
            </p>

            {/* İstatistikler (Dinamik) */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              {about.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-secondary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;