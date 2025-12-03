import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { 
  Inbox, Mail, Clock, Trash2, CheckCircle, MailOpen, RefreshCw, 
  Phone, ChevronDown, ChevronUp, User, Search, Archive, Filter 
} from 'lucide-react';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if(!window.confirm("Delete this message permanently?")) return;
    try { await deleteDoc(doc(db, "messages", id)); } catch (error) { alert("Error: " + error.message); }
  };

  const toggleReadStatus = async (e, id, currentStatus) => {
    e.stopPropagation();
    try { await updateDoc(doc(db, "messages", id), { read: !currentStatus }); } catch (error) { console.error(error); }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    return new Date(timestamp.seconds * 1000).toLocaleString('tr-TR', { 
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
    });
  };

  const getFilteredMessages = () => {
    let filtered = messages;
    if (activeTab === 'inbox') filtered = filtered.filter(m => !m.read);
    else if (activeTab === 'archive') filtered = filtered.filter(m => m.read);

    if (searchTerm.trim() !== '') {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(lowerTerm) ||
        m.email.toLowerCase().includes(lowerTerm) ||
        m.subject.toLowerCase().includes(lowerTerm) ||
        m.message.toLowerCase().includes(lowerTerm)
      );
    }

    filtered.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  };

  const displayMessages = getFilteredMessages();
  const unreadCount = messages.filter(m => !m.read).length;
  const readCount = messages.filter(m => m.read).length;

  return (
    // ANA KAPLAYICI: Light: bg-white, Dark: bg-slate-900
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      
      {/* --- TOOLBAR --- */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center transition-colors">
        
        {/* Arama */}
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition-all
              bg-white dark:bg-slate-700 
              border border-gray-200 dark:border-slate-600 
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sıralama */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">Sort by:</span>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer
              bg-white dark:bg-slate-700 
              border border-gray-200 dark:border-slate-600 
              text-gray-900 dark:text-white"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- SOL MENÜ (SIDEBAR) --- */}
        <div className="w-64 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex-shrink-0 flex flex-col transition-colors">
          <div className="p-4 space-y-1">
            
            {/* Inbox Butonu */}
            <button 
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'inbox' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}
              `}
            >
              <div className="flex items-center gap-3"><Inbox size={18} /> Inbox</div>
              {unreadCount > 0 && <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </button>

            {/* Archive Butonu */}
            <button 
              onClick={() => setActiveTab('archive')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'archive' 
                  ? 'bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}
              `}
            >
              <div className="flex items-center gap-3"><MailOpen size={18} /> Read Archive</div>
              <span className="text-gray-400 text-xs">{readCount}</span>
            </button>

            {/* All Butonu */}
            <button 
              onClick={() => setActiveTab('all')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'all' 
                  ? 'bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}
              `}
            >
              <div className="flex items-center gap-3"><Archive size={18} /> All Messages</div>
              <span className="text-gray-400 text-xs">{messages.length}</span>
            </button>
          </div>
        </div>

        {/* --- SAĞ LİSTE (MESAJLAR) --- */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950 p-0 relative transition-colors">
          
          {loading ? ( 
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div><span className="text-sm">Syncing...</span></div> 
          ) : displayMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-full"><Inbox size={48} className="opacity-20" /></div>
              <p>No messages found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-slate-700 border-b border-gray-200 dark:border-slate-700">
              {displayMessages.map((msg) => {
                const isExpanded = expandedId === msg.id;
                return (
                  <div key={msg.id} className={`transition-colors bg-white dark:bg-slate-900 ${msg.read ? 'opacity-75 hover:opacity-100' : ''}`}>
                    
                    {/* --- MESAJ SATIRI --- */}
                    <div 
                      onClick={() => toggleExpand(msg.id)}
                      className={`flex items-center gap-4 p-4 cursor-pointer transition-colors
                        ${!msg.read 
                           ? 'bg-white dark:bg-slate-900 border-l-4 border-l-blue-500' // Okunmamış: Beyaz/Koyu + Mavi Çizgi
                           : 'bg-gray-50/50 dark:bg-slate-900/50 border-l-4 border-l-transparent hover:bg-gray-100 dark:hover:bg-slate-800' // Okunmuş: Hafif Gri/Koyu
                        }
                        ${isExpanded ? 'bg-blue-50/50 dark:bg-slate-800' : ''} // Açık: Hafif Mavi/Koyu Gri
                      `}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 uppercase
                        ${!msg.read 
                           ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200' 
                           : 'bg-gray-200 text-gray-500 dark:bg-slate-700 dark:text-gray-400'}
                      `}>
                        {msg.name?.substring(0,2)}
                      </div>

                      {/* Özet */}
                      <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                        <div className={`col-span-3 truncate text-sm 
                          ${!msg.read ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-400'}`}>
                          {msg.name}
                        </div>
                        <div className="col-span-7 flex items-center gap-2 min-w-0">
                          <span className={`text-sm truncate 
                            ${!msg.read ? 'font-bold text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                            {msg.subject}
                          </span>
                          <span className="text-sm text-gray-400 dark:text-gray-500 truncate hidden sm:block">- {msg.message.substring(0, 40)}...</span>
                        </div>
                        <div className="col-span-2 text-right text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                          {formatDate(msg.createdAt)}
                        </div>
                      </div>

                      {/* Ok */}
                      <div className="text-gray-400 dark:text-gray-500">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {/* --- AÇILIR DETAY --- */}
                    {isExpanded && (
                      <div className="bg-gray-50 dark:bg-slate-800/30 p-6 border-t border-gray-100 dark:border-slate-800 animate-fadeIn">
                        
                        {/* İletişim Detayları */}
                        <div className="flex flex-wrap gap-6 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <User size={16} className="text-blue-500"/> <span className="font-semibold">{msg.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Mail size={16} className="text-blue-500"/> <a href={`mailto:${msg.email}`} className="hover:text-blue-400 underline">{msg.email}</a>
                          </div>
                          {msg.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Phone size={16} className="text-blue-500"/> <a href={`tel:${msg.phone}`} className="hover:text-blue-400 underline">{msg.phone}</a>
                            </div>
                          )}
                        </div>

                        {/* Mesaj */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm mb-6">
                          <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {msg.message}
                          </p>
                        </div>

                        {/* Butonlar */}
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={(e) => toggleReadStatus(e, msg.id, msg.read)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors border
                              ${msg.read 
                                ? 'border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20' 
                                : 'border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20'
                              }
                            `}
                          >
                            {msg.read ? <><RefreshCw size={16}/> Mark as Unread</> : <><CheckCircle size={16}/> Mark as Read</>}
                          </button>

                          <button 
                            onClick={(e) => handleDelete(e, msg.id)} 
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <Trash2 size={16} /> Delete Permanently
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;