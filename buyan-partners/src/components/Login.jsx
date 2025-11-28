import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, User, ArrowRight, X } from 'lucide-react';

const Login = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(); // Open panel on success
    } catch (err) {
      // Hata mesajını İngilizce yaptık
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
            <Lock size={32} />
          </div>
          {/* Başlıklar İngilizce */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Sign in to manage website content.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            {/* Etiket İngilizce */}
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-secondary outline-none transition-colors"
                placeholder="admin@buyanpartners.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            {/* Etiket İngilizce */}
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-secondary outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          {/* Buton Metinleri İngilizce */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/25"
          >
            {loading ? "Signing In..." : "Go to Panel"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;