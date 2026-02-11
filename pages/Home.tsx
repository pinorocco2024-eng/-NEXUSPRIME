
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import AIWorkshop from '../components/AIWorkshop';
import { motion } from 'framer-motion';
import { View } from '../App';
import { GoogleGenAI, Type } from "@google/genai";
import { Activity, ExternalLink } from 'lucide-react';

interface TickerItem {
  t: string; // ticker
  v: string; // value
  up: boolean; // trend
}

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [tickerData, setTickerData] = useState<TickerItem[]>([
    { t: 'BTC/USD', v: '68,432', up: true },
    { t: 'ETH/USD', v: '3,842', up: true },
    { t: 'SPX 500', v: '5,420', up: false },
    { t: 'NASDAQ', v: '18,650', up: true },
    { t: 'GOLD', v: '2,342', up: true },
    { t: 'EUR/USD', v: '1.084', up: false },
  ]);

  const fetchLivePrices = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Return current approximate global market prices for BTC/USD, ETH/USD, S&P 500, NASDAQ 100, GOLD (XAU/USD), and EUR/USD. Return as a JSON array of objects with keys 't' (string), 'v' (string with commas), and 'up' (boolean).",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                t: { type: Type.STRING },
                v: { type: Type.STRING },
                up: { type: Type.BOOLEAN }
              },
              required: ["t", "v", "up"]
            }
          }
        }
      });
      const data = JSON.parse(response.text || '[]');
      if (data.length > 0) setTickerData(data);
    } catch (e) {
      console.error("Failed to fetch live prices:", e);
    }
  };

  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  // Micro-fluctuation effect to make it feel "extra live"
  useEffect(() => {
    const jitter = setInterval(() => {
      setTickerData(prev => prev.map(item => {
        const currentVal = parseFloat(item.v.replace(/,/g, ''));
        if (isNaN(currentVal)) return item;
        const change = (Math.random() - 0.5) * (currentVal * 0.0001);
        return { ...item, v: (currentVal + change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
      }));
    }, 5000);
    return () => clearInterval(jitter);
  }, []);

  const handleTickerClick = (symbol: string) => {
    const query = encodeURIComponent(`${symbol} price live`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <>
      <Hero onNavigate={onNavigate} />
      
      {/* Market Ticker Section */}
      <section className="py-6 border-y border-white/5 overflow-hidden whitespace-nowrap bg-black flex items-center group/ticker">
        <div className="px-8 border-r border-white/10 flex items-center gap-2 z-20 bg-black relative shadow-[10px_0_20px_rgba(0,0,0,1)]">
           <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-2">
             <Activity size={12} /> Live Nexus Feed
           </span>
        </div>
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 text-xl font-bold tracking-widest items-center pl-10"
        >
          {[...tickerData, ...tickerData, ...tickerData].map((ticker, i) => (
            <motion.div 
              key={i} 
              className="flex gap-4 items-center cursor-pointer hover:opacity-70 transition-opacity relative group/item"
              onClick={() => handleTickerClick(ticker.t)}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-slate-500 font-medium group-hover/item:text-cyan-400 transition-colors flex items-center gap-2">
                {ticker.t}
                <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </span>
              <motion.span 
                key={ticker.v}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className={ticker.up ? 'text-emerald-400' : 'text-rose-400'}
              >
                {ticker.v}
              </motion.span>
              <span className="text-slate-800">|</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Services onNavigate={onNavigate} />
      
      {/* Parallax Stats Section */}
      <section className="py-32 relative overflow-hidden">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'AUM', value: '$4.2B+', sub: 'Assets Under Management' },
              { label: 'Active Traders', value: '180K+', sub: 'Global Verified Clients' },
              { label: 'Latency', value: '0.4ms', sub: 'Average Order Execution' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl font-black text-white mb-4 tracking-tighter">{stat.value}</div>
                <div className="text-cyan-500 font-bold mb-2 uppercase text-xs tracking-[0.3em]">{stat.label}</div>
                <div className="text-slate-500 text-sm">{stat.sub}</div>
              </motion.div>
            ))}
         </div>
      </section>

      <AIWorkshop />
      
      {/* Final CTA */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-display font-bold mb-12 tracking-tighter">Enter the <br />Prime Era.</h2>
            <p className="text-slate-400 text-2xl mb-16 max-w-2xl mx-auto font-light">
              Secure your position in the next evolution of global finance.
            </p>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('portal')}
              className="bg-white text-black px-20 py-8 rounded-full font-black text-2xl transition-all"
            >
              JOIN THE WAITLIST
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
