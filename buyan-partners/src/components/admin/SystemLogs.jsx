import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, limit, where } from 'firebase/firestore';
import { Activity, Shield, Edit, Trash2, LogIn, AlertCircle, Clock, User, Filter, Calendar, RefreshCcw, Search } from 'lucide-react';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [systemError, setSystemError] = useState(null); // İndeks hatasını göstermek için
  
  // Filtreler
  const [limitCount, setLimitCount] = useState(50);
  const [filterType, setFilterType] = useState('all'); 
  const [searchUser, setSearchUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // --- ANA ETKİ (EFFECT) ---
  useEffect(() => {
    // 1. HER ŞEYİ TEMİZLE (Eski veriler ekranda kalmasın)
    setLogs([]); 
    setSystemError(null);
    setLoading(true);

    let unsubscribe = () => {};

    try {
      const logsRef = collection(db, "system_logs");
      let constraints = [];

      // 1. Tip Filtresi
      if (filterType !== 'all') {
        constraints.push(where("type", "==", filterType));
      }

      // 2. Tarih Aralığı
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        constraints.push(where("createdAt", ">=", start));
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        constraints.push(where("createdAt", "<=", end));
      }

      // 3. Sıralama
      constraints.push(orderBy("createdAt", "desc"));

      // 4. Limit
      constraints.push(limit(Number(limitCount)));

      const q = query(logsRef, ...constraints);

      // Dinleme Başlat
      unsubscribe = onSnapshot(q, (snapshot) => {
        let fetchedLogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Client-Side Arama (User için)
        if (searchUser.trim() !== '') {
          const term = searchUser.toLowerCase();
          fetchedLogs = fetchedLogs.filter(log => 
            (log.user && log.user.toLowerCase().includes(term)) ||
            (log.action && log.action.toLowerCase().includes(term))
          );
        }

        setLogs(fetchedLogs);
        setLoading(false);
      }, (error) => {
        // HATA YAKALAMA
        console.error("Firebase Hatası:", error);
        if (error.message.includes("requires an index")) {
          setSystemError("⚠️ BU SORGUNUN ÇALIŞMASI İÇİN 'INDEX' GEREKLİ. Lütfen F12 Konsol'daki linke tıklayıp oluşturun.");
        } else {
          setSystemError(error.message);
        }
        setLogs([]); // Hata varsa listeyi boşalt
        setLoading(false);
      });

    } catch (error) {
      console.error("Kod Hatası:", error);
      setSystemError(error.message);
      setLogs([]);
      setLoading(false);
    }

    return () => unsubscribe();

  }, [limitCount, filterType, startDate, endDate, searchUser]); 

  // Format Helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    // Timestamp kontrolü
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
    return date.toLocaleString('tr-TR', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  const getIconAndColor = (type) => {
    switch (type) {
      case 'login': return { icon: <LogIn size={16}/>, color: 'text-green-600 bg-green-100 dark:bg-green-900/30' };
      case 'update': return { icon: <Edit size={16}/>, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' };
      case 'delete': return { icon: <Trash2 size={16}/>, color: 'text-red-600 bg-red-100 dark:bg-red-900/30' };
      case 'error': return { icon: <AlertCircle size={16}/>, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' };
      default: return { icon: <Activity size={16}/>, color: 'text-gray-600 bg-gray-100 dark:bg-slate-700' };
    }
  };

  const resetFilters = () => {
    setFilterType('all');
    setSearchUser('');
    setStartDate('');
    setEndDate('');
    setLimitCount(50);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      
      {/* HEADER */}
      <div className="border-b border-gray-200 dark:border-slate-700 bg-gray-50/80 dark:bg-slate-800/80 p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Shield className="text-blue-500" /> System Audit Logs
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Traceability and security monitoring.</p>
          </div>
          <button onClick={resetFilters} className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors">
            <RefreshCcw size={12} /> Reset
          </button>
        </div>

        {/* FİLTRELER */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">Type</label>
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm appearance-none outline-none focus:border-blue-500 transition-colors text-gray-700 dark:text-gray-200">
                <option value="all">All</option>
                <option value="login">Logins</option>
                <option value="update">Updates</option>
                <option value="delete">Deletions</option>
                <option value="error">Errors</option>
              </select>
            </div>
          </div>
          {/* Diğer inputlar... */}
          <div className="flex-1 min-w-[200px] flex gap-2">
            <div className="w-1/2">
                <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">Start</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-2 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-700 dark:text-gray-200"/>
            </div>
            <div className="w-1/2">
                <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">End</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-700 dark:text-gray-200"/>
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block">User</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-700 dark:text-gray-200"/>
            </div>
          </div>
        </div>
      </div>

      {/* --- İÇERİK --- */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <RefreshCcw className="animate-spin mb-2" />
            <span className="text-sm">Fetching logs...</span>
          </div>
        ) : systemError ? (
          // HATA MESAJI (INDEX UYARISI)
          <div className="flex flex-col items-center justify-center h-full text-red-500 gap-4 p-8 text-center">
            <AlertCircle size={48} className="opacity-50" />
            <div>
              <p className="font-bold text-lg mb-2">Configuration Required</p>
              <p className="text-sm bg-red-100 dark:bg-red-900/30 p-3 rounded border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
                {systemError}
              </p>
            </div>
          </div>
        ) : logs.length === 0 ? (
          // BOŞ LİSTE
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
            <Shield size={40} className="opacity-20" />
            <p>No records found matching filters.</p>
          </div>
        ) : (
          // TABLO
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Action & Details</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {logs.map((log) => {
                const style = getIconAndColor(log.type);
                return (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.color}`}>
                        {style.icon} {log.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800 dark:text-gray-200">{log.action}</div>
                      {log.details && <div className="text-xs text-gray-500 font-mono mt-1">{log.details}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User size={14} className="text-gray-400" /> {log.user || "System"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap font-mono">
                      {formatDate(log.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex justify-end items-center gap-3 text-sm">
        <span className="text-gray-500 dark:text-gray-400">Showing last:</span>
        <select value={limitCount} onChange={(e) => setLimitCount(Number(e.target.value))} className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded px-2 py-1 text-gray-700 dark:text-gray-200 outline-none focus:border-blue-500 cursor-pointer">
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
        </select>
        <span className="text-gray-500 dark:text-gray-400">activities</span>
      </div>
    </div>
  );
};

export default SystemLogs;