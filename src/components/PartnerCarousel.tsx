import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const partners = [
  { name: 'Akshaya Patra', logo: 'src/assets/images/regenerated_image_1778569591207.jpg', label: 'Akshaya Patra' },
  { name: 'Feeding India', logo: 'src/assets/images/regenerated_image_1778569594743.jpg', label: 'Feeding India' },
  { name: 'Smile Foundation', logo: 'src/assets/images/regenerated_image_1778573522553.jpg', label: 'Smile Foundation' },
  { name: 'Robin Hood Army', logo: 'src/assets/images/regenerated_image_1778573524276.jpg', label: 'Robin Hood Army' },
  { name: 'Help Foundation', logo: 'src/assets/images/regenerated_image_1778573527406.jpg', label: 'Help Foundation' },
  { name: 'Goonj', logo: 'src/assets/images/regenerated_image_1778573528531.jpg', label: 'Goonj' },
];

export function PartnerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-20 border-y border-slate-100 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.05),transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto px-4 overflow-hidden relative z-10 group">
        <h3 className="text-center text-primary-900 font-black uppercase tracking-[0.3em] text-2xl mb-12 flex items-center justify-center gap-4">
          <span className="w-12 h-[2px] bg-primary-600/30"></span>
          Our Support Partners
          <span className="w-12 h-[2px] bg-primary-600/30"></span>
        </h3>
        
        <div 
          ref={scrollRef}
          className="flex items-center gap-8 md:gap-16 lg:gap-24 overflow-x-auto no-scrollbar py-6 px-8"
        >
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-white border border-slate-200 rounded-full shadow-2xl text-slate-900 hover:bg-primary-600 hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={28} />
          </button>
          
          <div className="flex shrink-0 items-center gap-12 md:gap-20">
            {partners.map((partner, idx) => (
              <div key={idx} className="flex flex-col items-center gap-6 transition-all cursor-pointer min-w-[150px] group/item">
                <div className="bg-white rounded-[40px] flex items-center justify-center border-4 border-slate-50 shadow-xl overflow-hidden group-hover/item:border-primary-500/50 transition-all hover:scale-105 duration-300 h-[180px] w-[180px] p-6">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-[12px] font-black text-slate-500 group-hover/item:text-primary-600 uppercase tracking-[0.3em] text-center max-w-[140px] transition-colors">{partner.label}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-white border border-slate-200 rounded-full shadow-2xl text-slate-900 hover:bg-primary-600 hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
