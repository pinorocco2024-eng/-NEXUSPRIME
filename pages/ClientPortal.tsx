
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, 
  Clock, Settings, Lock, UserPlus, Fingerprint, 
  ArrowRight, Loader2, ShieldCheck, TrendingUp, Zap, 
  X, AlertCircle, CheckCircle2, DollarSign, Key, Award
} from 'lucide-react';

type PortalMode = 'login' | 'register' | 'auth_success' | 'authenticated';

interface Transaction {
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRADE' | 'YIELD';
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PROCESSING';
}

interface UserAccount {
  email: string;
  password?: string;
  netWorth: number;
  liquidity: number;
  transactions: Transaction[];
  tier: number;
}

const ClientPortal: React.FC = () => {
  const [mode, setMode] = useState<PortalMode>('login');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Active User State
  const [user, setUser] = useState<UserAccount | null>(null);
  const [txModal, setTxModal] = useState<'deposit' | 'withdraw' | null>(null);
  const [txAmount, setTxAmount] = useState('');
  const [showPerks, setShowPerks] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({ biometric: true, ai: true });

  // Database Simulation Logic
  const getUsers = (): UserAccount[] => JSON.parse(localStorage.getItem('nexus_users') || '[]');
  
  const saveUser = (updatedUser: UserAccount) => {
    const users = getUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem('nexus_users', JSON.stringify(users));
    setUser(updatedUser);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    await new Promise(r => setTimeout(r, 1500));
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setMode('auth_success');
      setUser(foundUser);
      setTimeout(() => setMode('authenticated'), 2000);
    } else {
      setError('Invalid credentials. Access Denied.');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(r => setTimeout(r, 2000));
    const users = getUsers();
    
    if (users.some(u => u.email === email)) {
      setError('Vault already exists for this identity.');
      setLoading(false);
      return;
    }

    const newUser: UserAccount = {
      email,
      password,
      netWorth: 10000.00, // Genesis Bonus
      liquidity: 10000.00,
      tier: 3,
      transactions: [
        { type: 'DEPOSIT', amount: 10000.00, date: new Date().toLocaleDateString(), status: 'COMPLETED' }
      ]
    };

    saveUser(newUser);
    setMode('login');
    setLoading(false);
    alert('Account Initialized. Access with your credentials.');
  };

  const processTransaction = () => {
    if (!user || !txAmount || isNaN(Number(txAmount))) return;
    const amount = Number(txAmount);
    
    if (txModal === 'withdraw' && amount > user.liquidity) {
      alert('Insufficient Liquidity in Vault.');
      return;
    }

    const updatedUser: UserAccount = { ...user };
    const newTx: Transaction = {
      type: txModal === 'deposit' ? 'DEPOSIT' : 'WITHDRAW',
      amount: txModal === 'deposit' ? amount : -amount,
      date: new Date().toLocaleDateString(),
      status: 'COMPLETED'
    };

    updatedUser.transactions = [newTx, ...updatedUser.transactions];
    updatedUser.liquidity += newTx.amount;
    updatedUser.netWorth += newTx.amount;

    saveUser(updatedUser);
    setTxModal(null);
    setTxAmount('');
  };

  const logout = () => {
    setMode('login');
    setUser(null);
    setPassword('');
  };

  // Auth Success Screen (Biometric Animation)
  if (mode === 'auth_success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#010204]">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-32 h-32 bg-cyan-500/20 rounded-full mx-auto flex items-center justify-center mb-8 border border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
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
  if (mode === 'authenticated' && user) {
    return (
      <div className="pt-32 pb-24 bg-[#010204]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            <div className="w-full lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                    <LayoutDashboard size={24} />
                  </div>
                  <h1 className="text-4xl font-black tracking-tight">Prime Dashboard</h1>
                </div>
                <button onClick={logout} className="text-slate-500 hover:text-white transition-colors text-xs font-bold tracking-widest flex items-center gap-2">
                   SECURE LOGOUT <ArrowRight size={14} />
                </button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-10 glass rounded-[2.5rem] border border-cyan-500/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity"><TrendingUp size={80} /></div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Total Net Worth</div>
                  <div className="text-5xl font-black mb-4 tracking-tighter text-white">${user.netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className="text-emerald-400 flex items-center gap-1 font-bold">
                    <ArrowUpRight size={18} /> +4.2% This Month
                  </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-10 glass rounded-[2.5rem] border border-white/5 relative">
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Available Liquidity</div>
                  <div className="text-5xl font-black mb-4 tracking-tighter">${user.liquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className="flex gap-4">
                     <button onClick={() => setTxModal('withdraw')} className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-colors">WITHDRAW</button>
                     <button onClick={() => setTxModal('deposit')} className="bg-white/5 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors border border-white/10">DEPOSIT</button>
                  </div>
                </motion.div>
              </div>

              <div className="glass rounded-[3rem] p-10 border border-white/5 overflow-hidden">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Clock size={20} className="text-slate-500" /> Recent Activity
                </h3>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                  {user.transactions.map((tx, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 -mx-4 rounded-xl transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                          <div className="font-bold">{tx.type}</div>
                          <div className="text-xs text-slate-500 uppercase tracking-widest">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className={`font-bold text-lg ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                           {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                         </div>
                         <div className={`text-[10px] font-black tracking-widest ${tx.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.status}</div>
                      </div>
                    </div>
                  ))}
                  {user.transactions.length === 0 && <p className="text-slate-600 text-center py-8">No vault records found.</p>}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-8">
               <div className="p-10 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[3rem] text-white shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <h3 className="text-2xl font-bold mb-4">Prime Benefits</h3>
                  <p className="opacity-80 text-sm mb-8 leading-relaxed">
                    Your Tier-{user.tier} membership gives you priority access to new seed rounds and decentralized yield farming protocols.
                  </p>
                  <button onClick={() => setShowPerks(true)} className="w-full bg-white text-blue-900 font-black py-4 rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
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
                      <button 
                        onClick={() => setSecuritySettings(s => ({ ...s, biometric: !s.biometric }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.biometric ? 'bg-cyan-500' : 'bg-slate-800'}`}
                      >
                        <motion.div 
                          animate={{ x: securitySettings.biometric ? 22 : 2 }}
                          className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                        />
                      </button>
                    </li>
                    <li className="flex items-center justify-between text-slate-400 hover:text-white cursor-pointer group py-1">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-blue-400" />
                        <span>AI Monitoring</span>
                      </div>
                      <button 
                        onClick={() => setSecuritySettings(s => ({ ...s, ai: !s.ai }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${securitySettings.ai ? 'bg-cyan-500' : 'bg-slate-800'}`}
                      >
                        <motion.div 
                          animate={{ x: securitySettings.ai ? 22 : 2 }}
                          className="absolute top-1 w-3 h-3 bg-white rounded-full" 
                        />
                      </button>
                    </li>
                    <li 
                      onClick={() => setShowKeys(true)}
                      className="flex items-center justify-between text-slate-400 hover:text-white cursor-pointer py-4 border-t border-white/5 mt-4 group"
                    >
                      <span className="font-bold text-xs uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Manage MPC Keys</span>
                      <Settings size={16} />
                    </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>

        {/* Transaction Modal */}
        <AnimatePresence>
          {txModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
               <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-[#0a0c10] border border-white/10 p-12 rounded-[3rem] w-full max-w-md relative">
                  <button onClick={() => setTxModal(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X /></button>
                  <h3 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">
                    {txModal} <span className="text-cyan-500">Liquidity.</span>
                  </h3>
                  <div className="relative mb-8">
                     <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                     <input 
                       autoFocus
                       type="number" 
                       value={txAmount}
                       onChange={(e) => setTxAmount(e.target.value)}
                       placeholder="0.00"
                       className="w-full bg-black border border-white/10 rounded-2xl px-16 py-6 text-2xl font-black focus:border-cyan-500 outline-none"
                     />
                  </div>
                  <button 
                    onClick={processTransaction}
                    className="w-full bg-white text-black py-6 rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all shadow-2xl shadow-white/5"
                  >
                    CONFIRM {txModal.toUpperCase()}
                  </button>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Perks Modal */}
        <AnimatePresence>
           {showPerks && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-[#0a0c10] border border-white/10 p-12 rounded-[3rem] w-full max-w-2xl relative">
                  <button onClick={() => setShowPerks(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X /></button>
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500"><Award size={32} /></div>
                     <h3 className="text-4xl font-black tracking-tighter italic">Tier {user.tier} <span className="text-white">Benefits.</span></h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Zero Gas Trading", desc: "No network fees on all L1/L2 deployments." },
                      { title: "Alpha Access", desc: "Early-stage deal flow notifications via AI." },
                      { title: "Concierge Desk", desc: "24/7 dedicated human advisory on standby." },
                      { title: "HSM Custody", desc: "Military-grade hardware security for all keys." }
                    ].map((p, i) => (
                      <div key={i} className="p-6 glass rounded-2xl border border-white/5">
                        <div className="font-bold mb-1 text-cyan-400">{p.title}</div>
                        <div className="text-sm text-slate-500">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
             </motion.div>
           )}
        </AnimatePresence>

        {/* Keys Modal */}
        <AnimatePresence>
           {showKeys && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-[#0a0c10] border border-white/10 p-12 rounded-[3rem] w-full max-w-lg relative">
                  <button onClick={() => setShowKeys(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X /></button>
                  <div className="flex items-center gap-4 mb-8">
                     <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400"><Key size={32} /></div>
                     <h3 className="text-4xl font-black tracking-tighter italic">Key <span className="text-white">Management.</span></h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-black border border-white/10 rounded-xl font-mono text-[10px] text-slate-500 break-all leading-relaxed">
                       SHR_1: 0x49f2...8e21 (ACTIVE / SYNCED)
                    </div>
                    <div className="p-4 bg-black border border-white/10 rounded-xl font-mono text-[10px] text-slate-500 break-all leading-relaxed">
                       SHR_2: 0x9a21...ff22 (ENCRYPTED / COLD)
                    </div>
                    <div className="p-4 bg-black border border-white/10 rounded-xl font-mono text-[10px] text-slate-500 break-all leading-relaxed">
                       SHR_3: 0xbb82...1209 (BIOMETRIC_BOUND)
                    </div>
                    <p className="text-center text-[10px] text-rose-400 font-bold uppercase tracking-widest mt-6">A 3-of-3 MPC Quorum is established.</p>
                  </div>
                </motion.div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    );
  }

  // Login / Register Screen
  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#010204]">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-6">
        <div className="glass p-12 rounded-[3rem] border border-cyan-500/10 shadow-3xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="mb-10 text-center">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-6">
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
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-2 ml-2">Email Identity</label>
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
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-xs font-bold text-center italic flex items-center justify-center gap-2">
                  <AlertCircle size={12} /> {error}
                </motion.p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-black font-black py-5 rounded-2xl shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    {mode === 'login' ? 'ACCESS PORTAL' : 'INITIALIZE VAULT'}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                className="text-xs font-bold text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                {mode === 'login' ? "New Identity? Register Vault" : "Active Member? Access Portal"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientPortal;
