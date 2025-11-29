import { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { X, Search } from 'lucide-react';

const IconPicker = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState("");

  // İkon listesini optimize et
  const iconList = useMemo(() => {
    const allKeys = Object.keys(Icons);
    
    return allKeys
      .filter((iconName) => {
        // 1. Sadece Büyük Harfle başlayanları al (React Component'ler büyük başlar)
        // Bu sayede 'createLucideIcon' gibi fonksiyonlar elenir.
        if (iconName[0] !== iconName[0].toUpperCase()) return false;
        
        // 2. Arama filtresi
        return iconName.toLowerCase().includes(search.toLowerCase());
      })
      .slice(0, 300); // 3. LİMİT: Aynı anda en fazla 300 ikon göster (Performans için şart!)
  }, [search]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex flex-col gap-4 bg-white dark:bg-slate-900 rounded-t-2xl z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select an Icon</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search icons (e.g. Globe, User, Arrow...)" 
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-secondary outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* İkon Izgarası */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {iconList.map((iconName) => {
              const IconComponent = Icons[iconName];
              
              // Garanti Kontrol: Eğer bu bir bileşen değilse render etme
              if (typeof IconComponent !== 'function' && typeof IconComponent !== 'object') return null;

              return (
                <button
                  key={iconName}
                  onClick={() => onSelect(iconName)}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-secondary/10 hover:text-secondary border border-transparent hover:border-secondary/30 transition-all group"
                  title={iconName}
                >
                  <IconComponent size={24} strokeWidth={1.5} />
                  <span className="text-[10px] text-gray-500 group-hover:text-secondary truncate w-full text-center">
                    {iconName}
                  </span>
                </button>
              );
            })}
            
            {iconList.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                No icons found for "{search}"
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 rounded-b-2xl text-xs text-center text-gray-500">
          Showing top results for "{search || 'all'}"
        </div>

      </div>
    </div>
  );
};

export default IconPicker;