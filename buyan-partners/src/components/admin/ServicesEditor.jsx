import { useState } from 'react';
import { Plus, Trash2, Edit3, ArrowLeft, Save } from 'lucide-react';
import * as Icons from 'lucide-react';

const DynamicIconPreview = ({ name }) => {
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon size={20} />;
};

const ServicesEditor = ({ data, onChange, onArrayChange, onAddItem, onDeleteItem, onDetailChange, onSave, saving, setPickingIconFor }) => {
  const [editingId, setEditingId] = useState(null);

  if (editingId === null) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
          <h3 className="text-2xl font-bold">Services</h3>
          <button onClick={() => onAddItem({ title: "New Service", description: "...", icon: "Box", details: [] })} className="admin-btn-add"><Plus size={16} /> Add New</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div><label className="admin-label">Section Title</label><input type="text" className="admin-input mb-4" value={data.title} onChange={(e) => onChange('title', e.target.value)} /></div>
          <div><label className="admin-label">Subtitle</label><textarea rows="2" className="admin-input" value={data.subtitle} onChange={(e) => onChange('subtitle', e.target.value)} /></div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
          {data.items.map((service, index) => (
            <div key={service.id} className="p-5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">Service #{index + 1}</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(index)} className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors"><Edit3 size={14} /> Edit Details</button>
                  <button onClick={() => onDeleteItem(index)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <div className="space-y-3">
                  <div className="flex gap-3"><div className="flex-1"><label className="admin-label text-[10px]">Title</label><input type="text" className="admin-input font-semibold" value={service.title} onChange={(e) => onArrayChange(index, 'title', e.target.value)} /></div><div className="w-1/3"><label className="admin-label text-[10px]">Icon</label><button onClick={() => setPickingIconFor(index)} className="admin-input flex items-center gap-2 text-left hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer overflow-hidden"><DynamicIconPreview name={service.icon} /><span className="truncate text-xs">{service.icon}</span></button></div></div>
                  <div><label className="admin-label text-[10px]">Description</label><textarea rows="2" className="admin-input text-sm" value={service.description} onChange={(e) => onArrayChange(index, 'description', e.target.value)} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveButton saving={saving} onClick={onSave} />
      </div>
    );
  }

  // DETAY DÜZENLEME MODU
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <button onClick={() => setEditingId(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"><ArrowLeft size={20} /></button>
          <div><h3 className="text-xl font-bold">Editing: {data.items[editingId].title}</h3><p className="text-xs text-gray-500">Manage detailed content.</p></div>
        </div>
        <button onClick={() => {
            // "onArrayChange" ile detay ekleme biraz karmaşık, burada parent'tan gelen özel bir fonksiyon kullanmak daha iyi olurdu ama
            // basitlik için doğrudan manipülasyon yapıyoruz. Gerçek projede bu logic de ayrılabilir.
            // Şimdilik AdminPanel'deki handleDetailChange'i bu yapıya uydurduk.
            const newDetails = data.items[editingId].details || [];
            newDetails.push({ title: "New Sub-Section", list: ["Item 1"] });
            onArrayChange(editingId, 'details', newDetails);
          }} className="admin-btn-add"><Plus size={16} /> Add Sub-Section</button>
      </div>
      <div className="grid grid-cols-1 gap-6 pb-32">
        {data.items[editingId].details && data.items[editingId].details.map((detail, dIndex) => (
          <div key={dIndex} className="p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm relative group">
            <button onClick={() => {
               if(!window.confirm("Delete?")) return;
               const newDetails = data.items[editingId].details.filter((_, i) => i !== dIndex);
               onArrayChange(editingId, 'details', newDetails);
            }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4"><label className="admin-label">Sub-Section Title</label><input type="text" className="admin-input font-bold text-lg" value={detail.title} onChange={(e) => onDetailChange(editingId, dIndex, 'title', e.target.value)} /></div>
                <div className="md:col-span-8"><label className="admin-label flex justify-between"><span>List Items</span><span className="text-[10px] font-normal text-gray-400">One item per line</span></label><textarea rows="5" className="admin-input font-mono text-sm leading-relaxed h-full" value={detail.list ? detail.list.join('\n') : ''} onChange={(e) => onDetailChange(editingId, dIndex, 'list', e.target.value)} placeholder="Items..." /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 -mx-8 -mb-8 p-6 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-b-2xl">
        <button onClick={() => setEditingId(null)} className="px-6 py-2 text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">Back</button>
        <button onClick={onSave} disabled={saving} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"><Save size={18} />{saving ? "Saving..." : "Save Changes"}</button>
      </div>
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

export default ServicesEditor;