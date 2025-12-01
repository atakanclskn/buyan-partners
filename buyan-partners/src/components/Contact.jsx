import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
// FIREBASE EKLEMELERİ
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const subjectOptions = [
    "Project Consulting",
    "Request for Quotation",
    "General Inquiry",
    "Partnership Proposal"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSelectSubject = (option) => {
    setFormData({ ...formData, subject: option });
    setIsDropdownOpen(false);
    if (errors.subject) setErrors({ ...errors, subject: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    if (!formData.subject) newErrors.subject = "Please select a subject.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- FIREBASE KAYIT FONKSİYONU ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    try {
      // 'messages' koleksiyonuna yeni belge ekle
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(), // Sunucu saati
        read: false // Okunmadı olarak işaretle
      });

      setStatus("success");
      setFormData({ name: '', email: '', subject: '', message: '' }); // Formu temizle
      
      // 3 saniye sonra butonu eski haline getir
      setTimeout(() => setStatus("idle"), 3000);

    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 rounded-3xl overflow-hidden shadow-2xl border border-transparent dark:border-slate-700/50">
            
            {/* SOL TARAF (BİLGİLER) - DEĞİŞMEDİ */}
            <div className="bg-primary dark:bg-slate-800 text-white p-12 lg:p-16 lg:col-span-1 flex flex-col justify-between relative z-10 transition-colors duration-300">
              <div>
                <h3 className="text-3xl font-bold mb-6">{contact.title}</h3>
                <p className="text-white/80 mb-12 leading-relaxed">{contact.subtitle}</p>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4"><Mail className="w-6 h-6 text-secondary mt-1" /><div><p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Email</p><p className="text-lg">{contact.info.email}</p></div></div>
                  <div className="flex items-start space-x-4"><Phone className="w-6 h-6 text-secondary mt-1" /><div><p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Phone</p><p className="text-lg">{contact.info.phone}</p></div></div>
                  <div className="flex items-start space-x-4"><MapPin className="w-6 h-6 text-secondary mt-1" /><div><p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Office</p><p className="text-lg max-w-xs">{contact.info.address}</p></div></div>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex items-center space-x-2 text-white/60">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm">We are currently available for new projects</span>
                </div>
              </div>
            </div>

            {/* SAĞ TARAF (FORM) - GÜNCELLENDİ */}
            <div className="bg-white dark:bg-slate-800 p-12 lg:p-16 lg:col-span-2 transition-colors duration-300">
              <form className="space-y-6" onSubmit={handleSendMessage} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'}`} placeholder="Ex: John Doe" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'}`} placeholder="john@company.com" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Subject</label>
                  <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full px-4 py-3 rounded-lg border cursor-pointer flex justify-between items-center transition-colors ${errors.subject ? 'border-red-500' : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'}`}>
                    <span className={formData.subject ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>{formData.subject || "Select a subject..."}</span>
                    <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden">
                        {subjectOptions.map((option, idx) => (
                          <div key={idx} onClick={() => handleSelectSubject(option)} className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300">{option}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
                  <textarea rows="4" name="message" value={formData.message} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors min-h-[150px] ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'}`} placeholder="Tell us about your project..."></textarea>
                  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                </div>

                {/* BUTON DURUMLARI (Loading, Success, Idle) */}
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300
                    ${status === 'success' 
                      ? 'bg-green-500 text-white cursor-default' 
                      : status === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }
                  `}
                >
                  {status === 'loading' && <Loader2 className="animate-spin" />}
                  {status === 'success' && <><CheckCircle /> Message Sent Successfully!</>}
                  {status === 'error' && <><AlertCircle /> Error Sending Message</>}
                  {status === 'idle' && <>{contact.buttonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
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