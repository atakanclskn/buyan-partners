import { useSite } from '../context/SiteContext';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const Contact = () => {
  const { config } = useSite();
  const { contact } = config;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* SOL TARAF (Bilgiler): Zaten bg-primary olduğu için dark mode'da güzel durur, dokunmuyoruz. */}
            <div className="bg-primary text-white p-12 lg:p-16 lg:col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-6">{contact.title}</h3>
                <p className="text-white/80 mb-12 leading-relaxed">
                  {contact.subtitle}
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-secondary mt-1" />
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Email</p>
                      <p className="text-lg">{contact.info.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-secondary mt-1" />
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Telefon</p>
                      <p className="text-lg">{contact.info.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-secondary mt-1" />
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Ofis</p>
                      <p className="text-lg max-w-xs">{contact.info.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex items-center space-x-2 text-white/60">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm">Şu an yeni projeler için müsaitiz</span>
                </div>
              </div>
            </div>

            {/* SAĞ TARAF (Form): Burası önemli! */}
            <div className="bg-gray-50 dark:bg-slate-800 p-12 lg:p-16 lg:col-span-2 transition-colors duration-300">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Adınız Soyadınız</label>
                    <input type="text" 
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:border-secondary outline-none transition-all" 
                      placeholder="Örn: Ahmet Yılmaz" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Email Adresiniz</label>
                    <input type="email" 
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:border-secondary outline-none transition-all" 
                      placeholder="ahmet@sirket.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Konu</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white focus:border-secondary outline-none transition-all">
                    <option>Proje Danışmanlığı</option>
                    <option>Fiyat Teklifi</option>
                    <option>Genel Bilgi</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Mesajınız</label>
                  <textarea rows="4" 
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white focus:border-secondary outline-none transition-all" 
                    placeholder="Projenizden bahsedin..."
                  ></textarea>
                </div>

                <button type="button" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 group cursor-pointer shadow-lg shadow-primary/20">
                  {contact.buttonText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Contact;