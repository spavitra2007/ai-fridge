import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, CreditCard, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Page } from '../types';

export default function Donate({ setPage }: { setPage: (page: Page) => void }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('500');

  const amounts = ['100', '500', '1000', '2000'];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-40 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
           <div className="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl mb-6">
              <Heart size={40} fill="currentColor" />
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tight">SAVE A SOUL TODAY</h1>
           <p className="text-slate-500 font-medium">Your contribution directly funds the AI-logistics that rescue food for the needy.</p>
        </div>

        <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl border border-slate-100 flex flex-col items-center">
           {step === 1 ? (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="w-full space-y-12"
             >
                <div className="space-y-6">
                   <p className="text-xs font-black text-primary-600 uppercase tracking-widest text-center">Select Donation Amount</p>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {amounts.map(a => (
                        <button
                          key={a}
                          onClick={() => setAmount(a)}
                          className={`py-6 rounded-3xl font-black text-2xl transition-all ${amount === a ? 'bg-primary-600 text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                          ₹{a}
                        </button>
                      ))}
                   </div>
                   <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">₹</span>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Custom Amount" 
                        className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-500 outline-none font-black text-xl text-slate-900 transition-all shadow-inner"
                      />
                   </div>
                </div>

                <div className="bg-primary-50 p-8 rounded-[32px] border border-primary-100 text-center space-y-2">
                   <p className="text-primary-900 font-black text-lg uppercase tracking-tight">Impact estimation</p>
                   <p className="text-primary-600 font-medium italic">₹{amount} can provide roughly {Math.floor(Number(amount) / 20)} full nutritious meals.</p>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3"
                >
                  CONTINUE TO PAYMENT <ArrowRight size={20} />
                </button>
             </motion.div>
           ) : step === 2 ? (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="w-full space-y-10 text-center"
             >
                <p className="text-xs font-black text-primary-600 uppercase tracking-widest">Select Payment Method</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <button className="flex items-center gap-6 p-8 bg-slate-50 rounded-[32px] border-2 border-transparent hover:border-primary-500 transition-all group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <CreditCard size={28} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-slate-900 uppercase tracking-tight leading-none mb-1">Debit/Credit Card</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Secured by Razorpay</p>
                      </div>
                   </button>
                   <button className="flex items-center gap-6 p-8 bg-slate-50 rounded-[32px] border-2 border-transparent hover:border-primary-500 transition-all group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <Smartphone size={28} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-slate-900 uppercase tracking-tight leading-none mb-1">UPI / Wallet</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Safe & Instant</p>
                      </div>
                   </button>
                </div>

                <div className="pt-8 flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    GO BACK
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-[2] py-5 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-500 transition-all shadow-xl shadow-primary-200"
                  >
                    PAY ₹{amount} NOW
                  </button>
                </div>
             </motion.div>
           ) : (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full text-center space-y-8"
             >
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto">
                   <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Payment Successful</h2>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto">Thank you for being a hero. Your donation has been logged in our AI impact ledger.</p>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => setPage('home')}
                    className="px-12 py-5 bg-primary-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                  >
                    RETURN TO HOME
                  </button>
                </div>
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
}
