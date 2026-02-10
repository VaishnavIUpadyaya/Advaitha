"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["All", "Cleansers", "Serums", "Moisturizers", "Sunscreen"];

  const products = [
    { id: 1, name: "Gentle Milk Cleanser", category: "Cleansers", price: 899, image: "/p1b.jpg" },
    { id: 7, name: "Salicylic Acid Wash", category: "Cleansers", price: 399, image: "/p7b.jpg" },
    { id: 10, name: "Hydrating Foam", category: "Cleansers", price: 199, image: "/p10.jpg" },
    { id: 13, name: "Oil-to-Milk Balm", category: "Cleansers", price: 250, image: "/p13.jpg" },
    { id: 17, name: "Clarifying Gel", category: "Cleansers", price: 150, image: "/p17.jpg" },
    { id: 2, name: "Vitamin C Glow Serum", category: "Serums", price: 749, image: "/p2b.jpg" },
    { id: 3, name: "Hyaluronic Acid 2%", category: "Serums", price: 499, image: "/p3.jpg" },
    { id: 5, name: "Night Repair Oil", category: "Serums", price: 699, image: "/p5.jpg" },
    { id: 9, name: "Niacinamide 10%", category: "Serums", price: 549, image: "/p9.jpg" },
    { id: 11, name: "Retinol Renewal", category: "Serums", price: 450, image: "/p11.jpg" },
    { id: 14, name: "Peptide Complex", category: "Serums", price: 799, image: "/p14.jpg" },
    { id: 16, name: "Bakuchiol Alt", category: "Serums", price: 850, image: "/p16.jpg" },
    { id: 23, name: "Alpha Arbutin", category: "Serums", price: 799, image: "/p23.jpg" },
    { id: 25, name: "AHA/BHA Peel", category: "Serums", price: 950, image: "/p25.jpg" },
    { id: 4, name: "Ceramide Barrier Cream", category: "Moisturizers", price: 599, image: "/p4b.jpg" },
    { id: 8, name: "Water Gel Cream", category: "Moisturizers", price: 299, image: "/p8.jpg" },
    { id: 12, name: "Deep Repair Balm", category: "Moisturizers", price: 350, image: "/p12.jpg" },
    { id: 15, name: "Squalane Moisturizer", category: "Moisturizers", price: 699, image: "/p15.jpg" },
    { id: 18, name: "Night Recovery Cream", category: "Moisturizers", price: 450, image: "/p18.jpg" },
    { id: 21, name: "Sensitive Day Lotion", category: "Moisturizers", price: 500, image: "/p21.jpg" },
    { id: 22, name: "Vitamin E Butter", category: "Moisturizers", price: 650, image: "/p22.jpg" },
    { id: 24, name: "Oil-Free Hydrator", category: "Moisturizers", price: 550, image: "/p24.jpg" },
    { id: 6, name: "Mineral Sunshield", category: "Sunscreen", price: 999, image: "/p6.jpg" },
    { id: 19, name: "Invisible SPF 50", category: "Sunscreen", price: 299, image: "/p19.jpg" },
    { id: 20, name: "Tinted Glow Shield", category: "Sunscreen", price: 1100, image: "/p20.jpg" },
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true); 
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-[marcellus]">
      <section className="pt-32 pb-16 bg-[#b76247] text-white px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter"
          >
            The Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 max-w-xl italic"
          >
            Clinically backed formulas, curated for your specific skin profile. 
            Free of synthetics, full of intelligence.
          </motion.p>
        </div>
      </section>
      <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-8 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat ? "text-[#b76247] border-b-2 border-[#b76247]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-[#b76247] text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition hover:scale-105 shadow-lg shadow-[#b76247]/20"
          >
            <span>Bag</span>
            <span className="bg-white text-[#b76247] w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {cart.length}
            </span>
          </button>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                className="group"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-6 left-6 right-6 bg-white py-4 rounded-xl font-bold text-[#b76247] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                  >
                    Add to Bag +
                  </button>
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-1 leading-tight">{product.name}</h3>
                <p className="text-gray-400 text-[10px] mb-3 uppercase tracking-widest font-bold">{product.category}</p>
                <p className="text-[#b76247] font-bold text-lg">₹{product.price}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tighter">Your Bag</h2>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{cart.length} items</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar pr-2">
                {cart.length === 0 ? (
                  <div className="text-center pt-20">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🛍️</div>
                    <p className="text-gray-400 italic">Your bag is currently empty.</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={`${item.id}-${index}`} 
                      className="flex gap-6 group"
                    >
                      <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h4>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-2">{item.category}</p>
                        <p className="text-[#b76247] font-bold">₹{item.price}</p>
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="text-[10px] uppercase tracking-widest text-red-400 mt-3 font-bold hover:text-red-600 transition-colors text-left"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-10 pt-10 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Subtotal</span>
                    <span className="text-3xl font-bold text-gray-900 tracking-tighter">₹{total}</span>
                  </div>
                  <button className="w-full bg-[#b76247] text-white py-6 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-[#b76247]/20 hover:bg-[#a3563d] transition-all active:scale-[0.98]">
                    Secure Checkout
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest italic">
                    Free shipping on all orders over ₹1500
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}