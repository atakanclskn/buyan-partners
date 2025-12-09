import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Check, RefreshCw } from 'lucide-react';

const SaveButton = ({ saving, onClick }) => (
  <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-end sticky bottom-0 bg-white dark:bg-slate-800 z-10 p-4 -mx-8 -mb-8 rounded-b-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
    <button onClick={onClick} disabled={saving} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
      <Save size={20} />
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </div>
);

// --- HERO EDITOR ---
export const HeroEditor = ({ data, onChange, onSave, saving }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Hero Section</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div><label className="admin-label">Main Title</label><textarea rows="3" className="admin-input" value={data.title} onChange={(e) => onChange('title', e.target.value)} /></div>
      <div><label className="admin-label">Button Text</label><input type="text" className="admin-input" value={data.buttonText} onChange={(e) => onChange('buttonText', e.target.value)} /></div>
    </div>
    <div><label className="admin-label">Subtitle</label><textarea rows="4" className="admin-input" value={data.subtitle} onChange={(e) => onChange('subtitle', e.target.value)} /></div>
    <div className="mt-4"><label className="admin-label">Background Image URL</label><div className="flex gap-4 items-center"><input type="text" className="admin-input" value={data.backgroundImage} onChange={(e) => onChange('backgroundImage', e.target.value)} />{data.backgroundImage && <img src={data.backgroundImage} alt="Preview" className="w-24 h-16 object-cover rounded-lg border shadow-sm" />}</div></div>
    <SaveButton saving={saving} onClick={onSave} />
  </div>
);

// --- ABOUT EDITOR ---
export const AboutEditor = ({ data, onChange, onStatChange, onSave, saving }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">About Us</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="admin-label">Badge Text</label><input type="text" className="admin-input" value={data.badge} onChange={(e) => onChange('badge', e.target.value)} /></div>
        <div><label className="admin-label">Main Title</label><input type="text" className="admin-input" value={data.title} onChange={(e) => onChange('title', e.target.value)} /></div>
    </div>
    <div><label className="admin-label">Description</label><textarea rows="6" className="admin-input" value={data.description} onChange={(e) => onChange('description', e.target.value)} /></div>
    <div><label className="admin-label">About Image URL</label><div className="flex gap-4 items-center"><input type="text" className="admin-input" value={data.image} onChange={(e) => onChange('image', e.target.value)} />{data.image && <img src={data.image} alt="Preview" className="w-16 h-10 object-cover rounded border" />}</div></div>
    <div><label className="admin-label mb-2">Statistics</label><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{data.stats.map((stat, index) => (<div key={index} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600"><div className="mb-2"><label className="admin-label text-[10px]">Value</label><input type="text" className="admin-input font-bold" value={stat.value} onChange={(e) => onStatChange(index, 'value', e.target.value)} /></div><div><label className="admin-label text-[10px]">Label</label><input type="text" className="admin-input" value={stat.label} onChange={(e) => onStatChange(index, 'label', e.target.value)} /></div></div>))}</div></div>
    <SaveButton saving={saving} onClick={onSave} />
  </div>
);

// --- FOUNDERS EDITOR ---
export const FoundersEditor = ({ data, onArrayChange, onAddItem, onDeleteItem, onSave, saving }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
      <h3 className="text-2xl font-bold">Leadership Team</h3>
      <button onClick={() => onAddItem({ name: "Name", title: "Role", bio: "Bio...", image: "", linkedin: "#" })} className="admin-btn-add"><Plus size={16} /> Add Person</button>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {data.items.map((founder, index) => (
          <div key={index} className="p-6 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 relative">
              <button onClick={() => onDeleteItem(index)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
              <span className="text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded mb-4 inline-block">Member #{index + 1}</span>
              <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 shrink-0"><img src={founder.image || "https://via.placeholder.com/150"} alt="Preview" className="w-full h-full object-cover rounded-lg border bg-gray-200" /></div>
                      <div className="flex-1 space-y-2"><input type="text" className="admin-input" value={founder.name} onChange={(e) => onArrayChange(index, 'name', e.target.value)} placeholder="Name" /><input type="text" className="admin-input text-sm" value={founder.title} onChange={(e) => onArrayChange(index, 'title', e.target.value)} placeholder="Title" /></div>
                  </div>
                  <input type="text" className="admin-input text-sm" value={founder.image} onChange={(e) => onArrayChange(index, 'image', e.target.value)} placeholder="Photo URL" />
                  <input type="text" className="admin-input text-sm" value={founder.linkedin} onChange={(e) => onArrayChange(index, 'linkedin', e.target.value)} placeholder="LinkedIn URL" />
                  <textarea rows="4" className="admin-input text-sm" value={founder.bio} onChange={(e) => onArrayChange(index, 'bio', e.target.value)} placeholder="Biography" />
              </div>
          </div>
      ))}
    </div>
    <SaveButton saving={saving} onClick={onSave} />
  </div>
);

// --- CONTACT EDITOR (GÜNCELLENDİ: Varsayılan Yükleme + Düzenleme) ---
export const ContactEditor = ({ data, onChange, onInfoChange, onSave, saving }) => {
  const [newSubject, setNewSubject] = useState("");

  // Standart Konular
  const DEFAULT_SUBJECTS = [
    "Project Consulting",
    "Request for Quotation",
    "General Inquiry",
    "Partnership Proposal"
  ];

  // Açılışta: Eğer liste boşsa veya tanımsızsa, varsayılanları yükle
  useEffect(() => {
    if (!data.subjects || data.subjects.length === 0) {
      // Otomatik olarak varsayılanları set et (Kullanıcı kaydetmezse veritabanına yazılmaz)
      // Ancak kullanıcının görmesi için state'i güncelliyoruz.
      // Not: Bu işlem 'form is dirty' durumunu tetikleyebilir, bu normaldir.
      // Eğer veritabanında gerçekten boşsa, burayı tetiklemek istemiyorsak kontrolü sıkılaştırabiliriz
      // Ama "Varsayılanlar olsun" dendiği için bu en pratik yoldur.
      if (!data.subjects) {
         onChange('subjects', DEFAULT_SUBJECTS);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    const currentSubjects = data.subjects || [];
    onChange('subjects', [...currentSubjects, newSubject.trim()]);
    setNewSubject(""); 
  };

  const handleDeleteSubject = (index) => {
    const currentSubjects = data.subjects || [];
    onChange('subjects', currentSubjects.filter((_, i) => i !== index));
  };

  // Mevcut bir konuyu düzenleme
  const handleEditSubject = (index, value) => {
    const currentSubjects = [...(data.subjects || [])];
    currentSubjects[index] = value;
    onChange('subjects', currentSubjects);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">Contact Info</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="admin-label">Title</label><input type="text" className="admin-input" value={data.title} onChange={(e) => onChange('title', e.target.value)} /></div>
          <div><label className="admin-label">Subtitle</label><textarea rows="2" className="admin-input" value={data.subtitle} onChange={(e) => onChange('subtitle', e.target.value)} /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div><label className="admin-label">Email Address</label><input type="text" className="admin-input" value={data.info.email} onChange={(e) => onInfoChange('email', e.target.value)} /></div>
        <div><label className="admin-label">Phone Number</label><input type="text" className="admin-input" value={data.info.phone} onChange={(e) => onInfoChange('phone', e.target.value)} /></div>
        <div><label className="admin-label">Physical Address</label><input type="text" className="admin-input" value={data.info.address} onChange={(e) => onInfoChange('address', e.target.value)} /></div>
      </div>

      {/* AVAILABILITY STATUS */}
      <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-gray-200 dark:border-slate-700 mt-4">
        <h4 className="font-bold text-sm mb-4 text-gray-700 dark:text-gray-300">Availability Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="admin-label">Status</label>
            <select className="admin-input" value={data.status || 'available'} onChange={(e) => onChange('status', e.target.value)}>
              <option value="available">🟢 Available</option>
              <option value="busy">🔴 Busy</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Status Text</label>
            <input type="text" className="admin-input" value={data.statusText || ""} onChange={(e) => onChange('statusText', e.target.value)} placeholder="Ex: We are currently available..." />
          </div>
        </div>
      </div>

      {/* FORM SUBJECTS */}
      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-lg">Form Subjects</h4>
          {(!data.subjects || data.subjects.length === 0) && (
             <button onClick={() => onChange('subjects', DEFAULT_SUBJECTS)} className="text-xs flex items-center gap-1 text-blue-500 hover:underline">
               <RefreshCw size={12}/> Load Defaults
             </button>
          )}
        </div>
        
        <div className="flex gap-2 mb-4">
          <input type="text" className="admin-input" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="New subject..." onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()} />
          <button onClick={handleAddSubject} className="admin-btn-add whitespace-nowrap"><Plus size={16} /> Add</button>
        </div>

        <div className="space-y-2">
          {data.subjects && data.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2 items-center">
              {/* Düzenlenebilir Input */}
              <input 
                type="text" 
                className="admin-input flex-1 bg-gray-50 dark:bg-slate-700/50" 
                value={subject} 
                onChange={(e) => handleEditSubject(index, e.target.value)} 
              />
              <button onClick={() => handleDeleteSubject(index)} className="text-red-500 hover:bg-red-100 p-2 rounded transition-colors"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>

      <SaveButton saving={saving} onClick={onSave} />
    </div>
  );
};

// --- THEME EDITOR ---
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

export const ThemeEditor = ({ currentTheme, onApply, onSave, saving }) => (
  <div className="space-y-8">
    <div className="border-b pb-4 mb-6 border-gray-100 dark:border-slate-700"><h3 className="text-2xl font-bold">Theme Settings</h3><p className="text-sm text-gray-500 mt-1">Select a professional color preset.</p></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {COLOR_PRESETS.map((preset) => { const isSelected = preset.primary === currentTheme.primary; return (<button key={preset.name} onClick={() => onApply(preset)} className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 group ${isSelected ? 'border-secondary bg-secondary/5 ring-2 ring-secondary/20' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-500'}`}><div className="flex -space-x-3"><div className="w-10 h-10 rounded-full shadow-lg border-2 border-white dark:border-slate-900 z-10" style={{ backgroundColor: preset.primary }}></div><div className="w-10 h-10 rounded-full shadow-lg border-2 border-white dark:border-slate-900 z-0" style={{ backgroundColor: preset.secondary }}></div></div><span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-secondary' : 'text-gray-500'}`}>{preset.name}</span>{isSelected && (<div className="absolute top-2 right-2 text-secondary bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-sm"><Check size={14} strokeWidth={3} /></div>)}</button>); })}
    </div>
    <SaveButton saving={saving} onClick={onSave} />
  </div>
);

// --- FOOTER EDITOR ---
const SOCIAL_PLATFORMS = [
  { label: "LinkedIn", value: "linkedin" }, { label: "X (Twitter)", value: "x" }, { label: "Instagram", value: "instagram" }, { label: "Facebook", value: "facebook" }, { label: "YouTube", value: "youtube" }, { label: "TikTok", value: "tiktok" }, { label: "WhatsApp", value: "whatsapp" }, { label: "GitHub", value: "github" }, { label: "Medium", value: "medium" }, { label: "Dribbble", value: "dribbble" }, { label: "Behance", value: "behance" }, { label: "Telegram", value: "telegram" }, { label: "Discord", value: "discord" }
];

export const FooterEditor = ({ data, generalData, onChange, onGeneralChange, onArrayChange, onAddItem, onDeleteItem, onSave, saving }) => (
  <div className="space-y-8">
    <div className="border-b pb-4 mb-6 border-gray-100 dark:border-slate-700"><h3 className="text-2xl font-bold">Footer Settings</h3></div>
    
    <div><label className="admin-label">Footer Brand Text (Logo)</label><input type="text" className="admin-input" value={generalData.logoText} onChange={(e) => onGeneralChange('logoText', e.target.value)} placeholder="BUYAN PARTNERS" /></div>
    
    <div><label className="admin-label">Footer Description</label><textarea rows="3" className="admin-input" value={data.description} onChange={(e) => onChange('description', e.target.value)} /></div>
    
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-100 dark:border-slate-700"><h4 className="font-bold text-lg">Social Media Links</h4><button onClick={() => onAddItem('socials', { name: "linkedin", url: "#" })} className="admin-btn-add"><Plus size={14} /> Add New</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{data.socials.map((social, index) => (<div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"><select value={social.name} onChange={(e) => onArrayChange('socials', index, 'name', e.target.value)} className="admin-input w-36 text-sm bg-white dark:bg-slate-800">{SOCIAL_PLATFORMS.map(platform => (<option key={platform.value} value={platform.value}>{platform.label}</option>))}</select><input type="text" className="admin-input text-sm" value={social.url} onChange={(e) => onArrayChange('socials', index, 'url', e.target.value)} placeholder="https://..." /><button onClick={() => onDeleteItem('socials', index)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Trash2 size={16} /></button></div>))}</div>
    </div>

    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center border-b pb-2 mb-2 border-gray-100 dark:border-slate-700"><h4 className="font-bold text-lg">Legal Links</h4><button onClick={() => onAddItem('links', { title: "New Link", url: "#" })} className="admin-btn-add"><Plus size={14} /> Add New</button></div>
      {data.links.map((link, index) => (
        <div key={index} className="flex gap-4 items-center mb-2">
          <input 
            type="text" 
            className="admin-input w-1/3" 
            value={link.title} 
            onChange={(e) => onArrayChange('links', index, 'title', e.target.value)} 
            placeholder="Label (Ex: Privacy Policy)" 
          />
          <input 
            type="text" 
            className="admin-input flex-1" 
            value={link.url} 
            onChange={(e) => onArrayChange('links', index, 'url', e.target.value)} 
            placeholder="URL (Ex: /privacy)" 
          />
          <button onClick={() => onDeleteItem('links', index)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Trash2 size={16} /></button>
        </div>
      ))}
    </div>
        <div><label className="admin-label">Footer Copyright Text</label><input type="text" className="admin-input" value={generalData.footerText} onChange={(e) => onGeneralChange('footerText', e.target.value)} placeholder="© 2025 Buyan Partners. All rights reserved." /></div>

    <SaveButton saving={saving} onClick={onSave} />
  </div>
);