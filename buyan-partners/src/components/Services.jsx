import { useSite } from '../context/SiteContext';
import * as Icons from 'lucide-react'; // Tüm ikonları çektik

// İkon isminden (string) bileşene çeviren yardımcı fonksiyon
const DynamicIcon = ({ name }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle />; // Hata olursa soru işareti göster
  return <IconComponent size={40} strokeWidth={1.5} />;
};

const Services = () => {
  const { config } = useSite();
  const { services } = config;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {services.title}
          </h2>
          <p className="text-xl text-gray-600">
            {services.subtitle}
          </p>
        </div>

        {/* Hizmet Kartları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.items.map((item) => (
            <div 
              key={item.id} 
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* İkon Kutusu: Rengi global temadan (secondary) alıyor */}
              <div className="mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">
                <DynamicIcon name={item.icon} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;