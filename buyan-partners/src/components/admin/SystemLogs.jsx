import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { Activity, Shield, Edit, Trash2, LogIn, AlertCircle, Clock, User } from 'lucide-react';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Son 50 logu çek (Gerçek zamanlı)
    const q = query(
      collection(db, "system_logs"), 
      orderBy("createdAt", "desc"), 
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    return new Date(timestamp.seconds * 1000).toLocaleString('tr-TR', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  const getIconAndColor = (type) => {
    switch (type) {
      case 'login': return { icon: <LogIn size={16}/>, color: 'text-green-500 bg-green-100 dark:bg-green-900/20' };
      case 'update': return { icon: <Edit size={16}/>, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20' };
      case 'delete': return { icon: <Trash2 size={16}/>, color: 'text-red-500 bg-red-100 dark:bg-red-900/20' };
      case 'error': return { icon: <AlertCircle size={16}/>, color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20' };
      default: return { icon: <Activity size={16}/>, color: 'text-gray-500 bg-gray-100 dark:bg-gray-800' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Shield className="text-secondary" /> System Audit Logs
          </h3>
          <p className="text-xs text-gray-500 mt-1">Tracking last 50 system activities & security events.</p>
        </div>
        <div className="text-xs font-mono bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
          Total: {logs.length}
        </div>
      </div>

      {/* Log Listesi */}
      <div className="flex-1 overflow-y-auto p-0">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-400">Loading traces...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No activity recorded yet.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-gray-500 font-medium">Type</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Action & Details</th>
                <th className="px-6 py-3 text-gray-500 font-medium">User</th>
                <th className="px-6 py-3 text-gray-500 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {logs.map((log) => {
                const style = getIconAndColor(log.type);
                return (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.color}`}>
                        {style.icon} {log.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{log.action}</div>
                      {log.details && <div className="text-xs text-gray-500 mt-0.5 font-mono">{log.details}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <User size={14} /> {log.user || "System"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock size={12} /> {formatDate(log.createdAt)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SystemLogs;