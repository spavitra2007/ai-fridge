import { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, Refrigerator, ShieldCheck, Users, GraduationCap, Utensils, Sprout, ArrowRight, Activity, ChevronDown } from 'lucide-react';
import { PartnerCarousel } from '../components/PartnerCarousel';
import type { Page } from '../types';
import { cn } from '../lib/utils';

interface ProgramsProps {
  setPage: (page: Page) => void;
}

export default function Programs({ setPage }: ProgramsProps) {
  const [region, setRegion] = useState<'Kodikulam' | 'Othakadai'>('Kodikulam');
  const [showDropdown, setShowDropdown] = useState(false);

  const liveTicker = [
    { loc: 'DELHI CAMPUS', stats: '30 Meals Collected', time: 'Just now' },
    { loc: 'MADURAI CAMPUS', stats: '50 Meals Collected', time: '2 mins ago' },
    { loc: 'CHENNAI', stats: 'NGO Sanjivani Accepted', time: '5 mins ago' },
    { loc: 'BANGALORE', stats: 'Akshaya Patra Accepted', time: '10 mins ago' },
  ];

  const kodikulamStats = {
    fridge: '4°C',
    safety: '98%',
    active: 12,
    status: 'Optimal'
  };

  const othakadaiStats = {
    fridge: '3.8°C',
    safety: '99%',
    active: 8,
    status: 'Excellence'
  };

  const currentStats = region === 'Kodikulam' ? kodikulamStats : othakadaiStats;


  const activities = [
    { 
      img: '/images/regenerated_image_1778586985136.jpg',
      tag: 'Verified NGO',
      title: 'Helping Hands Chennai',
      desc: '25 meals dispatched'
    },
    { 
      img: '/images/regenerated_image_1778587139002.jpg',
      tag: "NGO 'Kiran Foundation'",
      title: 'Hyderabad Hub',
      desc: '40 meals distributed'
    },
    { 
      img: '/images/regenerated_image_1778586987689.jpg',
      tag: 'Verified Restaurant',
      title: "Saffron Spoon Bangalore",
      desc: '60 meals collected'
    },
  ];

  const programCards = [
    {
      img: '/images/regenerated_image_1778586989432.jpg',
      color: 'bg-primary-600',
      title: 'Campus Fridge',
      location: 'Delhi/Kodikulam'
    },
    {
      img: '/images/regenerated_image_1778586990789.jpg',
      color: 'bg-orange-500',
      title: 'Restaurant Partners',
      location: 'Verified Safety'
    },
    {
      img: '/images/regenerated_image_1778586992508.jpg',
      color: 'bg-blue-600',
      title: 'Community Fridges',
      location: 'Kodikulam/Anna Nagar'
    },
    {
      img: '/images/regenerated_image_1778586993833.jpg',
      color: 'bg-green-600',
      title: 'CSR Partnership',
      location: 'Corporate Surplus'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Expanded Live Logistics Ticker */}
      <div className="bg-primary-900 py-10 overflow-hidden border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.15),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 mb-8 flex items-center justify-between relative z-10">
          <h2 className="text-white text-3xl font-black flex items-center gap-4 tracking-tighter">
            <Truck className="text-primary-400" size={40} />
            LIVE LOGISTICS TRACKER
          </h2>
          <div className="px-5 py-2 bg-white/10 rounded-full border border-white/20 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]"></div>
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Global Sync Active</span>
          </div>
        </div>
        
        <div className="flex animate-scroll whitespace-nowrap gap-8 px-4 relative z-10">
          {[...liveTicker, ...liveTicker].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-6 bg-white/10 border border-white/20 rounded-[32px] p-8 min-w-[380px] backdrop-blur-xl">
              <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-400 border border-primary-500/20">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-xs font-black text-primary-400 uppercase tracking-[0.2em] mb-1">{item.loc} • {item.time}</p>
                <p className="text-white font-black text-xl tracking-tight leading-none">{item.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className="relative aspect-video">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-primary-600/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider">
                  {item.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-indigo-950 text-lg mb-1">{item.title}</h3>
                <p className="text-primary-600 font-bold text-sm tracking-tight">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Significantly Larger Dispatcher Note */}
        <div className="mt-12 bg-primary-900 border-white/20 border p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.15),transparent)] pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-8">
            <div className="w-20 h-20 bg-primary-500 rounded-[28px] flex items-center justify-center text-white shadow-2xl shadow-primary-900 group-hover:scale-110 transition-transform">
              <Activity size={40} />
            </div>
            <div>
              <p className="text-primary-400 font-black text-xs uppercase tracking-[0.3em] mb-2">Dispatcher Protocol Active</p>
              <h4 className="text-white text-3xl font-black tracking-tighter leading-none mb-2">
                "AI routing complete for NGO 'Sanjivani' Bangalore (est 15 mins)."
              </h4>
              <p className="text-primary-100/60 font-medium text-lg">Smart logistics optimized for maximum freshness and zero-waste delivery.</p>
            </div>
          </div>
          
          <div className="w-full md:w-64 h-3 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="h-full bg-primary-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]"
            />
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-slate-900 mb-12">Our Programs</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {programCards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setPage('detail')}
                className="group cursor-pointer"
              >
                <div className="bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:border-primary-100 hover:shadow-2xl hover:shadow-primary-100 transition-all duration-300 relative overflow-hidden h-full flex flex-col group">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-black text-white mb-1 leading-tight">{card.title}</h3>
                      <p className="text-primary-400 font-bold text-xs uppercase tracking-widest">{card.location}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-primary-600 font-bold text-xs tracking-widest uppercase">
                        Learn More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Region Status Bar - Bigger & Functional Dropdown */}
          <div className="mt-24 p-2 bg-primary-900 rounded-[48px] overflow-hidden relative border border-white/20 group">
             <div className="absolute inset-0 bg-primary-800/40 backdrop-blur-3xl"></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-500 text-white px-4 py-2 rounded-2xl text-xs uppercase font-black tracking-[0.3em] flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                      LIVE STATUS
                    </div>
                    <div className="relative">
                      <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="text-4xl md:text-5xl font-black text-white hover:text-primary-400 transition-colors tracking-tighter flex items-center gap-4"
                      >
                        {region === 'Kodikulam' ? 'LIVE: KODIKULAM REGION' : 'LIVE: OTHAKADAI REGION'}
                        <ChevronDown size={32} className={cn("transition-transform", showDropdown && "rotate-180")} />
                      </button>
                      
                      {showDropdown && (
                        <div className="absolute top-full left-0 mt-4 w-96 bg-primary-800/95 backdrop-blur-2xl border border-white/20 rounded-[32px] p-4 shadow-3xl z-50">
                          {['Kodikulam', 'Othakadai'].map((r) => (
                            <button
                              key={r}
                              onClick={() => { setRegion(r as any); setShowDropdown(false); }}
                              className={cn(
                                "w-full text-left p-6 rounded-2xl font-black text-xl tracking-tight transition-all mb-2 last:mb-0",
                                region === r ? "bg-primary-600 text-white" : "text-white/40 hover:bg-white/10 hover:text-white"
                              )}
                            >
                              {r} Region
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-primary-100/60 font-bold text-lg uppercase tracking-[0.2em]">Community Fridge Network Telemetry</p>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                  <div className="text-center md:text-left bg-white/10 p-6 rounded-[32px] border border-white/10">
                    <p className="text-primary-400/80 text-[10px] font-black uppercase tracking-widest mb-1">Avg Temp</p>
                    <p className="text-3xl font-black text-white">{currentStats.fridge}</p>
                    <p className="text-[10px] font-bold text-primary-400 uppercase mt-1">{currentStats.status}</p>
                  </div>
                  <div className="text-center md:text-left bg-white/10 p-6 rounded-[32px] border border-white/10">
                    <p className="text-orange-400/80 text-[10px] font-black uppercase tracking-widest mb-1">Safety Index</p>
                    <p className="text-3xl font-black text-white">{currentStats.safety}</p>
                    <p className="text-[10px] font-bold text-orange-400 uppercase mt-1">Tier 1 Rating</p>
                  </div>
                  <div className="text-center md:text-left bg-white/10 p-6 rounded-[32px] border border-white/10">
                    <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-1">Active Fridges</p>
                    <p className="text-3xl font-black text-white">{currentStats.active}</p>
                    <p className="text-[10px] font-bold text-blue-300 uppercase mt-1">Nodes Active</p>
                  </div>
                  <div className="text-center">
                    <button 
                      onClick={() => setPage('detail')}
                      className="w-full h-full bg-white text-slate-950 rounded-[32px] font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-primary-950/20 flex flex-col items-center justify-center p-6"
                    >
                      <span>VIEW DETAILED</span>
                      <span className="text-primary-600 group-hover:text-inherit">DASHBOARD</span>
                      <ArrowRight size={20} className="mt-2" />
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <PartnerCarousel />
    </div>
  );
}
