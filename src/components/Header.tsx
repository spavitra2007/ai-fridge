import { Heart, Search, Menu, X, Landmark, Users, Home, BarChart3, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import type { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export function Header({ currentPage, setPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'programs', label: 'Programs', icon: LayoutGrid },
    { id: 'detail', label: 'Program Detail', icon: Search },
    { id: 'donate', label: 'Donate', icon: Heart },
    { id: 'impact', label: 'Impact/About', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setPage('home')}
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <img 
                src="src/assets/images/regenerated_image_1778569588633.jpg" 
                alt="End Poverty Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">NourishNet</h1>
              <p className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em]">pavitrasubramanian</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id as Page)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  currentPage === item.id 
                    ? "bg-primary-600 text-white shadow-md shadow-primary-200" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id as Page);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    currentPage === item.id 
                      ? "bg-primary-50 text-primary-600" 
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button 
                  onClick={() => setPage('donate')}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-primary-200"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
