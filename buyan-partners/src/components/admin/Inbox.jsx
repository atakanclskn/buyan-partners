import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Inbox, Mail, Clock, Trash2 } from 'lucide-react';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this message?")) return;
    try { await deleteDoc(doc(db, "messages", id)); } catch (error) { alert("Error: " + error.message); }
  };

  const formatDate = (timestamp) => timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "Just now";

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6 border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <h3 className="text-2xl font-bold flex items-center gap-3"><Inbox className="text-secondary" /> Inbox</h3>
        <span className="text-sm bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full text-gray-500 font-medium">{messages.length} Messages</span>
      </div>

      {loading ? ( <div className="text-center py-20 text-gray-400">Loading messages...</div> ) : messages.length === 0 ? ( 
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-dashed border-gray-200 dark:border-slate-600">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">No messages found.</p>
        </div> 
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/20 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-lg">{msg.name?.charAt(0).toUpperCase()}</div>
                  <div><h4 className="font-bold text-gray-900 dark:text-white">{msg.name}</h4><p className="text-xs text-gray-500">{msg.email}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {formatDate(msg.createdAt)}</span>
                  <button onClick={() => handleDelete(msg.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="pl-13">
                <div className="inline-block px-2 py-1 rounded bg-gray-200 dark:bg-slate-600 text-xs font-bold mb-2">{msg.subject}</div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-100 dark:border-slate-600">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInbox;