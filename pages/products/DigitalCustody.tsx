
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Lock, Layers } from 'lucide-react';

const DigitalCustody: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">Digital <span className="text-cyan-500">Custody.</span></h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
            Fortress-grade protection for your digital assets. Combining multi-party computation (MPC) with cold storage vaults across four continents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="p-12 glass rounded-[3rem] border border-cyan-500/20">
            <Key className="text-cyan-400 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Multi-Key Governance</h3>
            <p className="text-slate-500 text-lg leading-relaxed">Authorization requires independent signing from your biometric device, our secure enclave, and a third-party institutional oracle.</p>
          </div>
          <div className="p-12 glass rounded-[3rem] border border-white/5">
            <Lock className="text-emerald-400 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Insured Deposits</h3>
            <p className="text-slate-500 text-lg leading-relaxed">All assets held in NEXUS Prime vaults are covered by a comprehensive $250M institutional insurance policy against hardware failure or cyber events.</p>
          </div>
        </div>

        <div className="bg-white/5 p-20 rounded-[4rem] text-center">
          <Layers className="mx-auto text-cyan-500 mb-8" size={64} />
          <h2 className="text-4xl font-black mb-6">Tier-1 Regulatory Compliance</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12">Our custody solution is SOC2 Type II certified and compliant with the highest standards of global financial regulations.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="px-8 py-4 glass rounded-2xl font-bold border-emerald-500/20 text-emerald-400">SOC2 COMPLIANT</div>
            <div className="px-8 py-4 glass rounded-2xl font-bold border-cyan-500/20 text-cyan-400">FINCEN REGISTERED</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCustody;
