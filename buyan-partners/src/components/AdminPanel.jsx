import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { X, Save, Layout, Users, Briefcase, Type } from 'lucide-react';

const AdminPanel = ({ onClose }) => {
  const { config } = useSite();
  
  // Hangi sekmenin açık olduğunu tutar
  const [activeTab, setActiveTab] = useState('hero');
  
  // Form verilerini tutar (Başlangıçta mevcut config)
  const [formData, setFormData] = useState(config);
  
  // Kaydetme durumu
  const [saving, setSaving] = useState(false);

  // Input değiştikçe state'i güncelle
  const handleChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // --- FIREBASE KAYDETME FONKSİYONU ---
  const handleSave = async (sectionName) => {
    setSaving(true);
    try {
      // Firestore'daki ilgili dokümanı güncelle (Örn: 'hero' dokümanı)
      const docRef = doc(db, "site-content", sectionName);
      
      // Sadece o bölümün verisini gönderiyoruz
      await updateDoc(docRef, formData[sectionName]);
      
      alert(`${sectionName.toUpperCase()} başarıyla güncellendi! 🎉`);
    } catch (error) {
      console.error("Hata:", error);
      alert("Kaydederken hata oluştu: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white">
      
      {/* SOL MENÜ (SIDEBAR) */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="font-bold text-xl">Yönetim Paneli</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'hero' ? 'bg-secondary text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            <Layout size={18} /> Hero (Giriş)
          </button>
          
          <button 
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'about' ? 'bg-secondary text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            <Type size={18} /> Hakkımızda
          </button>

          {/* Diğer sekmeler buraya eklenebilir (Services, Founders vb.) */}
        </nav>
      </div>

      {/* SAĞ İÇERİK (EDİTÖR) */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* --- HERO EDİTÖRÜ --- */}
        {activeTab === 'hero' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Layout className="text-secondary" /> Hero Alanını Düzenle
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 opacity-70">Ana Başlık (Title)</label>
                <textarea 
                  rows="3"
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:border-secondary outline-none"
                  value={formData.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-70">Alt Başlık (Subtitle)</label>
                <textarea 
                  rows="3"
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:border-secondary outline-none"
                  value={formData.hero.subtitle}
                  onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-70">Buton Metni</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:border-secondary outline-none"
                  value={formData.hero.buttonText}
                  onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={() => handleSave('hero')}
              disabled={saving}
              className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        )}

        {/* --- ABOUT EDİTÖRÜ --- */}
        {activeTab === 'about' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Type className="text-secondary" /> Hakkımızda Alanını Düzenle
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 opacity-70">Üst Başlık (Badge)</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:border-secondary outline-none"
                  value={formData.about.badge}
                  onChange={(e) => handleChange('about', 'badge', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-70">Ana Başlık</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:border-secondary outline-none"
                  value={formData.about.title}
                  onChange={(e) => handleChange('about', 'title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 opacity-70">Açıklama</label>
                <textarea 
                  rows="6"
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:border-secondary outline-none"
                  value={formData.about.description}
                  onChange={(e) => handleChange('about', 'description', e.target.value)}
                />
              </div>
            </div>

            <button 
              onClick={() => handleSave('about')}
              disabled={saving}
              className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;