import { Landmark, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import type { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export function Footer({ setPage }: FooterProps) {
  const sections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', id: 'home' },
        { label: 'Programs', id: 'programs' },
        { label: 'Donate', id: 'donate' },
        { label: 'Impact', id: 'impact' },
        { label: 'About Us', id: 'impact' },
      ]
    },
    {
      title: 'Programs',
      links: [
        { label: 'Campus Fridge', id: 'detail' },
        { label: 'Restaurant Partners', id: 'detail' },
        { label: 'Community Support', id: 'detail' },
        { label: 'CSR Partnership', id: 'detail' },
        { label: 'Emergency Relief', id: 'detail' },
      ]
    }
  ];

  const social = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-primary-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setPage('home')}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg p-1">
                <img 
                  src="https://images.unsplash.com/photo-1599305090598-fe179d501c27?w=100&q=80" 
                  alt="End Poverty Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">NourishNet</h1>
                <p className="text-[10px] text-primary-400 font-semibold uppercase tracking-wider">Delivering Hope</p>
              </div>
            </div>
            <p className="text-primary-200/80 text-sm leading-relaxed max-w-xs">
              Using AI & technology to reduce food waste and fight hunger by redistributing surplus meals to those in need.
            </p>
            <div className="flex gap-4">
              {social.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button 
                      onClick={() => setPage(link.id as Page)}
                      className="text-primary-200/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Get In Touch</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-primary-200/70 text-sm">
                <Mail size={16} className="text-primary-500" />
                hello@nourishnet.org
              </li>
              <li className="flex items-center gap-3 text-primary-200/70 text-sm">
                <Phone size={16} className="text-primary-500" />
                +91 90255 48932
              </li>
              <li className="flex items-center gap-3 text-primary-200/70 text-sm">
                <MapPin size={16} className="text-primary-500" />
                Bangalore, India
              </li>
            </ul>
            <h3 className="font-bold text-sm uppercase tracking-widest text-primary-500 mb-4">Newsletter</h3>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button className="w-full mt-2 bg-primary-600 hover:bg-primary-500 transition-colors text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-950">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-400 text-xs">
            © 2024 NourishNet. All rights reserved.
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600/50">
            pavitrasubramanian
          </p>
        </div>
      </div>
    </footer>
  );
}
