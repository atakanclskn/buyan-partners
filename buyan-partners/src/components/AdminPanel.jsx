import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { X, Save, Layout, Type, Briefcase, Users, Phone, Plus, Trash2, Edit3, ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react'; 
import IconPicker from './IconPicker';

// Helper: Dinamik İkon Önizleme
const DynamicIconPreview = ({ name }) => {
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon size={20} />;
};

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
    if(!window.confirm("Are you sure you want to delete this item?")) return;
    const newList = formData[section].items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } }));
  };

  const handleContactInfoChange = (key, value) => {
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, info: { ...prev.contact.info, [key]: value } } }));
  };

  const handleDetailChange = (serviceIndex, detailIndex, key, value) => {
    const newServices = [...formData.services.items];
    if (key === 'list') {
      value = value.split('\n'); 
    }
    newServices[serviceIndex].details[detailIndex] = {
      ...newServices[serviceIndex].details[detailIndex],
      [key]: value
    };
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
          details: item.details.map(detail => ({
            ...detail,
            list: Array.isArray(detail.list) ? detail.list.filter(l => l.trim() !== '') : []
          }))
        }));
      }

      await updateDoc(docRef, dataToSave);
      alert(`${sectionName.toUpperCase()} updated successfully! 🎉`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving data: " + error.message);
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
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-100 dark:bg-slate-950">
        {/* GENİŞLİK ARTIRILDI: max-w-7xl */}
        <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 min-h-[500px] relative">
          
          {/* --- HERO --- */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div><label className="label">Main Title</label><textarea rows="3" className="input-field" value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} /></div>
                    <div><label className="label">Button Text</label><input type="text" className="input-field" value={formData.hero.buttonText} onChange={(e) => handleChange('hero', 'buttonText', e.target.value)} /></div>
                </div>
                <div className="space-y-4">
                    <div><label className="label">Subtitle</label><textarea rows="4" className="input-field" value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} /></div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="label">Background Image URL</label>
                <div className="flex gap-4 items-center">
                  <input type="text" className="input-field" value={formData.hero.backgroundImage} onChange={(e) => handleChange('hero', 'backgroundImage', e.target.value)} placeholder="https://..." />
                  {formData.hero.backgroundImage && <img src={formData.hero.backgroundImage} alt="Preview" className="w-24 h-16 object-cover rounded-lg border shadow-sm" />}
                </div>
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('hero')} />
            </div>
          )}

          {/* --- SERVICES --- */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* LİSTE GÖRÜNÜMÜ */}
              {editingServiceId === null ? (
                <>
                  <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold">Services</h3>
                    <button onClick={() => handleAddItem('services', { title: "New Service", description: "...", icon: "Box", details: [] })} className="btn-add"><Plus size={16} /> Add New</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div><label className="label">Section Title</label><input type="text" className="input-field" value={formData.services.title} onChange={(e) => handleChange('services', 'title', e.target.value)} /></div>
                    <div><label className="label">Subtitle</label><textarea rows="2" className="input-field" value={formData.services.subtitle} onChange={(e) => handleChange('services', 'subtitle', e.target.value)} /></div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
                    {formData.services.items.map((service, index) => (
                      <div key={service.id} className="p-5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">Service #{index + 1}</span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingServiceId(index)} className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors"><Edit3 size={14} /> Edit Content</button>
                            <button onClick={() => handleDeleteItem('services', index)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="label text-[10px]">Title</label>
                                    <input type="text" className="input-field font-semibold" value={service.title} onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)} />
                                </div>
                                <div className="w-1/3">
                                    <label className="label text-[10px]">Icon</label>
                                    <button onClick={() => setPickingIconFor(index)} className="input-field flex items-center gap-2 text-left hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer overflow-hidden">
                                        <DynamicIconPreview name={service.icon} /><span className="truncate text-xs">{service.icon}</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="label text-[10px]">Description</label>
                                <textarea rows="2" className="input-field text-sm" value={service.description} onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)} />
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <SaveButton saving={saving} onClick={() => handleSave('services')} />
                </>
              ) : (
                // --- DETAY DÜZENLEME (YAN YANA DÜZEN) ---
                <div className="flex flex-col h-full relative">
                  <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setEditingServiceId(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"><ArrowLeft size={20} /></button>
                      <div>
                        <h3 className="text-xl font-bold">Editing: {formData.services.items[editingServiceId].title}</h3>
                        <p className="text-xs text-gray-500">Manage detailed content.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newServices = [...formData.services.items];
                        if (!newServices[editingServiceId].details) newServices[editingServiceId].details = [];
                        newServices[editingServiceId].details.push({ title: "New Sub-Section", list: ["Item 1"] });
                        setFormData(prev => ({ ...prev, services: { ...prev.services, items: newServices } }));
                      }}
                      className="btn-add"
                    ><Plus size={16} /> Add Sub-Section</button>
                  </div>

                  {/* Detay Kartları Listesi (Grid Yapısı - pb artırıldı) */}
                  <div className="space-y-6 pb-32">
                    {formData.services.items[editingServiceId].details && formData.services.items[editingServiceId].details.map((detail, dIndex) => (
                      <div key={dIndex} className="p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm relative group">
                        
                        <button 
                          onClick={() => {
                            if(!window.confirm("Delete this sub-section?")) return;
                            const newServices = [...formData.services.items];
                            newServices[editingServiceId].details = newServices[editingServiceId].details.filter((_, i) => i !== dIndex);
                            setFormData(prev => ({ ...prev, services: { ...prev.services, items: newServices } }));
                          }}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                          title="Delete Sub-Section"
                        ><Trash2 size={18} /></button>

                        {/* YAN YANA IZGARA: Sol (Başlık), Sağ (Liste) */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* SOL: BAŞLIK (3 birim) */}
                            <div className="md:col-span-4">
                                <label className="label">Sub-Section Title</label>
                                <input 
                                  type="text" 
                                  className="input-field font-bold text-lg" 
                                  value={detail.title} 
                                  onChange={(e) => handleDetailChange(editingServiceId, dIndex, 'title', e.target.value)} 
                                  placeholder="e.g. 1.1 Company Establishment"
                                />
                                <p className="text-xs text-gray-400 mt-2">This will appear as a bold heading in the popup.</p>
                            </div>
                            
                            {/* SAĞ: LİSTE (8 birim) */}
                            <div className="md:col-span-8">
                                <label className="label flex justify-between">
                                  <span>List Items</span>
                                  <span className="text-[10px] font-normal text-gray-400">One item per line</span>
                                </label>
                                <textarea 
                                  rows="5" 
                                  className="input-field font-mono text-sm leading-relaxed h-full" 
                                  value={detail.list ? detail.list.join('\n') : ''} 
                                  onChange={(e) => handleDetailChange(editingServiceId, dIndex, 'list', e.target.value)} 
                                  placeholder="• Item 1&#10;• Item 2"
                                />
                            </div>
                        </div>
                      </div>
                    ))}
                    {(!formData.services.items[editingServiceId].details || formData.services.items[editingServiceId].details.length === 0) && (
                      <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl text-gray-400">No details yet. Click "Add Sub-Section" to start.</div>
                    )}
                  </div>

                  {/* STICKY FOOTER (GÜNCELLENDİ: Arka plan solid yapıldı) */}
                  <div className="sticky bottom-0 -mx-8 -mb-8 p-6 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-b-2xl">
                    <span className="text-sm text-gray-500 italic">Don't forget to save your changes.</span>
                    <div className="flex gap-3">
                        <button onClick={() => setEditingServiceId(null)} className="px-6 py-2 text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">Cancel</button>
                        <button 
                        onClick={() => handleSave('services')}
                        disabled={saving}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
                        >
                        <Save size={18} />
                        {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
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
              <div><label className="label">About Image URL</label><div className="flex gap-4 items-center"><input type="text" className="input-field" value={formData.about.image} onChange={(e) => handleChange('about', 'image', e.target.value)} />{formData.about.image && <img src={formData.about.image} alt="Preview" className="w-24 h-16 object-cover rounded border" />}</div></div>
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
                                <div className="w-20 h-20 shrink-0">
                                    <img src={founder.image || "https://via.placeholder.com/150"} alt="Preview" className="w-full h-full object-cover rounded-lg border bg-gray-200" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <input type="text" className="input-field" value={founder.name} onChange={(e) => handleArrayChange('founders', index, 'name', e.target.value)} placeholder="Name" />
                                    <input type="text" className="input-field text-sm" value={founder.title} onChange={(e) => handleArrayChange('founders', index, 'title', e.target.value)} placeholder="Title" />
                                </div>
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

        </div>
      </div>

      {/* İKON SEÇİCİ POPUP */}
      {pickingIconFor !== null && (
        <IconPicker onClose={() => setPickingIconFor(null)} onSelect={handleIconSelect} />
      )}

      {/* STYLES */}
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background-color: transparent;
          border-width: 1px;
          border-color: #e5e7eb;
          outline: none;
          transition: all 0.2s;
        }
        .dark .input-field {
          border-color: #475569;
          background-color: #1e293b;
          color: white;
        }
        .input-field:focus {
          border-color: #3b82f6;
          ring: 2px solid #3b82f6;
        }
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        .btn-add {
          background-color: #3b82f6;
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: background-color 0.2s;
        }
        .btn-add:hover {
          background-color: #2563eb;
        }
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