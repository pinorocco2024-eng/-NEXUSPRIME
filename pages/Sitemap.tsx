
import React from 'react';
import { motion } from 'framer-motion';
import { View } from '../App';
import { Network, Package, FileText, ShieldAlert } from 'lucide-react';

interface SitemapProps {
  onNavigate: (view: View) => void;
}

const Sitemap: React.FC<SitemapProps> = ({ onNavigate }) => {
  const categories = [
    {
      title: "Core Infrastructure",
      icon: <Network className="text-cyan-400" />,
      links: [
        { label: "Home", id: "home" },
        { label: "Ecosystem", id: "ecosystem" },
        { label: "Capital Protection", id: "capital" },
        { label: "Neural Quantum", id: "quantum" },
        { label: "Global Advisory", id: "advisory" },
      ]
    },
    {
      title: "Active Services",
      icon: <Package className="text-emerald-400" />,
      links: [
        { label: "Quantitative Trading", id: "service-quant" },
        { label: "Wealth Management", id: "service-wealth" },
        { label: "Biometric Security", id: "service-bio" },
        { label: "Crypto Gateway", id: "service-crypto" },
        { label: "Global Liquidity", id: "service-liquid" },
        { label: "AI Forecasting", id: "service-ai" },
      ]
    },
    {
      title: "Products & Tech",
      icon: <FileText className="text-blue-400" />,
      links: [
        { label: "Digital Custody", id: "prod-custody" },
        { label: "Yield Farming", id: "prod-yield" },
        { label: "Smart Wallets", id: "prod-wallets" },
        { label: "API Documentation", id: "res-api" },
      ]
    },
    {
      title: "Intelligence & Legal",
      icon: <ShieldAlert className="text-rose-400" />,
      links: [
        { label: "Market Reports", id: "res-reports" },
        { label: "Whitepaper", id: "res-whitepaper" },
        { label: "Risk Disclosure", id: "res-risk" },
        { label: "Client Portal", id: "portal" },
      ]
    }
  ];

  return (
    <div className="pt-40 pb-32 bg-[#020408]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic">Sitemap<span className="text-cyan-500">.</span></h1>
          <p className="text-slate-500 text-xl font-light max-w-xl mx-auto uppercase tracking-widest">Navigation Architecture</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h2 className="text-xl font-bold tracking-tight">{cat.title}</h2>
              </div>
              <ul className="space-y-4">
                {cat.links.map((link, lIdx) => (
                  <motion.li key={lIdx} whileHover={{ x: 5 }}>
                    <button 
                      onClick={() => onNavigate(link.id as View)}
                      className="text-slate-500 hover:text-white font-medium transition-colors text-lg"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
