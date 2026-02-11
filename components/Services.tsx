
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Fingerprint, Globe2, Briefcase, Bitcoin, Cpu } from 'lucide-react';
import { View } from '../App';

interface ServicesProps {
  onNavigate?: (view: View) => void;
}

const services = [
  { id: 'service-quant' as View, icon: <BarChart3 size={32} />, title: "Quantitative Trading", desc: "Proprietary algorithms capturing market inefficiencies in real-time." },
  { id: 'service-wealth' as View, icon: <Briefcase size={32} />, title: "Wealth Management", desc: "Bespoke strategies tailored to ultra-high-net-worth preservation." },
  { id: 'service-bio' as View, icon: <Fingerprint size={32} />, title: "Biometric Security", desc: "Multi-layered authentication protocols for total peace of mind." },
  { id: 'service-crypto' as View, icon: <Bitcoin size={32} />, title: "Crypto Gateway", desc: "Seamless bridge between fiat and the decentralized future." },
  { id: 'service-liquid' as View, icon: <Globe2 size={32} />, title: "Global Liquidity", desc: "Instantly deploy capital across any market, anywhere on Earth." },
  { id: 'service-ai' as View, icon: <Cpu size={32} />, title: "AI Forecasting", desc: "Predictive modeling powered by advanced neural architectures." },
];

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-[#020408]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Core Infrastructure
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-xl max-w-2xl mx-auto"
          >
            The modular components of your financial future.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(34,211,238,0.1)"
              }}
              className="p-10 rounded-[2.5rem] glass border border-white/5 relative overflow-hidden group cursor-pointer"
              onClick={() => onNavigate?.(service.id)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-colors" />
              <div className="text-cyan-400 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed text-lg">{service.desc}</p>
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-cyan-500 font-bold text-sm tracking-widest group-hover:gap-4 transition-all">
                EXPLORE <span className="text-xs">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
