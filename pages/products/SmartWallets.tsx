
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Fingerprint, Eye, Sparkles } from 'lucide-react';

const SmartWallets: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="mb-24">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">Smart <span className="text-purple-500">Wallets.</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl font-light">
            The end of seed phrases. The beginning of true ownership. Account abstraction meets biometric elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-24">
           <div className="space-y-12">
              {[
                { icon: <Fingerprint />, title: "Social Recovery", desc: "Never lose access. Restore your vault through a network of trusted contacts or biometric verification." },
                { icon: <Eye />, title: "Privacy Mode", desc: "Native stealth addresses and zero-knowledge proofs hide your balance from the public ledger." },
                { icon: <Sparkles />, title: "Gasless Transactions", desc: "NEXUS Prime subsidizes network fees for all premium tier members. Just sign and trade." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
           <div className="glass p-1 border border-purple-500/20 rounded-[4rem] overflow-hidden">
              <div className="bg-black/50 p-20 rounded-[3.9rem] text-center">
                 <Wallet size={160} className="mx-auto text-purple-500 mb-8 opacity-30" />
                 <h2 className="text-3xl font-black mb-4">Prime Wallet App</h2>
                 <p className="text-slate-500 mb-8 uppercase text-xs tracking-widest font-bold">COMING SOON TO IOS & ANDROID</p>
                 <button className="bg-white text-black px-12 py-4 rounded-full font-bold">JOIN BETA</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWallets;
