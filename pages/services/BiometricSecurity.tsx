
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Lock, Eye, Key } from 'lucide-react';

const BiometricSecurity: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-20 text-center">
          <Fingerprint size={64} className="text-cyan-400 mx-auto mb-8 animate-pulse" />
          <h1 className="text-6xl font-black mb-6">Biometric Security</h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Multi-layered authentication protocols for total peace of mind. 
            We integrate hardware-level biometrics with decentralized identity for a zero-trust architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="p-1 glass border border-cyan-500/30 rounded-[3rem] overflow-hidden">
             <div className="p-12 bg-black/50 rounded-[2.9rem]">
                <Eye className="text-cyan-400 mb-6" size={32} />
                <h3 className="text-3xl font-bold mb-4">Iris Scanning</h3>
                <p className="text-slate-500 text-lg">Military-grade ocular recognition ensuring that only you can authorize high-value movements.</p>
             </div>
          </div>
          <div className="p-1 glass border border-blue-500/30 rounded-[3rem] overflow-hidden">
             <div className="p-12 bg-black/50 rounded-[2.9rem]">
                <Key className="text-blue-400 mb-6" size={32} />
                <h3 className="text-3xl font-bold mb-4">MPC Custody</h3>
                <p className="text-slate-500 text-lg">Multi-party computation splits your private keys into encrypted shares across global vaults.</p>
             </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-black p-20 rounded-[4rem] text-center border border-white/5">
           <Lock size={80} className="text-cyan-500 mx-auto mb-10" />
           <h2 className="text-4xl font-bold mb-6">Zero-Knowledge Proofs</h2>
           <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
             Validate transactions without revealing underlying data. NEXUS Prime ensures that your 
             financial privacy remains absolute while maintaining full regulatory compliance.
           </p>
        </div>
      </div>
    </div>
  );
};

export default BiometricSecurity;
