import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Utensils, TrendingUp, Users, ArrowRight, ShieldCheck, 
  Globe, PlayCircle, Upload, BookOpen, 
  X, Truck, Zap, Cloud, Navigation, Home, ChevronDown, Activity, Landmark, CheckCircle2, Building2, LayoutGrid, Sparkles, Send, Loader2
} from 'lucide-react';
import { PartnerCarousel } from '../components/PartnerCarousel';
import type { Page } from '../types';
import { cn } from '../lib/utils';
import { getFoodSavingTips } from '../lib/gemini';

interface ImpactProps {
  setPage: (page: Page) => void;
}

export default function Impact({ setPage }: ImpactProps) {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      id: 1,
      title: 'The Midnight Rescue',
      desc: 'Against all odds, we rescued 500 gourmet meals from a last-minute cancellation, turning potential waste into a midnight miracle for three local shelters.',
      fullStory: `It was 11:30 PM on a rainy Tuesday when the alert hit our system. A five-star luxury hotel in the heart of the city had a massive event cancellation due to weather. Five hundred high-quality, gourmet meals—carefully prepared and ready for service—were about to be destined for the bin.\n\nIn the past, this high-quality food would have been discarded. But with our real-time "Rescue Response" protocol, the miracle began. Within 15 minutes, three of our vetted NGO partners were mobilized. Two refrigerated trucks were dispatched to the hotel loading bay.\n\nBy 2:00 AM, the food was safely stored in local community hubs. By 7:00 AM, it was being served as a hot, nutritious breakfast to families who hadn't seen a gourmet meal in years. This single operation saved over 200kg of food, preventing massive methane emissions and proving that with the right technology, no meal is ever truly lost.`,
      stat: '500+ Meals Saved',
      img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80',
      span: 'lg:col-span-2 col-span-1'
    },
    {
      id: 2,
      title: 'Campus Heroes: Kodikulam',
      desc: 'A student-led revolution in Kodikulam reduced waste by 40%, proving that the next generation holds the key to a zero-hunger future.',
      fullStory: `The students at the Kodikulam Student Collective decided that "good enough" wasn't enough. They didn't just want to distribute surplus; they wanted to eliminate the concept of waste entirely. Their "Clean Plate" initiative turned the university dining hall into a living laboratory for behavioral science.\n\nThey installed digital scales integrated with our platform, allowing every student to see the physical and nutritional cost of what they left on their plate. The competition became fierce. Groups vied for the "Zero Waste Trophy," but the real winners were outside the campus walls.\n\nWithin the first semester, plate waste dropped by a staggering 40%. The university, seeing the massive cost savings, partnered with us to channel those funds into regional "Hub Expansion," buying ten new Smart Fridges for marginalized neighborhoods. It's living proof that small individual choices, when scaled through technology, can change the world.`,
      stat: '40% Waste Reduction',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      span: 'col-span-1'
    },
    {
      id: 3,
      title: 'AI in Action: Bangalore',
      desc: 'Predictive intelligence met on-ground urgency in Bangalore, saving 150kg of perishables before they even reached the expiration point.',
      fullStory: `Bangalore traffic is legendary for stopping logistics in its tracks. To save perishables, we had to stop reacting and start predicting. Our Gemini-powered AI model analyzed historical sales data and current footfall at Saffron Spoon Bangalore, flagging a potential 15% dairy surplus four hours before the restaurant even closed.\n\nInstead of a frantic late-night scramble, our system pre-registered the "Expected Surplus" and dispatched a specialized courier to wait within a 1km radius by 8:00 PM. When the restaurant confirmed the surplus, the pickup was instantaneous.\n\nThe food reached a local vocational training center while still at peak freshness, providing an incredible dinner for 80 students working towards their certifications. This isn't just about saving food; it's about using the most advanced human technology to fulfill the most basic human need.`,
      stat: '150kg Prevented',
      img: 'src/assets/images/regenerated_image_1778588438412.jpg',
      span: 'col-span-1'
    },
    {
      id: 4,
      title: 'Zero-Waste Wedding',
      desc: 'The Raghavan family turned their celebration into a legacy, sparking a new trend of "Compassionate Catering" that fed over 800 people.',
      fullStory: `Traditional weddings are often synonymous with excess, but the Raghavan family wanted their new beginning to be a source of life for their entire community. They utilized our "Celebration Portal" to map their guest list against a data-backed portioning strategy.\n\nEven with careful planning, weddings produce surplus. Instead of the usual waste, the Raghavans had three local volunteers integrated into their wedding workflow. As the reception wound down, the volunteers were already packaging high-quality festive meals into our insulated, tracked containers.\n\nOver 800 portions of fresh, delicious wedding food—from aromatic biryanis to traditional sweets—were delivered across four community hubs. The family didn't just walk away with memories; they walked away with a digital Impact Map showing the exact locations of every person their celebration fed.`,
      stat: '850 Happy Smiles',
      img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
      span: 'lg:col-span-2 col-span-1'
    }
  ];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToStories = () => {
    storiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Dynamic Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-primary-950">
        <AnimatePresence mode="wait">
          <motion.img 
            key={heroImage || 'default'}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            src={heroImage || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&auto=format&fit=crop&q=80"} 
            alt="Impact Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 max-w-4xl"
            >
               <div 
                 onClick={() => setPage('detail')}
                 className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-all"
               >
                 <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Transparency Dashboard</span>
               </div>
               
               <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                 SEE THE IMPACT <br />
                 <span className="text-primary-500 font-serif italic">IN REAL TIME.</span>
               </h1>

               <p className="text-primary-100/70 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                 We transform surplus into smiles. Every byte of data represents a meal rescued and a family fed.
               </p>

               <div className="flex flex-wrap justify-center gap-6 pt-8">
                 <button 
                  onClick={() => setPage('home')}
                  className="px-10 py-5 bg-white text-primary-950 rounded-[28px] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-primary-500 hover:text-white transition-all active:scale-95 shadow-2xl"
                 >
                   <Home size={18} /> BACK TO HOME
                 </button>
                 <button 
                  onClick={scrollToStories}
                  className="px-10 py-5 bg-primary-600 text-white rounded-[28px] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-primary-500 transition-all active:scale-95 shadow-xl shadow-primary-900/40"
                 >
                   DISCOVER STORIES <ChevronDown size={18} />
                 </button>
                 
                 <div className="w-full flex justify-center mt-6">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
                    >
                      <Upload size={14} className="group-hover:translate-y-[-2px] transition-transform" /> 
                      UPLOAD YOUR PHOTO
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Summary Bar */}
      <div className="bg-white border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Meals Saved', val: '1.2M', color: 'text-primary-600' },
            { label: 'Families Fed', val: '85K', color: 'text-slate-900' },
            { label: 'CO2 Prevented', val: '420t', color: 'text-slate-900' },
            { label: 'Active Hubs', val: '112', color: 'text-slate-900' },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-3">
              <p className={cn("text-5xl font-black tracking-tighter", stat.color)}>{stat.val}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stories Grid */}
      <section ref={storiesRef} className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-sm font-black text-primary-600 uppercase tracking-[0.4em] mb-4">Direct Impact</h2>
            <p className="text-6xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter uppercase">OUR STORIES</p>
            <div className="w-24 h-2.5 bg-primary-500 rounded-full"></div>
          </div>
          <button 
            onClick={() => window.open('https://www.youtube.com/watch?v=pAnVee9S4Dk', '_blank')}
            className="group flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-all shadow-2xl active:scale-95"
          >
            WATCH OUR NGO PARTNERS
            <PlayCircle size={20} className="text-primary-500 group-hover:text-white transition-colors" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "bg-white rounded-[60px] p-2 shadow-2xl border border-slate-100 overflow-hidden group hover:-translate-y-4 transition-all duration-700",
                story.span
              )}
            >
              <div className="flex flex-col h-full bg-white rounded-[52px] overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                   <img 
                    src={story.img} 
                    alt={story.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    referrerPolicy="no-referrer" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/10 to-transparent"></div>
                   <div className="absolute bottom-6 left-8">
                      <div className="px-5 py-2 bg-primary-500 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {story.stat}
                      </div>
                   </div>
                </div>
                <div className="p-10 md:p-12 flex flex-col flex-grow">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight group-hover:text-primary-600 transition-colors uppercase tracking-tight">{story.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-10 flex-grow font-medium line-clamp-3">
                    {story.desc}
                  </p>
                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                     <button 
                        onClick={() => setSelectedStory(story)}
                        className="group/btn flex items-center gap-3 text-xs font-black text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-widest"
                     >
                       <BookOpen size={18} className="group-hover/btn:scale-110 transition-transform" /> READ THE BLOG STORY
                     </button>
                     <div 
                        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all cursor-pointer"
                        onClick={() => setPage('detail')}
                      >
                       <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Submission / Write a Blog Entry */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
               {/* Left side: Content */}
               <div className="lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                     <p className="text-primary-600 text-xs font-black uppercase tracking-[0.5em]">Be Heard</p>
                     <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-none tracking-tighter">SHARE YOUR <br /><span className="text-primary-500 font-serif italic">JOURNEY.</span></h2>
                  </div>
                  <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">
                    Every rescue has a story. Whether you're a donor, a volunteer, or a partner, your words can inspire a movement. Write your own blog entry and join our wall of impact.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                     <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-4">
                           <BookOpen size={20} />
                        </div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Impact Blogging</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Share deep insights</p>
                     </div>
                     <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-4">
                           <Globe size={20} />
                        </div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Global Reach</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inspire the world</p>
                     </div>
                  </div>
               </div>

               {/* Right side: Interactive Form Card */}
               <div className="lg:w-1/2 w-full">
                  <div className="bg-slate-900 rounded-[50px] p-10 md:p-14 shadow-3xl text-white relative overflow-hidden group">
                     {/* Decorative element */}
                     <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/20 transition-colors"></div>
                     
                     <div className="space-y-8 relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center">
                              <Heart size={24} fill="currentColor" />
                           </div>
                           <h3 className="text-2xl font-black">Inspired by stories?</h3>
                        </div>
                        <p className="text-slate-400 font-medium">You can be part of the next big rescue. Join our mission as a donor or volunteer.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <button 
                              onClick={() => setPage('donate')}
                              className="py-5 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-500 transition-all shadow-xl shadow-primary-900/20 flex items-center justify-center gap-3 active:scale-95"
                           >
                              <Heart size={18} fill="currentColor" /> DONATE NOW
                           </button>
                           <button 
                              onClick={() => setPage('programs')}
                              className="py-5 bg-white/10 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                           >
                              <LayoutGrid size={18} /> VIEW PROGRAMS
                           </button>
                        </div>
                        
                        <div className="pt-8 border-t border-white/5">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">WRITE YOUR ENTRY</p>
                           <AnimatePresence mode="wait">
                              {!published ? (
                                <motion.form 
                                  key="form"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="space-y-6" 
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    setPublished(true);
                                    setTimeout(() => setPublished(false), 5000);
                                  }}
                                >
                               <div className="space-y-2">
                                  <input 
                                     type="text" 
                                     placeholder="Story Title" 
                                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500 transition-colors font-bold"
                                     required
                                  />
                               </div>
                               <textarea 
                                  placeholder="Tell us your story..." 
                                  rows={3}
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500 transition-colors font-medium resize-none"
                                  required
                               ></textarea>
                               <button 
                                  type="submit"
                                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                               >
                                  PUBLISH BLOG
                               </button>
                            </motion.form>
                              ) : (
                                <motion.div 
                                  key="success"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-primary-900/50 border border-primary-500/30 p-8 rounded-[32px] text-center space-y-4"
                                >
                                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={24} className="text-white" />
                                  </div>
                                  <h4 className="text-xl font-black text-white uppercase tracking-tight">STORY PUBLISHED!</h4>
                                  <p className="text-xs font-bold text-primary-400 uppercase tracking-widest">Verify in "Our Stories" section shortly.</p>
                                </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Blog Expansion Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setSelectedStory(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="relative w-full max-w-6xl h-fit max-h-[95vh] bg-white rounded-[60px] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-10 right-10 z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-50 transition-colors group"
              >
                <X size={24} className="text-slate-950 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="lg:w-2/5 h-80 lg:h-auto relative overflow-hidden">
                <img src={selectedStory.img} alt={selectedStory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent flex flex-col justify-end p-12">
                   <div className="px-6 py-2.5 bg-primary-500 rounded-full w-fit text-[10px] font-black uppercase text-white tracking-widest mb-6 shadow-xl leading-none">
                     {selectedStory.stat}
                   </div>
                   <h3 className="text-2xl font-black text-white/50 leading-none uppercase tracking-widest">Story Brief</h3>
                </div>
              </div>

              <div className="lg:w-3/5 p-10 md:p-20 overflow-y-auto custom-scrollbar">
                <p className="text-primary-600 text-[10px] font-black uppercase tracking-[0.6em] mb-6">Verified Digital Journey</p>
                <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[0.9] mb-12 uppercase tracking-tighter line-clamp-2">{selectedStory.title}</h2>
                <div className="prose prose-slate max-w-none">
                   {selectedStory.fullStory.split('\n\n').map((para: string, i: number) => (
                     <p key={i} className="text-slate-600 text-xl leading-relaxed font-medium mb-8">
                       {para}
                     </p>
                   ))}
                </div>
                
                <div className="mt-16 pt-16 border-t border-slate-100 flex flex-wrap gap-10">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-primary-50 rounded-[20px] flex items-center justify-center text-primary-600 shadow-sm">
                         <ShieldCheck size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Verification</p>
                        <p className="text-sm font-black text-slate-950 uppercase">Secured by Razorpay</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-orange-50 rounded-[20px] flex items-center justify-center text-orange-600 shadow-sm">
                         <Globe size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Global Score</p>
                        <p className="text-sm font-black text-slate-950 uppercase">Zero-Waste Tier 1</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PartnerCarousel />

      {/* AI Assistant Section */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full">
                  <Sparkles size={14} className="text-primary-400" />
                  <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Powered by Gemini AI</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">SMART FOOD <br /><span className="text-primary-500 font-serif italic">ADVISOR.</span></h2>
              </div>
              
              <p className="text-primary-100/60 text-xl font-medium leading-relaxed max-w-xl">
                Stuck with surplus? Ask our advanced AI for the best redistribution strategy, safety tips, or creative ways to repurpose food before it expires.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/40">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Zap size={18} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest">Real-time local insights</p>
                </div>
                <div className="flex items-center gap-4 text-white/40">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest">Safety-first protocols</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[48px] p-8 md:p-12 shadow-3xl">
                <div className="space-y-8">
                  <div className="relative">
                    <textarea 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="e.g., 'I have 10kg of leftover cooked rice from an event. How should I store it safely for donation?'"
                      className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-500 transition-all font-medium resize-none text-lg"
                    />
                    <button 
                      onClick={async () => {
                        if (!aiQuery.trim()) return;
                        setIsAiLoading(true);
                        const res = await getFoodSavingTips(aiQuery);
                        setAiResponse(res);
                        setIsAiLoading(false);
                      }}
                      disabled={isAiLoading || !aiQuery.trim()}
                      className="absolute bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center hover:bg-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary-950/40"
                    >
                      {isAiLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {aiResponse && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-primary-500/10 border border-primary-500/20 rounded-3xl p-8 space-y-4"
                      >
                        <div className="flex items-center gap-3 text-primary-400">
                          <Sparkles size={18} />
                          <span className="text-xs font-black uppercase tracking-widest">AI Recommendation</span>
                        </div>
                        <div className="text-primary-50 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                          {aiResponse}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!aiResponse && !isAiLoading && (
                    <div className="flex flex-wrap gap-3">
                      {['Storage tips', 'Donation locations', 'Repurposing ideas'].map((label) => (
                        <button 
                          key={label}
                          onClick={() => setAiQuery(prev => prev + (prev ? ' ' : '') + label)}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest transition-all"
                        >
                          + {label}
                        </button>
                      ))}
                    </div>
                  )}
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
