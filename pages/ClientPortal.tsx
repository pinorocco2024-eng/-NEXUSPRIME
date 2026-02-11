
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, Clock, Settings, Lock, UserPlus, Fingerprint, ArrowRight, Loader2, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

type PortalMode = 'login' | 'register' | 'auth_success' | 'authenticated';

const ClientPortal: React.FC = () => {
  const [mode, setMode] = useState<PortalMode>('login');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');
    
    // Simulate biometric/auth verification
    await new Promise(r => setTimeout(r, 1500));
    
    if (password === 'nexus2025') {
      setMode('auth_success');
      setTimeout(() => setMode('authenticated'), 2000);
    } else {
      setError('Invalid authorization key. Hint: nexus2025');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setMode('login');
    setLoading(false);
    alert('Registration successful! Please login with your new credentials.');
  };

  const transactions = [
    { type: 'DEPOSIT', amount: '+$50,000.00', date: 'Oct 24, 2025', status: 'COMPLETED' },
    { type: 'TRADE', amount: '-$12,430.22', date: 'Oct 23, 2025', status: 'COMPLETED' },
    { type: 'YIELD', amount: '+$432.11', date: 'Oct 22, 2025', status: 'PROCESSING' },
  ];

  // Auth Success Screen (Biometric Animation)
  if (mode === 'auth_success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010204]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-32 h-32 bg-cyan-500/20 rounded-full mx-auto flex items-center justify-center mb-8 border border-cyan-500/50"
          >
            <Fingerprint size={64} className="text-cyan-400" />
          </motion.div>
          <h2 className="text-3xl font-black mb-2 tracking-tighter">BIOMETRIC VERIFIED</h2>
          <p className="text-slate-500 tracking-[0.3em] uppercase text-xs">Decrypting Vault Access...</p>
        </motion.div>
      </div>
    );
  }

  // Dashboard Screen
  if (mode === 'authenticated') {
    return (
      <div className="pt-32 pb-24 bg-[#010204]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="w-full lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                  <LayoutDashboard size={24} />
                </div>
                <h1 className="text-4xl font-black tracking-tight">Prime Dashboard</h1>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 glass rounded-[2.5rem] border border-cyan-500/20 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-20"><TrendingUp size={48} /></div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Total Net Worth</div>
                  <div className="text-5xl font-black mb-4 tracking-tighter">$1,432,654.12</div>
                  <div className="text-emerald-400 flex items-center gap-1 font-bold">
                    <ArrowUpRight size={18} /> +4.2% This Month
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-10 glass rounded-[2.5rem] border border-white/5"
                >
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Available Liquidity</div>
                  <div className="text-5xl font-black mb-4 tracking-tighter">$284,120.00</div>
                  <div className="flex gap-4">
                     <button className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-colors">WITHDRAW</button>
                     <button className="bg-white/5 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">DEPOSIT</button>
                  </div>
                </motion.div>
              </div>

              <div className="glass rounded-[3rem] p-10 border border-white/5 overflow-hidden">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Clock size={20} className="text-slate-500" /> Recent Activity
                </h3>
                <div className="space-y-6">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 -mx-4 rounded-xl transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${tx.type === 'DEPOSIT' || tx.type === 'YIELD' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {tx.type === 'DEPOSIT' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                          <div className="font-bold">{tx.type}</div>
                          <div className="text-xs text-slate-500 uppercase tracking-widest">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="font-bold text-lg">{tx.amount}</div>
                         <div className={`text-[10px] font-black tracking-widest ${tx.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-8">
               <div className="p-10 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[3rem] text-white shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <h3 className="text-2xl font-bold mb-4">Prime Benefits</h3>
                  <p className="opacity-80 text-sm mb-8 leading-relaxed">
                    Your Tier-3 membership gives you priority access to new seed rounds and decentralized yield farming protocols.
                  </p>
                  <button className="w-full bg-white text-blue-900 font-black py-4 rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
                    VIEW PERKS
                  </button>
               </div>
               
               <div className="p-10 glass rounded-[3rem] border border-white/5">
                  <h3 className="text-xl font-bold mb-6">Security Shield</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between text-slate-400 hover:text-white cursor-pointer group py-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-cyan-400" />
                        <span>Biometric Lock</span>
                      </div>
                      <div className="w-10 h-5 bg-cyan-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between text-slate-400 hover:text-white cursor-pointer group py-1">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-blue-400" />
                        <span>AI Notifications</span>
                      </div>
                      <div className="w-10 h-5 bg-cyan-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between text-slate-400 hover:text-white cursor-pointer py-2 border-t border-white/5 mt-4">
                      <span>Manage Keys</span>
                      <Settings size={16} />
                    </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login / Register Screen
  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#010204]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6"
      >
        <div className="glass p-12 rounded-[3rem] border border-cyan-500/10 shadow-3xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="mb-10 text-center">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-6"
              >
                {mode === 'login' ? <Lock size={32} /> : <UserPlus size={32} />}
              </motion.div>
              <h2 className="text-4xl font-black tracking-tighter mb-2">
                {mode === 'login' ? 'Nexus Login' : 'Create Account'}
              </h2>
              <p className="text-slate-500 text-sm">
                {mode === 'login' ? 'Enter your credentials to access the vault' : 'Join the elite ranks of global investors'}
              </p>
            </div>

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-2 ml-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@prime.nexus"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-all text-white placeholder:text-slate-700 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-2 ml-2">Authorization Key</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-500 transition-all text-white placeholder:text-slate-700 shadow-inner"
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-rose-500 text-xs font-bold text-center italic"
                >
                  {error}
                </motion.p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-black font-black py-5 rounded-2xl shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    {mode === 'login' ? 'ACCESS PORTAL' : 'INITIALIZE ACCOUNT'}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                {mode === 'login' ? "Don't have an account? Register" : "Already a member? Login"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientPortal;
