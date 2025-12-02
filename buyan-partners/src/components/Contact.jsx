import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const { config } = useSite();
  
  if (!config || !config.contact) return null;
  const { contact } = config;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState("idle"); 

  const subjectOptions = [
    "Project Consulting",
    "Request for Quotation",
    "General Inquiry",
    "Partnership Proposal"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Hatayı temizle
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
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false
      });

      setStatus("success");
      setFormData({ name: '', email: '', subject: '', message: '' });
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
            
            {/* SOL TARAF (BİLGİLER) */}
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

            {/* SAĞ TARAF (FORM) */}
            <div className="bg-white dark:bg-slate-800 p-12 lg:p-16 lg:col-span-2 transition-colors duration-300">
              <form className="space-y-0" onSubmit={handleSendMessage} noValidate>
                {/* space-y-0 yaptık, her elemana kendi margin-bottom'ını vereceğiz (mb-6) */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  {/* NAME */}
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'}`} 
                      placeholder="Ex: Your Name" 
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* EMAIL */}
                  <div className="relative">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'}`} 
                      placeholder="your@email.com" 
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* SUBJECT (DROPDOWN) */}
                <div className="relative mb-6 z-20"> {/* z-20 verdik ki açılınca mesaj kutusunun üstüne çıksın */}
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Subject</label>
                  
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className={`w-full px-4 py-3 rounded-lg border cursor-pointer flex justify-between items-center transition-colors 
                      ${errors.subject ? 'border-red-500' : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'}
                    `}
                  >
                    <span className={formData.subject ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>{formData.subject || "Select a subject..."}</span>
                    <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* HATA MESAJI (Menü açıksa GÖSTERME) */}
                  <AnimatePresence>
                    {errors.subject && !isDropdownOpen && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden">
                      {subjectOptions.map((option, idx) => (
                        <div key={idx} onClick={() => handleSelectSubject(option)} className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300">{option}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="relative mb-6 z-10">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Message</label>
                    <span className="text-xs text-gray-400">{formData.message.length}/1000</span>
                  </div>
                  <textarea 
                    rows="4" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange}
                    maxLength={1000}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border text-gray-900 dark:text-white focus:border-secondary outline-none transition-colors 
                      min-h-[150px] max-h-[300px] resize-y
                      ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-slate-600'}
                    `} 
                    placeholder="Tell us about your project..."
                  ></textarea>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-5 left-0 text-red-500 text-xs font-medium flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 mt-4
                    ${status === 'success' 
                      ? 'bg-green-500 text-white cursor-default' 
                      : status === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }
                  `}
                >
                  {status === 'loading' && <Loader className="animate-spin" />}
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