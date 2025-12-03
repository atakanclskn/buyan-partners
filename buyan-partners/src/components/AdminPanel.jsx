import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { db, auth } from '../firebase';
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { X } from 'lucide-react';
import Sidebar from './admin/Sidebar';
import AdminInbox from './admin/Inbox';
import ServicesEditor from './admin/ServicesEditor';
import { HeroEditor, AboutEditor, FoundersEditor, ContactEditor, ThemeEditor, FooterEditor } from './admin/GeneralEditors';
import IconPicker from './IconPicker';
import SystemLogs from './admin/SystemLogs';

const AdminPanel = ({ onClose }) => {
  const { config } = useSite();
  const [activeTab, setActiveTab] = useState('inbox');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(config)));
  const [saving, setSaving] = useState(false);
  const [pickingIconFor, setPickingIconFor] = useState(null);

  // --- LOGLAMA (CASUS) ---
  const logActivity = async (type, action, details = "") => {
    try {
      await addDoc(collection(db, "system_logs"), {
        type,
        action,
        details,
        user: auth.currentUser?.email || "Unknown Admin",
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Log error:", err);
    }
  };

  useEffect(() => {
    logActivity('login', 'Admin Accessed Panel', 'User entered the dashboard.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- HANDLERS ---
  const handleChange = (section, key, value) => { setFormData(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } })); };
  const handleGeneralChange = (key, value) => { setFormData(prev => ({ ...prev, general: { ...prev.general, [key]: value } })); };
  const handleArrayChange = (section, index, key, value) => { const newList = [...formData[section].items]; newList[index] = { ...newList[index], [key]: value }; setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } })); };
  const handleAddItem = (section, template) => { const newItem = { id: Date.now(), ...template }; setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: [...prev[section].items, newItem] } })); };
  
  const handleDeleteItem = async (section, index) => {
    if(!window.confirm("Delete item?")) return;
    const newList = formData[section].items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } }));
  };

  const handleFooterArrayChange = (arr, i, k, v) => { const newList = [...formData.footer[arr]]; newList[i] = { ...newList[i], [k]: v }; setFormData(prev => ({ ...prev, footer: { ...prev.footer, [arr]: newList } })); };
  const handleAddFooterItem = (arr, tpl) => { setFormData(prev => ({ ...prev, footer: { ...prev.footer, [arr]: [...prev.footer[arr], tpl] } })); };
  const handleDeleteFooterItem = (arr, i) => { if(!window.confirm("Delete?")) return; const newList = formData.footer[arr].filter((_, idx) => idx !== i); setFormData(prev => ({ ...prev, footer: { ...prev.footer, [arr]: newList } })); };
  const handleContactInfoChange = (key, value) => { setFormData(prev => ({ ...prev, contact: { ...prev.contact, info: { ...prev.contact.info, [key]: value } } })); };
  const handleStatChange = (index, key, value) => { const newStats = [...formData.about.stats]; newStats[index] = { ...newStats[index], [key]: value }; setFormData(prev => ({ ...prev, about: { ...prev.about, stats: newStats } })); };
  const handleApplyPreset = (preset) => { const currentThemeName = formData.theme.activeTheme; setFormData(prev => ({ ...prev, theme: { ...prev.theme, themes: { ...prev.theme.themes, [currentThemeName]: { ...prev.theme.themes[currentThemeName], primary: preset.primary, secondary: preset.secondary } } } })); };
  const handleDetailChange = (serviceIndex, detailIndex, key, value) => { const newServices = [...formData.services.items]; if (key === 'list') { value = value.split('\n'); } newServices[serviceIndex].details[detailIndex] = { ...newServices[serviceIndex].details[detailIndex], [key]: value }; setFormData(prev => ({ ...prev, services: { ...prev.services, items: newServices } })); };
  const handleIconSelect = (iconName) => { if (pickingIconFor !== null) { handleArrayChange('services', pickingIconFor, 'icon', iconName); setPickingIconFor(null); } };

  const handleSave = async (sectionName) => {
    setSaving(true);
    try {
      const docRef = doc(db, "site-content", sectionName);
      let dataToSave = formData[sectionName];
      if (sectionName === 'services') {
        dataToSave.items = dataToSave.items.map(item => ({ ...item, details: item.details.map(detail => ({ ...detail, list: Array.isArray(detail.list) ? detail.list.filter(l => l.trim() !== '') : [] })) }));
      }
      await updateDoc(docRef, dataToSave);
      if (sectionName === 'footer') { const generalRef = doc(db, "site-content", "general"); await updateDoc(generalRef, formData.general); }
      await logActivity('update', `Updated ${sectionName.toUpperCase()} Section`, `Changes saved to database.`);
      alert(`${sectionName.toUpperCase()} updated successfully! 🎉`);
    } catch (error) {
      await logActivity('error', `Failed to update ${sectionName}`, error.message);
      alert("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    // DÜZELTME: Fixed inset-0 ve h-screen/w-screen ile TAM EKRAN yapıldı. Padding ve ortalama kaldırıldı.
    <div className="fixed inset-0 z-[9999] bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-sans flex overflow-hidden">
        
        {/* KAPATMA BUTONU (SAĞ ÜST) */}
        <div className="absolute top-4 right-4 z-50">
           <button onClick={onClose} className="p-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-full transition-colors shadow-sm">
             <X size={20}/>
           </button>
        </div>

        {/* SIDEBAR */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onClose={onClose} />

        {/* İÇERİK ALANI */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-100 dark:bg-slate-950">
          
          {/* İçerik Konteyner: Genişliği sınırlamayı kaldırdık (max-w-7xl sildik), w-full yaptık. */}
          <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 min-h-[calc(100vh-80px)]">
            
            {activeTab === 'inbox' && <AdminInbox />}
            {activeTab === 'logs' && <SystemLogs />}
            
            {activeTab === 'hero' && <HeroEditor data={formData.hero} onChange={(k, v) => handleChange('hero', k, v)} onSave={() => handleSave('hero')} saving={saving} />}
            
            {activeTab === 'services' && (
              <ServicesEditor 
                data={formData.services}
                onChange={(k, v) => handleChange('services', k, v)}
                onArrayChange={(i, k, v) => handleArrayChange('services', i, k, v)}
                onAddItem={(tpl) => handleAddItem('services', tpl)}
                onDeleteItem={(i) => handleDeleteItem('services', i)}
                onDetailChange={handleDetailChange}
                onSave={() => handleSave('services')}
                saving={saving}
                setPickingIconFor={setPickingIconFor}
              />
            )}

            {activeTab === 'about' && (
              <AboutEditor 
                data={formData.about} 
                onChange={(k, v) => handleChange('about', k, v)}
                onStatChange={(i, k, v) => handleStatChange(i, k, v)}
                onSave={() => handleSave('about')} 
                saving={saving} 
              />
            )}

            {activeTab === 'founders' && (
              <FoundersEditor 
                data={formData.founders}
                onArrayChange={(i, k, v) => handleArrayChange('founders', i, k, v)}
                onAddItem={(tpl) => handleAddItem('founders', tpl)}
                onDeleteItem={(i) => handleDeleteItem('founders', i)}
                onSave={() => handleSave('founders')}
                saving={saving}
              />
            )}

            {activeTab === 'contact' && (
              <ContactEditor 
                data={formData.contact}
                onChange={(k, v) => handleChange('contact', k, v)}
                onInfoChange={(k, v) => handleContactInfoChange(k, v)}
                onSave={() => handleSave('contact')}
                saving={saving}
              />
            )}

            {activeTab === 'footer' && (
              <FooterEditor 
                data={formData.footer}
                generalData={formData.general}
                onChange={(k, v) => handleChange('footer', k, v)}
                onGeneralChange={(k, v) => handleGeneralChange(k, v)}
                onArrayChange={(arr, i, k, v) => handleFooterArrayChange(arr, i, k, v)}
                onAddItem={(arr, tpl) => handleAddFooterItem(arr, tpl)}
                onDeleteItem={(arr, i) => handleDeleteFooterItem(arr, i)}
                onSave={() => handleSave('footer')}
                saving={saving}
              />
            )}

            {activeTab === 'theme' && (
              <ThemeEditor 
                currentTheme={formData.theme.themes[formData.theme.activeTheme]}
                onApply={handleApplyPreset}
                onSave={() => handleSave('theme')}
                saving={saving}
              />
            )}

          </div>
        </div>

        {/* ICON SEÇİCİ */}
        {pickingIconFor !== null && (<IconPicker onClose={() => setPickingIconFor(null)} onSelect={handleIconSelect} />)}
    </div>
  );
};

export default AdminPanel;