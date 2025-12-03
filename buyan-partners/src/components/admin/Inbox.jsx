import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { Inbox, Mail, Clock, Trash2, CheckCircle, MailOpen, RefreshCw } from 'lucide-react';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verileri Çekme
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Mesaj Silme
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this message permanently?")) return;
    try { await deleteDoc(doc(db, "messages", id)); } catch (error) { alert("Error: " + error.message); }
  };

  // Okundu/Okunmadı İşaretleme (Toggle)
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const messageRef = doc(db, "messages", id);
      await updateDoc(messageRef, { read: !currentStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatDate = (timestamp) => timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "Just now";

  // Mesajları Ayırma (Filter)
  const unreadMessages = messages.filter(m => !m.read);
  const readMessages = messages.filter(m => m.read);

  // --- KART BİLEŞENİ (Kod tekrarını önlemek için) ---
  const MessageCard = ({ msg, isRead }) => (
    <div className={`p-6 rounded-xl border transition-all duration-300 relative group overflow-hidden
      ${isRead 
        ? 'bg-gray-100 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 opacity-75 hover:opacity-100 grayscale-[0.3] hover:grayscale-0' // Okunanlar: Soluk
        : 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900/50 shadow-lg shadow-blue-500/5 border-l-4 border-l-blue-500' // Okunmayanlar: Aktif
      }
    `}>
      
      {/* BUTONLAR (Sağ Üst) */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {/* Okundu/Okunmadı Butonu */}
        <button 
          onClick={() => toggleReadStatus(msg.id, msg.read)}
          className={`p-2 rounded-lg transition-colors ${isRead ? 'text-blue-500 hover:bg-blue-50' : 'text-green-500 hover:bg-green-50'}`}
          title={isRead ? "Mark as Unread" : "Mark as Read"}
        >
          {isRead ? <RefreshCw size={18} /> : <CheckCircle size={18} />}
        </button>

        {/* Silme Butonu */}
        <button 
          onClick={() => handleDelete(msg.id)} 
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Delete Message"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4 pr-16">
        {/* AVATAR */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 
          ${isRead ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600'}
        `}>
          {msg.name?.charAt(0).toUpperCase()}
        </div>
        
        {/* INFO */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h4 className={`font-bold truncate ${isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {msg.name}
            </h4>
            <span className="hidden sm:inline text-gray-300">•</span>
            <p className="text-xs text-gray-500 truncate">{msg.email}</p>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} /> {formatDate(msg.createdAt)}
          </span>
        </div>
      </div>
      
      <div className="pl-0 md:pl-14">
        {/* SUBJECT */}
        <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 max-w-full truncate
          ${isRead ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'}
        `}>
          {msg.subject}
        </div>
        
        {/* MESSAGE CONTENT */}
        <div className={`p-4 rounded-lg border 
          ${isRead ? 'bg-transparent border-transparent' : 'bg-gray-50 dark:bg-slate-900/50 border-gray-100 dark:border-slate-700'}
        `}>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words break-all">
            {msg.message}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      
      {/* BAŞLIK VE İSTATİSTİK */}
      <div className="border-b pb-4 mb-6 border-gray-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-20 py-2">
        <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
          <Inbox className="text-secondary" /> Inbox
        </h3>
        <div className="flex gap-2">
          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold">{unreadMessages.length} New</span>
          <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">{readMessages.length} Read</span>
        </div>
      </div>

      {loading ? ( <div className="text-center py-20 text-gray-400">Loading messages...</div> ) : messages.length === 0 ? ( 
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-dashed border-gray-200 dark:border-slate-600">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">No messages found.</p>
        </div> 
      ) : (
        <>
          {/* --- BÖLÜM 1: YENİ MESAJLAR (UNREAD) --- */}
          {unreadMessages.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> New Messages
              </h4>
              {unreadMessages.map((msg) => (
                <MessageCard key={msg.id} msg={msg} isRead={false} />
              ))}
            </div>
          )}

          {/* AYIRAÇ */}
          {unreadMessages.length > 0 && readMessages.length > 0 && <div className="border-t border-gray-200 dark:border-slate-700 my-8"></div>}

          {/* --- BÖLÜM 2: OKUNMUŞ MESAJLAR (READ) --- */}
          {readMessages.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MailOpen size={16} /> Read Archive
              </h4>
              {readMessages.map((msg) => (
                <MessageCard key={msg.id} msg={msg} isRead={true} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminInbox;