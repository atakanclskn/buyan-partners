import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';

const Contact = () => {
  const { config } = useSite();
  const { contact } = config;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subjectOptions = [
    "Proje Danışmanlığı",
    "Fiyat Teklifi",
    "Genel Bilgi",
    "İş Ortaklığı"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSelectSubject = (option) => {
    setFormData({ ...formData, subject: option });
    setIsDropdownOpen(false);
    
    if (errors.subject) {
      setErrors({ ...errors, subject: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Lütfen adınızı giriniz.";
    if (!formData.email.trim()) newErrors.email = "Email adresi zorunludur.";
    if (!formData.subject) newErrors.subject = "Lütfen bir konu seçiniz.";
    if (!formData.message.trim()) newErrors.message = "Mesaj içeriği boş olamaz.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendMail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { name, email, subject, message } = formData;
    const targetEmail = contact.info.email;

    const mailSubject = encodeURIComponent(`${subject} - ${name}`);
    const mailBody = encodeURIComponent(
      `Gönderen: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`
    );

    window.location.href = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section id="contact" className="py-24 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 rounded-3xl overflow-hidden shadow-2xl border border-transparent dark:border-slate-700/50">
            
            {/* SOL TARAF */}
            <div className="bg-primary dark:bg-slate-800 text-white p-12 lg:p-16 lg:col-span-1 flex flex-col justify-between relative z-10 transition-colors duration-300">
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

            {/* SAĞ TARAF (Form) */}
            <div className="bg-white dark:bg-slate-800 p-12 lg:p-16 lg:col-span-2 transition-colors duration-300">
              
              <form className="space-y-6" onSubmit={handleSendMail} noValidate>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* İSİM */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Adınız Soyadınız</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      // transition-all YERİNE transition-colors KULLANDIK (Kasmayı engeller)
                      // placeholder renklerini ekledik
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500
                        ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-slate-600'}
                      `}
                      placeholder="Örn: Ahmet Yılmaz" 
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-red-500 text-xs font-medium">
                          <AlertCircle size={12} /> {errors.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Email Adresiniz</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500
                        ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-slate-600'}
                      `}
                      placeholder="ahmet@sirket.com" 
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-red-500 text-xs font-medium">
                          <AlertCircle size={12} /> {errors.email}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* KONU */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Konu</label>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 rounded-lg border cursor-pointer flex justify-between items-center transition-colors duration-300 hover:border-secondary
                      ${errors.subject 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                        : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'}
                    `}
                  >
                    <span className={formData.subject ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}>
                      {formData.subject || "Bir konu seçiniz..."}
                    </span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${formData.subject ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-red-500 text-xs font-medium mt-1">
                        <AlertCircle size={12} /> {errors.subject}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        {subjectOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleSelectSubject(option)}
                            className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between
                              ${formData.subject === option 
                                ? 'bg-secondary/10 text-secondary font-semibold' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                              }`}
                          >
                            {option}
                            {formData.subject === option && <div className="w-2 h-2 rounded-full bg-secondary"></div>}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* MESAJ */}
                {/* MESAJ ALANI */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">Mesajınız</label>
                  <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    // DEĞİŞİKLİK: 'min-h-[150px]' ekledik. Artık 150px'den daha küçük olamaz.
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors duration-300 resize-y placeholder:text-gray-400 dark:placeholder:text-gray-500 min-h-[150px]
                      ${errors.message ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-slate-600'}
                    `}
                    placeholder="Projenizden bahsedin..."
                  ></textarea>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-red-500 text-xs font-medium">
                        <AlertCircle size={12} /> {errors.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button type="submit" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 group cursor-pointer shadow-lg shadow-primary/20">
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