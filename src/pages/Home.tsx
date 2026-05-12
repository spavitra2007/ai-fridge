import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Refrigerator, ShieldCheck, Thermometer, Database, Mail, CheckCircle2 } from 'lucide-react';
import { PartnerCarousel } from '../components/PartnerCarousel';
import type { Page } from '../types';

function SubscribeForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  if (subscribed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-3 py-6 bg-primary-100 text-primary-900 rounded-[32px] font-black uppercase text-sm tracking-widest border-2 border-primary-200"
      >
        <CheckCircle2 size={24} /> SUBSCRIBED SUCCESSFULLY
      </motion.div>
    );
  }

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
      className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
    >
      <div className="flex-1 relative">
        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address" 
          className="w-full pl-14 pr-6 py-5 bg-white rounded-[24px] border-2 border-slate-100 focus:border-primary-500 outline-none font-bold text-slate-900 transition-all placeholder:text-slate-300"
        />
      </div>
      <button 
        type="submit"
        className="px-10 py-5 bg-primary-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
      >
        SUBSCRIBE
      </button>
    </form>
  );
}

interface HomeProps {
  setPage: (page: Page) => void;
}

export default function Home({ setPage }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-[#031309] rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
                AI-Powered Food Redistribution
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-[#192b0f] leading-[1.1]">
                FEED <span className="text-primary-600">COMMUNITY</span> <br />
                NOT LANDFILL
              </h1>
              
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                We use AI & smart refrigerators to rescue surplus food, ensure safety, and deliver it to people who need it the most. 
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setPage('impact')}
                  className="flex items-center gap-2 px-10 py-5 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-200 hover:bg-primary-700 hover:-translate-y-1 transition-all"
                >
                  View Impact
                  <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setPage('donate')}
                  className="flex items-center gap-2 px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  <Heart size={20} fill="currentColor" className="text-primary-600" />
                  Donate
                </button>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center gap-8 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
                    <Database size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Food Saved</p>
                    <p className="text-2xl font-black text-slate-900">1,245 <span className="text-sm font-bold text-slate-500">Meals</span></p>
                  </div>
                </div>
                <div className="w-[1px] h-12 bg-slate-200"></div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Impact Created</p>
                   <p className="text-2xl font-black text-slate-900">Daily</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visuals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative pr-8 md:pr-12"
            >
              {/* Main Image */}
              <div className="relative z-10 w-full max-w-[650px] mx-auto">
                <img 
                  src="src/assets/images/regenerated_image_1778587139002.jpg" 
                  alt="Smart Refrigerator with fresh produce" 
                  className="rounded-[40px] shadow-2xl w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Journey */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-black text-primary-900 uppercase tracking-tight">Your Donation Journey</h2>
            <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { 
                step: '01', 
                title: 'Food Collected', 
                desc: 'Surplus food is collected from homes, restaurants, and events.',
                img: 'src/assets/images/regenerated_image_1778584131518.png'
              },
              { 
                step: '02', 
                title: 'Mapped & Routed', 
                desc: 'Our AI system maps the best routes to distribution centers.',
                img: 'src/assets/images/regenerated_image_1778584133729.png'
              },
              { 
                step: '03', 
                title: 'AI-Powered Fridge', 
                desc: 'Food is safely stored in smart fridges that monitor freshness.',
                img: 'src/assets/images/regenerated_image_1778569592777.jpg'
              },
              { 
                step: '04', 
                title: 'Distributed to NGOs', 
                desc: 'Verified NGOs collect and distribute food to those in need.',
                img: 'src/assets/images/regenerated_image_1778569596182.jpg'
              },
              { 
                step: '05', 
                title: 'Impact Created', 
                desc: 'Nutritious meals reach people, creating brighter futures.',
                img: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=300&h=400&fit=crop&q=80'
              }
            ].map((item, idx, array) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="mb-4 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-primary-600 text-white flex items-center justify-center rounded-full font-black text-sm border-4 border-white shadow-lg">
                    {item.step}
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-black text-primary-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed px-2">{item.desc}</p>
                </div>
                {idx < array.length - 1 && (
                  <div className="hidden md:block absolute top-[40%] -right-4 z-10 text-primary-600">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartnerCarousel />

      {/* Subscribe Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter border border-[#031802] p-4 rounded-2xl">STAY <span className="text-primary-600">CONNECTED.</span></h2>
            <p className="text-slate-500 font-medium text-lg">Join 5,000+ hunger heroes receiving weekly impact reports and rescue alerts.</p>
            
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-950 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format&fit=crop&q=80" 
            alt="Smiling children" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                ONE MEAL CAN <br />
                <span className="text-primary-500">SAVE A LIFE</span>
              </h2>
              <p className="text-primary-100/70 text-lg leading-relaxed max-w-lg">
                Your small contribution can fill someone's stomach and bring a big smile. Every contribution is tracked AI-logs.
              </p>
              <button 
                onClick={() => setPage('donate')}
                className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-950 hover:bg-primary-500 transition-all"
              >
                DONATE NOW
                <Heart size={20} fill="currentColor" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-primary-500 font-black text-3xl mb-1">125K+</p>
                <p className="text-primary-200/50 text-xs font-bold uppercase tracking-widest">Meals Delivered</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-primary-500 font-black text-3xl mb-1">230+</p>
                <p className="text-primary-200/50 text-xs font-bold uppercase tracking-widest">NGOs Partnered</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-primary-500 font-black text-3xl mb-1">85K+</p>
                <p className="text-primary-200/50 text-xs font-bold uppercase tracking-widest">Lives Touched</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-primary-500 font-black text-3xl mb-1">312+</p>
                <p className="text-primary-200/50 text-xs font-bold uppercase tracking-widest">Food Saved (Tons)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
