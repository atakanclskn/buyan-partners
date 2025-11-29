import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { X, Save, Layout, Type, Briefcase, Users, Phone, Plus, Trash2, Edit3, ArrowLeft, Palette, Check, Share2, Link } from 'lucide-react';
import * as Icons from 'lucide-react'; 
import IconPicker from './IconPicker';

// Helper: Dinamik İkon Önizleme
const DynamicIconPreview = ({ name }) => {
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon size={20} />;
};

const COLOR_PRESETS = [
  { name: "Corporate Blue", primary: "#0f172a", secondary: "#3b82f6" },
  { name: "Premium Gold", primary: "#000000", secondary: "#d4af37" },
  { name: "Digital Teal", primary: "#111827", secondary: "#14b8a6" },
  { name: "Growth Green", primary: "#064e3b", secondary: "#10b981" },
  { name: "Power Red", primary: "#18181b", secondary: "#ef4444" },
  { name: "Royal Violet", primary: "#2e1065", secondary: "#8b5cf6" },
  { name: "Slate Orange", primary: "#334155", secondary: "#f97316" },
  { name: "Deep Ocean", primary: "#164e63", secondary: "#06b6d4" },
  { name: "Modern Indigo", primary: "#1e1b4b", secondary: "#6366f1" },
  { name: "Executive Bronze", primary: "#27272a", secondary: "#b45309" },
];

// --- GENİŞLETİLMİŞ SOSYAL MEDYA LİSTESİ ---
const SOCIAL_PLATFORMS = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "X (Twitter)", value: "x" },
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "GitHub", value: "github" },
  { label: "Medium", value: "medium" },
  { label: "Dribbble", value: "dribbble" },
  { label: "Behance", value: "behance" },
  { label: "Telegram", value: "telegram" },
  { label: "Discord", value: "discord" }
];

const AdminPanel = ({ onClose }) => {
  const { config } = useSite();
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(config))); 
  const [saving, setSaving] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null); 
  const [pickingIconFor, setPickingIconFor] = useState(null); 

  // --- GÜNCELLEME FONKSİYONLARI ---
  const handleChange = (section, key, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const handleGeneralChange = (key, value) => {
    setFormData(prev => ({ ...prev, general: { ...prev.general, [key]: value } }));
  };

  const handleArrayChange = (section, index, key, value) => {
    const newList = [...formData[section].items];
    newList[index] = { ...newList[index], [key]: value };
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } }));
  };

  const handleAddItem = (section, template) => {
    const newItem = { id: Date.now(), ...template };
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: [...prev[section].items, newItem] } }));
  };

  const handleDeleteItem = (section, index) => {
    if(!window.confirm("Are you sure?")) return;
    const newList = formData[section].items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } }));
  };

  const handleFooterArrayChange = (arrayName, index, key, value) => {
    const newList = [...formData.footer[arrayName]];
    newList[index] = { ...newList[index], [key]: value };
    setFormData(prev => ({
      ...prev,
      footer: { ...prev.footer, [arrayName]: newList }
    }));
  };

  const handleAddFooterItem = (arrayName, template) => {
    const newItem = { id: Date.now(), ...template };
    setFormData(prev => ({
      ...prev,
      footer: { ...prev.footer, [arrayName]: [...prev.footer[arrayName], newItem] }
    }));
  };

  const handleDeleteFooterItem = (arrayName, index) => {
    if(!window.confirm("Delete this item?")) return;
    const newList = formData.footer[arrayName].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, footer: { ...prev.footer, [arrayName]: newList } }));
  };

  const handleContactInfoChange = (key, value) => {
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, info: { ...prev.contact.info, [key]: value } } }));
  };

  const handleStatChange = (index, key, value) => {
    const newStats = [...formData.about.stats];
    newStats[index] = { ...newStats[index], [key]: value };
    setFormData(prev => ({ ...prev, about: { ...prev.about, stats: newStats } }));
  };

  const handleApplyPreset = (preset) => {
    const currentThemeName = formData.theme.activeTheme;
    setFormData(prev => ({
      ...prev,
      theme: { ...prev.theme, themes: { ...prev.theme.themes, [currentThemeName]: { ...prev.theme.themes[currentThemeName], primary: preset.primary, secondary: preset.secondary } } }
    }));
  };

  const handleDetailChange = (serviceIndex, detailIndex, key, value) => {
    const newServices = [...formData.services.items];
    if (key === 'list') { value = value.split('\n'); }
    newServices[serviceIndex].details[detailIndex] = { ...newServices[serviceIndex].details[detailIndex], [key]: value };
    setFormData(prev => ({ ...prev, services: { ...prev.services, items: newServices } }));
  };

  const handleIconSelect = (iconName) => {
    if (pickingIconFor !== null) {
      handleArrayChange('services', pickingIconFor, 'icon', iconName);
      setPickingIconFor(null);
    }
  };

  const handleSave = async (sectionName) => {
    setSaving(true);
    try {
      const docRef = doc(db, "site-content", sectionName);
      let dataToSave = formData[sectionName];
      if (sectionName === 'services') {
        dataToSave.items = dataToSave.items.map(item => ({
          ...item,
          details: item.details.map(detail => ({ ...detail, list: Array.isArray(detail.list) ? detail.list.filter(l => l.trim() !== '') : [] }))
        }));
      }
      await updateDoc(docRef, dataToSave);
      
      // Footer'da logo metnini de kaydediyoruz (General koleksiyonunda)
      if (sectionName === 'footer') {
        const generalRef = doc(db, "site-content", "general");
        await updateDoc(generalRef, formData.general);
      }

      alert(`${sectionName.toUpperCase()} updated successfully! 🎉`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setEditingServiceId(null); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${activeTab === id ? 'bg-secondary text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  const currentPrimary = formData.theme.themes[formData.theme.activeTheme].primary;

  return (
    <div className="flex h-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-sans">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col shadow-xl z-10 shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
          <h2 className="font-bold text-lg tracking-tight">Admin Panel</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <TabButton id="hero" icon={Layout} label="Hero Section" />
          <TabButton id="services" icon={Briefcase} label="Services" />
          <TabButton id="about" icon={Type} label="About Us" />
          <TabButton id="founders" icon={Users} label="Leadership" />
          <TabButton id="contact" icon={Phone} label="Contact Info" />
          <TabButton id="footer" icon={Share2} label="Footer Settings" />
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
            <TabButton id="theme" icon={Palette} label="Theme Settings" />
          </div>
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-100 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 min-h-[500px] relative">
          
          {/* ... DİĞER SEKMELER (Hero, Services vb.) AYNEN KALIYOR ... */}
          {/* SADECE DEĞİŞEN 'FOOTER' KISMINI VE DİĞERLERİNİ EKLİYORUZ */}
          
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="label">Main Title</label><textarea rows="3" className="input-field" value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} /></div>
                <div><label className="label">Button Text</label><input type="text" className="input-field" value={formData.hero.buttonText} onChange={(e) => handleChange('hero', 'buttonText', e.target.value)} /></div>
              </div>
              <div><label className="label">Subtitle</label><textarea rows="4" className="input-field" value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} /></div>
              <div className="mt-4"><label className="label">Background Image URL</label><div className="flex gap-4 items-center"><input type="text" className="input-field" value={formData.hero.backgroundImage} onChange={(e) => handleChange('hero', 'backgroundImage', e.target.value)} />{formData.hero.backgroundImage && <img src={formData.hero.backgroundImage} alt="Preview" className="w-24 h-16 object-cover rounded-lg border shadow-sm" />}</div></div>
              <SaveButton saving={saving} onClick={() => handleSave('hero')} />
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8">
              {editingServiceId === null ? (
                <>
                  <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold">Services</h3>
                    <button onClick={() => handleAddItem('services', { title: "New Service", description: "...", icon: "Box", details: [] })} className="btn-add"><Plus size={16} /> Add New</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div><label className="label">Section Title</label><input type="text" className="input-field mb-4" value={formData.services.title} onChange={(e) => handleChange('services', 'title', e.target.value)} /></div>
                    <div><label className="label">Subtitle</label><textarea rows="2" className="input-field" value={formData.services.subtitle} onChange={(e) => handleChange('services', 'subtitle', e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
                    {formData.services.items.map((service, index) => (
                      <div key={service.id} className="p-5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">Service #{index + 1}</span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingServiceId(index)} className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors"><Edit3 size={14} /> Edit Details</button>
                            <button onClick={() => handleDeleteItem('services', index)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-3"><div className="flex-1"><label className="label text-[10px]">Title</label><input type="text" className="input-field font-semibold" value={service.title} onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)} /></div><div className="w-1/3"><label className="label text-[10px]">Icon</label><button onClick={() => setPickingIconFor(index)} className="input-field flex items-center gap-2 text-left hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer overflow-hidden"><DynamicIconPreview name={service.icon} /><span className="truncate text-xs">{service.icon}</span></button></div></div>
                            <div><label className="label text-[10px]">Description</label><textarea rows="2" className="input-field text-sm" value={service.description} onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)} /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <SaveButton saving={saving} onClick={() => handleSave('services')} />
                </>
              ) : (
                <div className="flex flex-col h-full relative">
                  <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setEditingServiceId(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"><ArrowLeft size={20} /></button>
                      <div><h3 className="text-xl font-bold">Editing: {formData.services.items[editingServiceId].title}</h3><p className="text-xs text-gray-500">Manage detailed content.</p></div>
                    </div>
                    <button onClick={() => { const newServices = [...formData.services.items]; if (!newServices[editingServiceId].details) newServices[editingServiceId].details = []; newServices[editingServiceId].details.push({ title: "New Sub-Section", list: ["Item 1"] }); setFormData(prev => ({ ...prev, services: { ...prev.services, items: newServices } })); }} className="btn-add"><Plus size={16} /> Add Sub-Section</button>
                  </div>
                  <div className="grid grid-cols-1 gap-6 pb-32">
                    {formData.services.items[editingServiceId].details && formData.services.items[editingServiceId].details.map((detail, dIndex) => (
                      <div key={dIndex} className="p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm relative group">
                        <button onClick={() => { if(!window.confirm("Delete this sub-section?")) return; const newServices = [...formData.services.items]; newServices[editingServiceId].details = newServices[editingServiceId].details.filter((_, i) => i !== dIndex); setFormData(prev => ({ ...prev, services: { ...prev.services, items: newServices } })); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors" title="Delete Sub-Section"><Trash2 size={18} /></button>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-4"><label className="label">Sub-Section Title</label><input type="text" className="input-field font-bold text-lg" value={detail.title} onChange={(e) => handleDetailChange(editingServiceId, dIndex, 'title', e.target.value)} placeholder="Title" /></div>
                            <div className="md:col-span-8"><label className="label flex justify-between"><span>List Items</span><span className="text-[10px] font-normal text-gray-400">One item per line</span></label><textarea rows="5" className="input-field font-mono text-sm leading-relaxed h-full" value={detail.list ? detail.list.join('\n') : ''} onChange={(e) => handleDetailChange(editingServiceId, dIndex, 'list', e.target.value)} placeholder="Items..." /></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sticky bottom-0 -mx-8 -mb-8 p-6 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-b-2xl">
                    <button onClick={() => setEditingServiceId(null)} className="px-6 py-2 text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">Cancel</button>
                    <button onClick={() => handleSave('services')} disabled={saving} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"><Save size={18} />{saving ? "Saving..." : "Save Changes"}</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- ABOUT --- */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">About Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="label">Badge Text</label><input type="text" className="input-field" value={formData.about.badge} onChange={(e) => handleChange('about', 'badge', e.target.value)} /></div>
                  <div><label className="label">Main Title</label><input type="text" className="input-field" value={formData.about.title} onChange={(e) => handleChange('about', 'title', e.target.value)} /></div>
              </div>
              <div><label className="label">Description</label><textarea rows="6" className="input-field" value={formData.about.description} onChange={(e) => handleChange('about', 'description', e.target.value)} /></div>
              <div><label className="label">About Image URL</label><div className="flex gap-4 items-center"><input type="text" className="input-field" value={formData.about.image} onChange={(e) => handleChange('about', 'image', e.target.value)} />{formData.about.image && <img src={formData.about.image} alt="Preview" className="w-16 h-10 object-cover rounded border" />}</div></div>
              
              <div>
                <label className="label mb-2">Statistics</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.about.stats.map((stat, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
                      <div className="mb-2"><label className="label text-[10px]">Value</label><input type="text" className="input-field font-bold" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} /></div>
                      <div><label className="label text-[10px]">Label</label><input type="text" className="input-field" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('about')} />
            </div>
          )}

          {/* --- FOUNDERS --- */}
          {activeTab === 'founders' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold">Leadership Team</h3>
                <button onClick={() => handleAddItem('founders', { name: "Name", title: "Role", bio: "Bio...", image: "", linkedin: "#" })} className="btn-add"><Plus size={16} /> Add Person</button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {formData.founders.items.map((founder, index) => (
                    <div key={index} className="p-6 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 relative">
                        <button onClick={() => handleDeleteItem('founders', index)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        <span className="text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded mb-4 inline-block">Member #{index + 1}</span>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="w-20 h-20 shrink-0"><img src={founder.image || "https://via.placeholder.com/150"} alt="Preview" className="w-full h-full object-cover rounded-lg border bg-gray-200" /></div>
                                <div className="flex-1 space-y-2"><input type="text" className="input-field" value={founder.name} onChange={(e) => handleArrayChange('founders', index, 'name', e.target.value)} placeholder="Name" /><input type="text" className="input-field text-sm" value={founder.title} onChange={(e) => handleArrayChange('founders', index, 'title', e.target.value)} placeholder="Title" /></div>
                            </div>
                            <input type="text" className="input-field text-sm" value={founder.image} onChange={(e) => handleArrayChange('founders', index, 'image', e.target.value)} placeholder="Photo URL" />
                            <input type="text" className="input-field text-sm" value={founder.linkedin} onChange={(e) => handleArrayChange('founders', index, 'linkedin', e.target.value)} placeholder="LinkedIn URL" />
                            <textarea rows="4" className="input-field text-sm" value={founder.bio} onChange={(e) => handleArrayChange('founders', index, 'bio', e.target.value)} placeholder="Biography" />
                        </div>
                    </div>
                ))}
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('founders')} />
            </div>
          )}

          {/* --- CONTACT --- */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Contact Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="label">Title</label><input type="text" className="input-field" value={formData.contact.title} onChange={(e) => handleChange('contact', 'title', e.target.value)} /></div>
                  <div><label className="label">Subtitle</label><textarea rows="2" className="input-field" value={formData.contact.subtitle} onChange={(e) => handleChange('contact', 'subtitle', e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div><label className="label">Email Address</label><input type="text" className="input-field" value={formData.contact.info.email} onChange={(e) => handleContactInfoChange('email', e.target.value)} /></div>
                <div><label className="label">Phone Number</label><input type="text" className="input-field" value={formData.contact.info.phone} onChange={(e) => handleContactInfoChange('phone', e.target.value)} /></div>
                <div><label className="label">Physical Address</label><input type="text" className="input-field" value={formData.contact.info.address} onChange={(e) => handleContactInfoChange('address', e.target.value)} /></div>
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('contact')} />
            </div>
          )}

          {/* --- FOOTER (GÜNCELLENDİ: LOGO TEXT ve SINIRSIZ SOSYAL MEDYA) --- */}
          {activeTab === 'footer' && (
            <div className="space-y-8">
              <div className="border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold">Footer Settings</h3>
              </div>

              {/* Footer Logo Metni */}
              <div>
                <label className="label">Footer Brand Text (Logo)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.general.logoText} 
                  onChange={(e) => handleGeneralChange('logoText', e.target.value)} 
                  placeholder="BUYAN PARTNERS"
                />
                <p className="text-xs text-gray-500 mt-1">This updates both Navbar and Footer branding.</p>
              </div>

              <div>
                <label className="label">Footer Description</label>
                <textarea rows="3" className="input-field" value={formData.footer.description} onChange={(e) => handleChange('footer', 'description', e.target.value)} />
              </div>

              {/* SOCIAL MEDIA LINKS */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-100 dark:border-slate-700">
                  <h4 className="font-bold text-lg">Social Media Links</h4>
                  <button 
                    onClick={() => handleAddFooterItem('socials', { name: "linkedin", url: "#" })}
                    className="bg-secondary text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Plus size={14} /> Add New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.footer.socials.map((social, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                      {/* Platform Seçici (Geniş Liste) */}
                      <select 
                        value={social.name} 
                        onChange={(e) => handleFooterArrayChange('socials', index, 'name', e.target.value)}
                        className="input-field w-36 text-sm bg-white dark:bg-slate-800"
                      >
                        {SOCIAL_PLATFORMS.map(platform => (
                          <option key={platform.value} value={platform.value}>{platform.label}</option>
                        ))}
                      </select>
                      
                      <input 
                        type="text" 
                        className="input-field text-sm" 
                        value={social.url} 
                        onChange={(e) => handleFooterArrayChange('socials', index, 'url', e.target.value)} 
                        placeholder="https://..."
                      />
                      <button onClick={() => handleDeleteFooterItem('socials', index)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* LEGAL LINKS */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-100 dark:border-slate-700">
                  <h4 className="font-bold text-lg">Legal Links</h4>
                  <button 
                    onClick={() => handleAddFooterItem('links', { title: "New Link", url: "#" })}
                    className="bg-secondary text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Plus size={14} /> Add New
                  </button>
                </div>
                
                {formData.footer.links.map((link, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <input type="text" className="input-field w-1/3" value={link.title} onChange={(e) => handleFooterArrayChange('links', index, 'title', e.target.value)} placeholder="Link Title" />
                    <input type="text" className="input-field flex-1" value={link.url} onChange={(e) => handleFooterArrayChange('links', index, 'url', e.target.value)} placeholder="URL (# or https://...)" />
                    <button onClick={() => handleDeleteFooterItem('links', index)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>

              <SaveButton saving={saving} onClick={() => handleSave('footer')} />
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-8">
              <div className="border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold">Theme Settings</h3>
                <p className="text-sm text-gray-500 mt-1">Select a professional color preset for your brand identity.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {COLOR_PRESETS.map((preset) => {
                  const isSelected = preset.primary === formData.theme.themes[formData.theme.activeTheme].primary;
                  return (
                    <button key={preset.name} onClick={() => handleApplyPreset(preset)} className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 group ${isSelected ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500'}`}>
                      <div className="flex -space-x-3"><div className="w-10 h-10 rounded-full shadow-lg border-2 border-white dark:border-slate-900 z-10" style={{ backgroundColor: preset.primary }}></div><div className="w-10 h-10 rounded-full shadow-lg border-2 border-white dark:border-slate-900 z-0" style={{ backgroundColor: preset.secondary }}></div></div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-secondary' : 'text-gray-500'}`}>{preset.name}</span>
                      {isSelected && (<div className="absolute top-2 right-2 text-secondary bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm"><Check size={14} strokeWidth={3} /></div>)}
                    </button>
                  );
                })}
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('theme')} />
            </div>
          )}

        </div>
      </div>

      {pickingIconFor !== null && (<IconPicker onClose={() => setPickingIconFor(null)} onSelect={handleIconSelect} />)}

      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border-radius: 0.5rem; background-color: transparent; border-width: 1px; border-color: #e5e7eb; outline: none; transition: all 0.2s; }
        .dark .input-field { border-color: #475569; background-color: #1e293b; color: white; }
        .input-field:focus { border-color: #3b82f6; ring: 2px solid #3b82f6; }
        .label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 0.25rem; }
        .btn-add { background-color: #3b82f6; color: white; padding: 0.375rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 700; display: flex; align-items: center; gap: 0.25rem; transition: background-color 0.2s; }
        .btn-add:hover { background-color: #2563eb; }
      `}</style>
    </div>
  );
};

const SaveButton = ({ saving, onClick }) => (
  <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-end sticky bottom-0 bg-white dark:bg-slate-800 z-10 p-4 -mx-8 -mb-8 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
    <button onClick={onClick} disabled={saving} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
      <Save size={20} />
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </div>
);

export default AdminPanel;