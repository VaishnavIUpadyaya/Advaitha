"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#090a0c] text-white pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#b46247]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#b46247] to-[#d4846d] flex items-center justify-center font-bold text-white uppercase">
                A
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase font-[marcellus]">
                Advaitha
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Revolutionizing dermatological care through ethical AI and clinical data. 
              We empower you to understand the language of your skin.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-xs uppercase tracking-widest font-bold text-slate-500 hover:text-[#d4846d] transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#b46247] font-bold uppercase tracking-widest text-xs mb-8">Platform</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">AI Skin Scan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Personalized Routines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingredient Glossary</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Expert Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#b46247] font-bold uppercase tracking-widest text-xs mb-8">Science</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Clinical Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Encryption</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Derm-Approval Process</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#b46247] font-bold uppercase tracking-widest text-xs mb-8">Stay Informed</h4>
            <p className="text-slate-400 text-sm mb-4">Get skincare science tips in your inbox.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-[#b46247] transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-[#b46247] hover:bg-[#d4846d] text-white p-1.5 rounded-full transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div className="mt-8 pt-4">
              <p className="text-xs text-slate-500 font-medium">Support: support@advaitha.ai</p>
              <p className="text-xs text-slate-500 font-medium">Inquiries: hello@advaitha.ai</p>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-medium">
            © {currentYear} Advaitha AI. All Rights Reserved.
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 grayscale opacity-50 hover:opacity-100 transition-all duration-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Firebase Secure Server</span>
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">
              Terms of Service
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}