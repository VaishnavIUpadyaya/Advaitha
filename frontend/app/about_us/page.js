"use client";

import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const testimonials = [
  {
    name: "Sarah J.",
    skinType: "Sensitive Skin",
    quote: "Advaitha's AI actually caught my sensitivity to niacinamide before I even realized it. Life changer."
  },
  {
    name: "Marcus K.",
    skinType: "Oily/Acne Prone",
    quote: "Finally, a routine that doesn't feel like a 20-step chore. Simple, effective, and smart."
  },
  {
    name: "Elena R.",
    skinType: "Dry Skin",
    quote: "The hydration levels in my skin have improved significantly in just two weeks according to the scans!"
  },
  {
    name: "David L.",
    skinType: "Combination Skin",
    quote: "The personalized product recommendations saved me so much money on things I didn't need."
  }
];

export default function AboutUsPage() {
  return (
    <div className="bg-[#0f1115] text-white selection:bg-[#b46247]/30 overflow-x-hidden">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#b46247]/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#b46247]/5 blur-[100px]" />
      </div>

      <section className="relative min-h-[90vh] flex items-center max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b46247] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b46247]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#d4846d]">
              Welcome to Advaitha
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Your skin deserves <br />
            <span className="bg-gradient-to-r from-[#b46247] via-[#d4846d] to-white bg-clip-text text-transparent">
              personalized care
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
            We bridge the gap between dermatological science and AI technology to 
            build routines that actually work for you.
          </p>
        </motion.div>
      </section>

      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="relative group">
              <div className="absolute -inset-4 bg-[#b46247]/20 rounded-[2rem] blur-2xl group-hover:bg-[#b46247]/30 transition duration-500"></div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://img.freepik.com/premium-photo/amazing-woman-model-touching-her-face-concept-skin-care-product-with-copy-space_1000823-160214.jpg"
                  alt="Advaitha mission"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition duration-700 scale-105 hover:scale-100"
                />
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <h4 className="text-[#b46247] font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Mission</h4>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Skincare accessibility redefined.
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                We believe skincare should not be a luxury of the few. Our platform provides 
                professional-grade insights without the appointment fees.
              </p>
              <div className="h-1 w-20 bg-[#b46247] rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="order-2 lg:order-1">
              <h4 className="text-[#b46247] font-bold tracking-[0.2em] uppercase text-sm mb-4">The Innovation</h4>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">AI that truly sees you.</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-400">
                  We analyze your skin type and sensitivities to create routines that fit 
                  seamlessly into your life.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-[#d4846d] font-bold text-2xl mb-1">01</span>
                    <span className="text-sm text-slate-300">No guesswork</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-[#d4846d] font-bold text-2xl mb-1">02</span>
                    <span className="text-sm text-slate-300">Data-driven</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#b46247]/40 to-transparent rounded-3xl opacity-20"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://img.freepik.com/premium-photo/generative-ai-futuristic-technological-scanning-face-facial-recognition_108985-4522.jpg"
                  alt="AI skin analysis"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <motion.h4 {...fadeInUp} className="text-[#b46247] font-bold tracking-[0.2em] uppercase text-sm mb-4">Community Voice</motion.h4>
          <motion.h2 {...fadeInUp} className="text-4xl font-bold italic">The Glow-Up Stories</motion.h2>
        </div>

        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex whitespace-nowrap py-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="mx-4 w-[350px] flex-shrink-0 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:border-[#b46247]/50 transition-all hover:-translate-y-2">
                <div className="flex items-center space-x-1 mb-4 text-[#d4846d]">★★★★★</div>
                <p className="text-slate-300 whitespace-normal italic mb-6 leading-relaxed">{t.quote}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#b46247] flex items-center justify-center font-bold">{t.name[0]}</div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.skinType}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-32 bg-gradient-to-b from-transparent via-[#b46247]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Security by Design</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic">Your privacy is not a promise; it is hard-coded into our infrastructure.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AES-256 Encryption", desc: "Your data is encrypted at rest and in transit using military-grade protocols.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
              { title: "Firebase Secure", desc: "Built on enterprise-grade cloud infrastructure with strictly controlled access.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" },
              { title: "Zero Data Sale", desc: "We never sell your skin data. Your profile belongs to you, and only you.", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-[#b46247]/10 transition-all"
              >
                <svg className="w-10 h-10 text-[#d4846d] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feature.icon} />
                </svg>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-[#1a1c21] to-[#0f1115] border border-white/10"
          >
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 md:p-20 relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                  Stop guessing. <br /> 
                  <span className="text-[#b46247]">Start glowing.</span>
                </h2>
                <p className="text-xl text-slate-400 mb-10 max-w-md leading-relaxed">
                  Join 15,000+ others who have ditched generic products for AI-powered precision.
                </p>
                <div className="flex flex-col sm:flex-row gap-4"
                onClick={() => window.location.href = "/signup"}
                >
                  <button className="px-8 py-5 rounded-full bg-[#b46247] text-white font-bold text-lg hover:bg-[#d4846d] transition-all shadow-[0_20px_50px_rgba(180,98,71,0.3)] hover:-translate-y-1">
                    Get Started Free
                  </button>
                </div>
              </div>
              
              <div className="relative h-full min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c21] to-transparent z-10 hidden lg:block" />
                <img 
                  src="https://media.istockphoto.com/id/1474300446/photo/beautiful-natural-woman-extreme-close-up.jpg?s=612x612&w=0&k=20&c=sFrrhc8umADHq5RZMcxMXgYDzoJlgOlYDtT-QftMJG0=" 
                  className="w-full h-full object-cover opacity-60 lg:opacity-100" 
                  alt="Skincare results"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}