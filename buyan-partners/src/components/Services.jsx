import { useSite } from '../context/SiteContext';
import * as Icons from 'lucide-react';
import Reveal from './Reveal';

const DynamicIcon = ({ name }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle />;
  return <IconComponent size={40} strokeWidth={1.5} />;
};

const Services = () => {
  const { config } = useSite();
  const { services } = config;

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <div 
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6 text-secondary group-hover:scale-110 transition-transform duration-300">
                  <DynamicIcon name={item.icon} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;