
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import Ecosystem from './pages/Ecosystem';
import Capital from './pages/Capital';
import Quantum from './pages/Quantum';
import Advisory from './pages/Advisory';
import ClientPortal from './pages/ClientPortal';
import QuantitativeTrading from './pages/services/QuantitativeTrading';
import WealthManagement from './pages/services/WealthManagement';
import BiometricSecurity from './pages/services/BiometricSecurity';
import CryptoGateway from './pages/services/CryptoGateway';
import GlobalLiquidity from './pages/services/GlobalLiquidity';
import AIForecasting from './pages/services/AIForecasting';
import DigitalCustody from './pages/products/DigitalCustody';
import YieldFarming from './pages/products/YieldFarming';
import SmartWallets from './pages/products/SmartWallets';
import MarketReports from './pages/resources/MarketReports';
import ApiDocs from './pages/resources/ApiDocs';
import Whitepaper from './pages/resources/Whitepaper';
import RiskDisclosure from './pages/resources/RiskDisclosure';
import Sitemap from './pages/Sitemap';

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

export type View = 
  | 'home' | 'ecosystem' | 'capital' | 'quantum' | 'advisory' | 'portal' | 'sitemap'
  | 'service-quant' | 'service-wealth' | 'service-bio' | 'service-crypto' | 'service-liquid' | 'service-ai'
  | 'prod-custody' | 'prod-yield' | 'prod-wallets'
  | 'res-reports' | 'res-api' | 'res-whitepaper' | 'res-risk';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home': return <Home onNavigate={setView} />;
      case 'ecosystem': return <Ecosystem />;
      case 'capital': return <Capital onNavigate={setView} />;
      case 'quantum': return <Quantum />;
      case 'advisory': return <Advisory />;
      case 'portal': return <ClientPortal />;
      case 'sitemap': return <Sitemap onNavigate={setView} />;
      case 'service-quant': return <QuantitativeTrading />;
      case 'service-wealth': return <WealthManagement />;
      case 'service-bio': return <BiometricSecurity />;
      case 'service-crypto': return <CryptoGateway />;
      case 'service-liquid': return <GlobalLiquidity />;
      case 'service-ai': return <AIForecasting />;
      case 'prod-custody': return <DigitalCustody />;
      case 'prod-yield': return <YieldFarming />;
      case 'prod-wallets': return <SmartWallets />;
      case 'res-reports': return <MarketReports />;
      case 'res-api': return <ApiDocs />;
      case 'res-whitepaper': return <Whitepaper />;
      case 'res-risk': return <RiskDisclosure />;
      default: return <Home onNavigate={setView} />;
    }
  };

  return (
    <div className="relative antialiased selection:bg-cyan-500/30 selection:text-cyan-200 bg-[#020408] overflow-x-hidden">
      {/* Igloo-style Organic Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" 
        />
      </div>

      <CustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 z-[100] origin-left" style={{ scaleX }} />
      <Navbar currentView={view} setView={setView} />
      
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={setView} />
      <AIAssistant />
    </div>
  );
};

export default App;
