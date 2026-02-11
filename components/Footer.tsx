
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, CreditCard, PieChart } from 'lucide-react';
import { View } from '../App';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#010204] py-24 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black mb-8 tracking-tighter cursor-pointer" onClick={() => onNavigate?.('home')}>
              NEXUS<span className="text-cyan-500">PRIME</span>
            </h2>
            <p className="text-slate-500 max-w-xs leading-relaxed text-lg font-light">
              Re-architecting global capital markets through quantitative excellence and neural intelligence.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.3em] text-slate-400">Products</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate?.('service-quant')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Quantum Trading</button></li>
              <li><button onClick={() => onNavigate?.('prod-custody')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Digital Custody</button></li>
              <li><button onClick={() => onNavigate?.('prod-yield')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Yield Farming</button></li>
              <li><button onClick={() => onNavigate?.('prod-wallets')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Smart Wallets</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.3em] text-slate-400">Resources</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate?.('res-reports')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Market Reports</button></li>
              <li><button onClick={() => onNavigate?.('res-api')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">API Documentation</button></li>
              <li><button onClick={() => onNavigate?.('res-whitepaper')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Whitepaper</button></li>
              <li><button onClick={() => onNavigate?.('sitemap')} className="text-slate-500 hover:text-cyan-400 transition-colors text-left">Sitemap</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.3em] text-slate-400">Security</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate?.('service-bio')}>
                <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                  <Shield size={20} />
                </div>
                <div className="text-xs font-bold text-slate-400">AES-256 BANK GRADE</div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate?.('service-liquid')}>
                <div className="p-3 bg-white/5 rounded-xl text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                  <Globe size={20} />
                </div>
                <div className="text-xs font-bold text-slate-400">FINCEN REGULATED</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] tracking-[0.4em] text-slate-700 uppercase">
          <p>© 2025 NEXUS PRIME CAPITAL PARTNERS. ALL TRADEMARKS RESERVED.</p>
          <div className="flex gap-12 mt-6 md:mt-0">
            <button onClick={() => onNavigate?.('res-risk')} className="hover:text-white transition-colors">Privacy Vault</button>
            <button onClick={() => onNavigate?.('res-whitepaper')} className="hover:text-white transition-colors">Legal Framework</button>
            <button onClick={() => onNavigate?.('sitemap')} className="hover:text-white transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
