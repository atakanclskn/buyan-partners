import { useState, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { db, storage } from '../firebase'; // storage eklendi
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage fonksiyonları
import { X, Save, Layout, Type, Briefcase, Users, Phone, Plus, Trash2, Upload, ChevronDown, ChevronRight, Edit3, ArrowLeft } from 'lucide-react';

const AdminPanel = ({ onClose }) => {
  const { config } = useSite();
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(config))); 
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false); // Resim yükleme durumu

  // Service Details Editing Mode
  const [editingServiceId, setEditingServiceId] = useState(null); 

  // --- HELPER: IMAGE UPLOAD ---
  const handleImageUpload = async (file, path, section, key, index = null) => {
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `images/${path}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // State'i güncelle
      if (index !== null) {
        // Dizi içindeyse (Founders gibi)
        const newList = [...formData[section].items];
        newList[index] = { ...newList[index], [key]: url };
        setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } }));
      } else {
        // Düz alan ise (Hero bg gibi)
        setFormData(prev => ({
          ...prev,
          [section]: { ...prev[section], [key]: url }
        }));
      }
      alert("Image uploaded successfully! Don't forget to SAVE changes.");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

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
    setFormData(prev => ({
      ...prev, [section]: { ...prev[section], items: [...prev[section].items, newItem] }
    }));
  };

  const handleDeleteItem = (section, index) => {
    if(!window.confirm("Are you sure you want to delete this item?")) return;
    const newList = formData[section].items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], items: newList } }));
  };

  const handleSave = async (sectionName) => {
    setSaving(true);
    try {
      const docRef = doc(db, "site-content", sectionName);
      await updateDoc(docRef, formData[sectionName]);
      alert(`${sectionName.toUpperCase()} updated successfully! 🎉`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving data: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // --- SERVICE DETAILS EDITOR LOGIC ---
  const handleDetailChange = (serviceIndex, detailIndex, key, value) => {
    const newServices = [...formData.services.items];
    
    // Listeyi string olarak alıp array'e çevirme (Textarea için)
    if (key === 'list') {
      value = value.split('\n').filter(item => item.trim() !== '');
    }

    newServices[serviceIndex].details[detailIndex] = {
      ...newServices[serviceIndex].details[detailIndex],
      [key]: value
    };

    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, items: newServices }
    }));
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setEditingServiceId(null); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${activeTab === id ? 'bg-secondary text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  const FileInput = ({ section, itemKey, index = null }) => (
    <div className="mt-2">
      <label className="flex items-center gap-2 cursor-pointer bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors w-fit">
        <Upload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0], section, section, itemKey, index)}
          disabled={uploading}
        />
      </label>
    </div>
  );

  return (
    <div className="flex h-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-sans">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col shadow-xl z-10">
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
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 min-h-[500px]">
          
          {/* --- HERO --- */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Hero Section</h3>
              <div>
                <label className="label">Main Title</label>
                <textarea rows="2" className="input-field" value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <textarea rows="3" className="input-field" value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} />
              </div>
              <div>
                <label className="label">Button Text</label>
                <input type="text" className="input-field" value={formData.hero.buttonText} onChange={(e) => handleChange('hero', 'buttonText', e.target.value)} />
              </div>
              <div>
                <label className="label">Background Image URL</label>
                <div className="flex gap-4 items-center">
                  <input type="text" className="input-field" value={formData.hero.backgroundImage} onChange={(e) => handleChange('hero', 'backgroundImage', e.target.value)} />
                  <img src={formData.hero.backgroundImage} alt="Preview" className="w-16 h-10 object-cover rounded border" />
                </div>
                <FileInput section="hero" itemKey="backgroundImage" />
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('hero')} />
            </div>
          )}

          {/* --- SERVICES (ADVANCED) --- */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* SERVICE LIST VIEW */}
              {editingServiceId === null ? (
                <>
                  <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                    <h3 className="text-2xl font-bold">Services</h3>
                    <button 
                      onClick={() => handleAddItem('services', { title: "New Service", description: "...", icon: "Box", details: [] })}
                      className="btn-add"
                    >
                      <Plus size={16} /> Add New
                    </button>
                  </div>

                  <div>
                    <label className="label">Section Title</label>
                    <input type="text" className="input-field mb-4" value={formData.services.title} onChange={(e) => handleChange('services', 'title', e.target.value)} />
                    <label className="label">Subtitle</label>
                    <textarea rows="2" className="input-field" value={formData.services.subtitle} onChange={(e) => handleChange('services', 'subtitle', e.target.value)} />
                  </div>

                  <div className="space-y-4 mt-6">
                    {formData.services.items.map((service, index) => (
                      <div key={service.id} className="p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">#{index + 1}</span>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingServiceId(index)} className="text-blue-500 hover:bg-blue-50 p-2 rounded flex items-center gap-1 text-xs font-bold">
                              <Edit3 size={14} /> Edit Details
                            </button>
                            <button onClick={() => handleDeleteItem('services', index)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" className="input-field" value={service.title} onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)} placeholder="Service Title" />
                          <input type="text" className="input-field" value={service.icon} onChange={(e) => handleArrayChange('services', index, 'icon', e.target.value)} placeholder="Icon Name (e.g. Globe)" />
                        </div>
                        <textarea rows="2" className="input-field mt-2" value={service.description} onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)} placeholder="Short Description" />
                      </div>
                    ))}
                  </div>
                  <SaveButton saving={saving} onClick={() => handleSave('services')} />
                </>
              ) : (
                // --- SERVICE DETAIL EDIT VIEW ---
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                    <button onClick={() => setEditingServiceId(null)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
                    <div>
                      <h3 className="text-xl font-bold">Editing: {formData.services.items[editingServiceId].title}</h3>
                      <p className="text-xs text-gray-500">Edit the detailed list content for this service.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {formData.services.items[editingServiceId].details.map((detail, dIndex) => (
                      <div key={dIndex} className="p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl">
                        <label className="label">Sub-Section Title</label>
                        <input 
                          type="text" 
                          className="input-field mb-4 font-bold" 
                          value={detail.title} 
                          onChange={(e) => handleDetailChange(editingServiceId, dIndex, 'title', e.target.value)} 
                        />
                        
                        <label className="label">List Items (One per line)</label>
                        <textarea 
                          rows="5" 
                          className="input-field font-mono text-sm" 
                          value={detail.list.join('\n')} 
                          onChange={(e) => handleDetailChange(editingServiceId, dIndex, 'list', e.target.value)} 
                          placeholder="Item 1&#10;Item 2&#10;Item 3"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setEditingServiceId(null)} className="px-4 py-2 text-gray-500 hover:text-gray-900">Cancel</button>
                    <SaveButton saving={saving} onClick={() => { handleSave('services'); setEditingServiceId(null); }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- ABOUT --- */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">About Us</h3>
              <div>
                <label className="label">Badge Text</label>
                <input type="text" className="input-field" value={formData.about.badge} onChange={(e) => handleChange('about', 'badge', e.target.value)} />
              </div>
              <div>
                <label className="label">Main Title</label>
                <input type="text" className="input-field" value={formData.about.title} onChange={(e) => handleChange('about', 'title', e.target.value)} />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea rows="6" className="input-field" value={formData.about.description} onChange={(e) => handleChange('about', 'description', e.target.value)} />
              </div>
              <div>
                <label className="label">About Image</label>
                <div className="flex gap-4 items-center">
                  <input type="text" className="input-field" value={formData.about.image} onChange={(e) => handleChange('about', 'image', e.target.value)} />
                  <img src={formData.about.image} alt="Preview" className="w-16 h-10 object-cover rounded border" />
                </div>
                <FileInput section="about" itemKey="image" />
              </div>
              <SaveButton saving={saving} onClick={() => handleSave('about')} />
            </div>
          )}

          {/* --- FOUNDERS --- */}
          {activeTab === 'founders' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold">Leadership Team</h3>
                <button 
                  onClick={() => handleAddItem('founders', { name: "Name", title: "Role", bio: "Bio...", image: "", linkedin: "#" })}
                  className="btn-add"
                >
                  <Plus size={16} /> Add Person
                </button>
              </div>

              {formData.founders.items.map((founder, index) => (
                <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded">Member #{index + 1}</span>
                    <button onClick={() => handleDeleteItem('founders', index)} className="text-red-500 hover:bg-red-100 p-1.5 rounded"><Trash2 size={16} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">Name</label>
                      <input type="text" className="input-field" value={founder.name} onChange={(e) => handleArrayChange('founders', index, 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className="label">Title</label>
                      <input type="text" className="input-field" value={founder.title} onChange={(e) => handleArrayChange('founders', index, 'title', e.target.value)} />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="label">Photo</label>
                    <div className="flex gap-4 items-center mb-2">
                      <input type="text" className="input-field" value={founder.image} onChange={(e) => handleArrayChange('founders', index, 'image', e.target.value)} />
                      <img src={founder.image} alt="Preview" className="w-10 h-10 object-cover rounded-full border" />
                    </div>
                    <FileInput section="founders" itemKey="image" index={index} />
                  </div>

                  <div>
                    <label className="label">Biography</label>
                    <textarea rows="3" className="input-field" value={founder.bio} onChange={(e) => handleArrayChange('founders', index, 'bio', e.target.value)} />
                  </div>
                </div>
              ))}
              <SaveButton saving={saving} onClick={() => handleSave('founders')} />
            </div>
          )}

          {/* --- CONTACT --- */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Contact Info</h3>
              <div>
                <label className="label">Title</label>
                <input type="text" className="input-field" value={formData.contact.title} onChange={(e) => handleChange('contact', 'title', e.target.value)} />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <textarea rows="2" className="input-field" value={formData.contact.subtitle} onChange={(e) => handleChange('contact', 'subtitle', e.target.value)} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="label">Email Address</label>
                  <input type="text" className="input-field" value={formData.contact.info.email} onChange={(e) => handleContactInfoChange('email', e.target.value)} />
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <input type="text" className="input-field" value={formData.contact.info.phone} onChange={(e) => handleContactInfoChange('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Physical Address</label>
                <input type="text" className="input-field" value={formData.contact.info.address} onChange={(e) => handleContactInfoChange('address', e.target.value)} />
              </div>

              <SaveButton saving={saving} onClick={() => handleSave('contact')} />
            </div>
          )}

        </div>
      </div>

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
  <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-end">
    <button 
      onClick={onClick}
      disabled={saving}
      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Save size={20} />
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </div>
);

export default AdminPanel;