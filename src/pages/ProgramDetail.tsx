import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Refrigerator, ShieldCheck, Thermometer, Info, Bell, Activity, Layers, Search, Users, Loader2, ChevronDown, CheckCircle2 } from 'lucide-react';
import type { Page } from '../types';
import { PartnerCarousel } from '../components/PartnerCarousel';
import { cn } from '../lib/utils';

import RealTimeMap from '../components/RealTimeMap';

export default function ProgramDetail({ setPage }: { setPage: (page: Page) => void }) {
  const [zoom, setZoom] = useState(1);
  const [region, setRegion] = useState<'Kodikulam' | 'Othakadai'>('Kodikulam');
  const [showRegionList, setShowRegionList] = useState(false);
  const [notified, setNotified] = useState<{ active: boolean; item?: string }>({ active: false });
  const [searchQuery, setSearchQuery] = useState('');

  const regionData = {
    Kodikulam: { 
      ngos: 12, 
      stats: { akshaya: '40%', robin: '30%', comm: '30%' },
      impact: '1.5k',
      temp: '3.8°C',
      locations: [
        { id: 1, name: 'A-1 Community', dist: '2.1km', temp: '4.1°C', lat: 9.9405, lng: 78.1485, type: 'hub' as const },
        { id: 2, name: 'Campus-2 Hub', dist: '3.5km', temp: '4.0°C', lat: 9.9450, lng: 78.1550, type: 'hub' as const },
        { id: 3, name: 'Main Road Fridge', dist: '0.8km', temp: '3.9°C', lat: 9.9380, lng: 78.1400, type: 'fridge' as const }
      ]
    },
    Othakadai: { 
      ngos: 8, 
      stats: { akshaya: '25%', robin: '45%', comm: '30%' },
      impact: '0.9k',
      temp: '4.1°C',
      locations: [
        { id: 4, name: 'Othakadai Center', dist: '1.2km', temp: '4.2°C', lat: 9.9572, lng: 78.1728, type: 'hub' as const },
        { id: 5, name: 'Lake Side Hub', dist: '4.1km', temp: '4.0°C', lat: 9.9620, lng: 78.1800, type: 'hub' as const }
      ]
    }
  };

  const current = regionData[region];

  const handleNotify = (item?: string) => {
    setNotified({ active: true, item });
    setTimeout(() => setNotified({ active: false }), 5000);
  };

  const filteredLocations = current.locations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Command Center Hero */}
      <section className="bg-[#0f1d13] pt-12 pb-32 relative overflow-hidden min-h-[750px] flex flex-col justify-center">
        {/* Background Map with Pulsing Fridge Indicators */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" 
            alt="" 
            className="w-full h-full object-cover opacity-[0.12] brightness-105"
          />
          {/* AI Fridge Pulsing Spots */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary-500 rounded-full"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
                boxShadow: [
                  "0 0 0px var(--color-primary-500)",
                  "0 0 10px var(--color-primary-500)",
                  "0 0 0px var(--color-primary-500)"
                ]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Background Gradients & Textures */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1a3c26,transparent)] opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-primary-400/60 text-[10px] font-black uppercase tracking-[0.3em] mb-12 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="hover:text-primary-400 cursor-pointer transition-colors" onClick={() => setPage('programs')}>Programs</span> <ArrowRight size={10} className="text-white/20" /> <span className="text-white">{region} Region Detail</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowRegionList(!showRegionList)}
                className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-white hover:bg-white/10 transition-all"
              >
                Switch Region: <span className="text-primary-500">{region}</span>
                <ChevronDown size={14} className={cn("transition-transform", showRegionList && "rotate-180")} />
              </button>
              
              {showRegionList && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-3xl z-50 overflow-hidden">
                  {['Kodikulam', 'Othakadai'].map(r => (
                    <button
                      key={r}
                      onClick={() => { setRegion(r as any); setShowRegionList(false); }}
                      className="w-full text-left px-6 py-4 text-xs font-black hover:bg-white/5 transition-all"
                    >
                      {r} Region
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center mb-16 px-4">
            <h1 className="text-white text-xs font-black tracking-[0.4em] uppercase opacity-60 mb-2">Program Impact</h1>
          </div>

          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            {/* Left: NGO Stats */}
            <div className="w-full md:w-1/4 flex flex-col items-start gap-4">
              <div className="space-y-2 mb-6">
                <p className="text-[11px] font-black text-primary-400 uppercase tracking-[0.3em] border-b border-primary-500/20 pb-2 mb-4 inline-block">Active Hub Stats</p>
                <p className="text-6xl font-black text-white tracking-tighter">{current.ngos}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NGOs Participating</p>
              </div>
              
              <div className="w-full p-6 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-md shadow-2xl">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">NGO Distribution</p>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-[10px] font-black text-white/80 uppercase tracking-tighter">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full ring-2 ring-primary-500/10"></span>
                      Akshaya Patra
                    </div>
                    <span className="text-primary-400">{current.stats.akshaya}</span>
                  </li>
                  <li className="flex items-center justify-between text-[10px] font-black text-white/80 uppercase tracking-tighter">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full ring-2 ring-orange-500/10"></span>
                      Robin Hood
                    </div>
                    <span className="text-orange-400">{current.stats.robin}</span>
                  </li>
                  <li className="flex items-center justify-between text-[10px] font-black text-white/80 uppercase tracking-tighter">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full ring-2 ring-blue-500/10"></span>
                      Community
                    </div>
                    <span className="text-blue-400">{current.stats.comm}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Center: Triple Ring Gauge Dashboard */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square max-w-[400px] bg-black/20 rounded-[80px] border border-white/10 p-8 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent)] opacity-50 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full transform -rotate-90">
                    <circle cx="200" cy="200" r="160" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="32" />
                    <circle cx="200" cy="200" r="160" fill="transparent" stroke="#22c55e" strokeWidth="32" strokeDasharray="1005" strokeDashoffset="250" strokeLinecap="round" className="drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                    
                    <circle cx="200" cy="200" r="120" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="24" />
                    <circle cx="200" cy="200" r="120" fill="transparent" stroke="#f59e0b" strokeWidth="24" strokeDasharray="754" strokeDashoffset="400" strokeLinecap="round" />
                    
                    <circle cx="200" cy="200" r="90" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="16" />
                    <circle cx="200" cy="200" r="90" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="565" strokeDashoffset="280" strokeLinecap="round" />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Activity className="text-primary-500 mb-2" size={32} />
                    </motion.div>
                    <p className="text-6xl font-black text-white tracking-tighter">{current.impact}<span className="text-primary-500 ml-1">+</span></p>
                    <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em] mt-1">Live Impact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Regional Impact Map (Framed) */}
            <div className="w-full md:w-1/4 flex flex-col items-end gap-4 text-right">
               <div className="relative w-full aspect-square md:aspect-[3/4] bg-white/5 rounded-[40px] border border-white/10 p-6 backdrop-blur-sm shadow-2xl overflow-hidden group">
                  <p className="text-[10px] font-black text-primary-400 border-b border-primary-500/30 pb-2 mb-4 uppercase tracking-[0.2em] text-right">Map Explorer</p>
                  <motion.img 
                    initial={{ opacity: 0.8, scale: 0.95 }}
                    animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    src="/images/regenerated_image_1778587352875.jpg" 
                    alt="Map" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
               </div>
               <div className="px-4">
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Footprint</p>
                 <p className="text-xs font-bold text-primary-400">8 Regions Syncing...</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Active Hub Explorer */}
        <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-slate-100 flex flex-col transform hover:translate-y-[-4px] transition-all duration-500">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Find Food Near You</h2>
            
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full">
              {/* Region Selector Dropdown */}
              <div className="relative w-full sm:w-64">
                <button 
                  onClick={() => setShowRegionList(!showRegionList)}
                  className="w-full flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-slate-900 hover:bg-slate-100 transition-all font-black text-xs uppercase tracking-widest"
                >
                  Region: <span className="text-primary-600">{region}</span>
                  <ChevronDown size={14} className={cn("transition-transform", showRegionList && "rotate-180")} />
                </button>
                
                {showRegionList && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {['Kodikulam', 'Othakadai'].map(r => (
                      <button
                        key={r}
                        onClick={() => { setRegion(r as any); setShowRegionList(false); }}
                        className={cn(
                          "w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all",
                          region === r ? "text-primary-600 bg-primary-50/50" : "text-slate-500"
                        )}
                      >
                        {r} Region
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search community fridges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary-500 font-bold text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="bg-primary-50 px-4 py-2 rounded-2xl flex items-center gap-2 shrink-0">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest leading-none mt-0.5">Live Tracking Active</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 relative aspect-[16/9] bg-slate-50 rounded-[32px] overflow-hidden border border-slate-200">
              <RealTimeMap region={region} locations={filteredLocations as any} />
            </div>

            <div className="flex flex-col h-full relative">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Nearby NGO Partners</h3>
              <div className="space-y-4 mb-8">
                <div className="p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/30 hover:border-primary-100 hover:bg-white transition-all group">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-black text-slate-900">{region === 'Kodikulam' ? 'Akshaya Patra' : 'Helping Hands'}</p>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">- {region} pick-up active</p>
                </div>
                <div className="p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/30 hover:border-primary-100 hover:bg-white transition-all group">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-black text-slate-900">{region === 'Kodikulam' ? 'Robin Hood Army' : 'Kiran Foundation'}</p>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">- Emergency rescue active</p>
                </div>
              </div>

              <div className="relative">
                <button 
                  onClick={() => handleNotify()}
                  className={cn(
                    "w-full py-5 rounded-[24px] font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95",
                    notified.active && !notified.item ? "bg-primary-600 text-white" : "bg-[#16a34a] hover:bg-[#15803d] text-white shadow-green-100"
                  )}
                >
                  {notified.active && !notified.item ? "NOTIFICATION SENT" : "CONNECT & NOTIFY"}
                  {notified.active && !notified.item ? <CheckCircle2 size={18} /> : <Activity size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals Hub */}
        <div className="bg-[#051409] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col transform hover:translate-y-[-4px] transition-all duration-500 group/vitals">
          {/* Background Vitals Image Option */}
          <div className="absolute inset-0 z-0 opacity-[0.15] blur-sm pointer-events-none group-hover/vitals:scale-105 transition-transform duration-1000">
            <img 
              src="/images/regenerated_image_1778569592777.jpg" 
              alt="" 
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Device Telemetry</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Smart Fridge Status</h2>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <Activity className="text-primary-500 animate-pulse" size={28} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="relative">
              <div className="aspect-[4/3] md:aspect-[3/4] rounded-[40px] bg-slate-900 border-8 border-slate-800 shadow-2xl relative overflow-hidden group">
                {/* Technical Grid Background */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Fridge Interior "Diagram" Representation */}
                <div className="absolute inset-0 flex flex-col p-6 gap-4">
                  {/* Shelf 1 */}
                  <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col justify-end relative overflow-hidden group/shelf">
                    <div className="absolute top-2 right-4 text-[8px] font-black text-primary-500/40 uppercase tracking-widest">Section A: Leafy Greens</div>
                    <motion.div 
                      initial={{ height: '0%' }}
                      animate={{ height: '85%' }}
                      className="w-full bg-gradient-to-t from-primary-600/40 to-primary-400/20 rounded-xl border-t-2 border-primary-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover/shelf:text-white/40 transition-colors">Storage Alpha</span>
                    </div>
                  </div>

                  {/* Shelf 2 */}
                  <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col justify-end relative overflow-hidden group/shelf">
                    <div className="absolute top-2 right-4 text-[8px] font-black text-orange-500/40 uppercase tracking-widest">Section B: Perishables</div>
                    <motion.div 
                      initial={{ height: '0%' }}
                      animate={{ height: '45%' }}
                      className="w-full bg-gradient-to-t from-orange-600/40 to-orange-400/20 rounded-xl border-t-2 border-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover/shelf:text-white/40 transition-colors">Storage Beta</span>
                    </div>
                  </div>

                  {/* Shelf 3 */}
                  <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col justify-end relative overflow-hidden group/shelf">
                    <div className="absolute top-2 right-4 text-[8px] font-black text-blue-500/40 uppercase tracking-widest">Section C: Legumes</div>
                    <motion.div 
                      initial={{ height: '0%' }}
                      animate={{ height: '25%' }}
                      className="w-full bg-gradient-to-t from-blue-600/40 to-blue-400/20 rounded-xl border-t-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    ></motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover/shelf:text-white/40 transition-colors">Storage Gamma</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl p-4 rounded-[24px] border border-white/10 shadow-2xl">
                    <div className="p-3 bg-primary-500/20 rounded-2xl">
                      <Thermometer className="text-primary-400" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">Internal Temperature</p>
                      <p className="text-2xl font-black text-white">{current.temp} <span className="text-xs text-primary-400 font-bold ml-1 uppercase">Optimal</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid gap-6">
                <div className="flex items-start justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group/link">
                  <div className="flex items-start gap-5">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 ring-8 ring-primary-500/10"></div>
                    <div>
                      <p className="font-black text-xl leading-none mb-1">Fruits & Greens</p>
                      <p className="text-[11px] text-primary-400 font-bold uppercase tracking-widest">Fresh - 90% Yield Remaining</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNotify('Smart Fridge')}
                    className={cn(
                      "opacity-0 group-hover/link:opacity-100 transition-all px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                      notified.active && notified.item === 'Smart Fridge' ? "bg-primary-600 text-white opacity-100" : "bg-primary-600/20 text-primary-400"
                    )}
                  >
                    {notified.active && notified.item === 'Smart Fridge' ? "NOTIFIED" : "Notify Hub"}
                  </button>
                </div>
                <div className="flex items-start justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group/link">
                  <div className="flex items-start gap-5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 ring-8 ring-orange-500/10"></div>
                    <div>
                      <p className="font-black text-xl leading-none mb-1 text-white/90">Dairy & Perishables</p>
                      <p className="text-[11px] text-orange-400 font-bold uppercase tracking-widest">Expiry Alert - Notify NGO</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNotify('Campus Network')}
                    className={cn(
                      "opacity-0 group-hover/link:opacity-100 transition-all px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                      notified.active && notified.item === 'Campus Network' ? "bg-orange-600 text-white opacity-100" : "bg-orange-600/20 text-orange-400"
                    )}
                  >
                    {notified.active && notified.item === 'Campus Network' ? "NOTIFIED" : "Notify NGO"}
                  </button>
                </div>
                <div className="flex items-start justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group/link">
                  <div className="flex items-start gap-5">
                    <div className="w-2 h-2 bg-white/20 rounded-full mt-2 ring-8 ring-white/5"></div>
                    <div>
                      <p className="font-black text-xl leading-none mb-1 text-white/40">Grains & Legumes</p>
                      <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest">Level: 30% - Order Pending</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNotify('Hub Storage')}
                    className={cn(
                      "opacity-0 group-hover/link:opacity-100 transition-all px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                      notified.active && notified.item === 'Hub Storage' ? "bg-white text-slate-900 opacity-100" : "bg-white/10 text-white/40"
                    )}
                  >
                    {notified.active && notified.item === 'Hub Storage' ? "ORDERED" : "Send Order"}
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                   <Bell size={24} className={cn("absolute top-6 right-6 text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]", notified.active && "animate-bounce")} />
                   <div className="text-xs leading-relaxed text-slate-300 font-bold max-w-[85%]">
                     <span className="text-white font-black block mb-2 text-sm uppercase tracking-widest">
                       {notified.active ? "NEW NOTIFICATION:" : "Critical Notification:"}
                     </span>
                     {notified.active ? (
                       <p className="text-primary-400">Dispatching rescue team for {notified.item || 'All Priority Hubs'}. System sync in progress...</p>
                     ) : (
                       <p>NGO Helping Hands has been dispatched for Dairy collection. Estimated arrival at {region} Hub in 12 mins.</p>
                     )}
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle background decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-600/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Impact Banner Section */}
        <div className="bg-[#042411] rounded-[40px] overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center">
          {/* Child Image */}
          <div className="w-full md:w-1/3 h-64 md:h-80 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80" 
              alt="Child with meal" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
            />
          </div>

          <div className="flex-1 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            {/* Call to Action */}
            <div className="text-center md:text-left max-w-sm">
              <h2 className="text-white text-3xl font-black tracking-tight leading-none mb-2">ONE MEAL CAN<br /><span className="text-primary-500">SAVE A LIFE</span></h2>
              <p className="text-slate-300 text-[11px] font-bold leading-relaxed mb-8 opacity-80">Your small contribution can fill someone's stomach and bring a big smile.</p>
              <button 
                onClick={() => setPage('donate')}
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"
              >
                DONATE NOW <span className="text-lg">♡</span>
              </button>
            </div>

            {/* Your Impact Box */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 text-center backdrop-blur-md min-w-[200px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Impact</p>
              <p className="text-sm font-black text-white leading-tight mb-4 tracking-tighter">
                <span className="text-primary-400">₹100</span> can provide a<br />meal for 5 people
              </p>
              <div className="flex justify-center -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#042411] bg-slate-800 flex items-center justify-center">
                    <Users size={12} className="text-white/40" />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Mini Chart */}
            <div className="text-center md:text-left space-y-6 flex-grow max-w-md">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Our Impact So Far</p>
              <div className="grid grid-cols-4 gap-4 items-end h-24 mb-4">
                {[
                  { label: 'DELIVERED', val: '125K+', h: '60%' },
                  { label: 'PARTNERED', val: '230+', h: '40%' },
                  { label: 'TOUCHED', val: '85K+', h: '70%' },
                  { label: 'SAVED', val: '312+', h: '90%' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: stat.h }}
                      className="w-full bg-primary-600/30 border-t-4 border-primary-500 rounded-t-lg relative group"
                    >
                      <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </motion.div>
                    <div className="text-center">
                      <p className="text-[11px] font-black text-primary-400 leading-none">{stat.val}</p>
                      <p className="text-[7px] font-black text-slate-500 uppercase tracking-tighter mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="bg-white py-4 border-t border-slate-100">
        <PartnerCarousel />
      </div>
    </div>
  );
}
