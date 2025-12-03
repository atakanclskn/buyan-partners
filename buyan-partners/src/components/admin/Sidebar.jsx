import { Layout, Briefcase, Type, Users, Phone, Share2, Palette, Inbox, LogOut, Activity } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Sidebar = ({ activeTab, setActiveTab, onClose }) => {
  
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut(auth);
      onClose();
      window.location.reload();
    }
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${activeTab === id ? 'bg-secondary text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col shadow-xl z-10 shrink-0 h-full">
      <div className="p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800">
        <h2 className="font-bold text-lg tracking-tight">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-4 pb-4 border-b border-gray-100 dark:border-slate-700">
           <TabButton id="inbox" icon={Inbox} label="Inbox (Messages)" />
        </div>
        <TabButton id="hero" icon={Layout} label="Hero Section" />
        <TabButton id="services" icon={Briefcase} label="Services" />
        <TabButton id="about" icon={Type} label="About Us" />
        <TabButton id="founders" icon={Users} label="Leadership" />
        <TabButton id="contact" icon={Phone} label="Contact Info" />
        <TabButton id="footer" icon={Share2} label="Footer Settings" />
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
          <TabButton id="theme" icon={Palette} label="Theme Settings" />
        </div>
      </nav>

      {/* --- ALT BÖLÜM: LOGLAR VE ÇIKIŞ --- */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 space-y-2">
        
        {/* LOG BUTONU (LOGOUT'UN ÜSTÜNDE) */}
        <button 
          onClick={() => setActiveTab('logs')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === 'logs' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-slate-800'}`}
        >
          <Activity size={18} /> System Logs
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;