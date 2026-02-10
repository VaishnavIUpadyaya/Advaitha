"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1,  price: 899, image: "/p1b.jpg" },
    { id: 2, price: 749, image: "/p2b.jpg" },
    { id: 3,  price: 499, image: "/p3.jpg" },
    { id: 4, price: 599, image: "/p4b.jpg" },
    { id: 5,  price: 699, image: "/p5.jpg" },
    { id: 6,  price: 999, image: "/p6.jpg" },
    { id: 7,  price: 399, image: "/p7b.jpg" },
    { id: 8,  price: 299, image: "/p8.jpg" },
    { id: 9,  price: 549, image: "/p9.jpg" },
    { id: 10,  price: 199, image: "/p10.jpg" },
    { id: 11,  price: 450, image: "/p11.jpg" },
    { id: 12,  price: 350, image: "/p12.jpg" },
    { id: 13,  price: 250, image: "/p13.jpg" },
    { id: 14,  price: 799, image: "/p14.jpg" },
    { id: 15,  price: 699, image: "/p15.jpg" },
    { id: 16,  price: 850, image: "/p16.jpg" },
    { id: 17,  price: 150, image: "/p17.jpg" },
    { id: 18,  price: 450, image: "/p18.jpg" },
    { id: 19,   price: 299, image: "/p19.jpg" },
    { id: 20, price: 1100, image: "/p20.jpg" },
    { id: 21, price: 500, image: "/p21.jpg" },
    { id: 22,  price: 650, image: "/p22.jpg" },
    { id: 23,  price: 799, image: "/p23.jpg" },
    { id: 24,  price: 550, image: "/p24.jpg" },
    { id: 25,  price: 950, image: "/p25.jpg" },
  ];

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };


  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#b46247] p-8">

      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Skincare Products</h1>

        <div className="bg-[#976f4c] text-white px-6 py-2 rounded-full">
          🛒 Cart: {cart.length}
        </div>
      </div>

      
      <div className="grid grid-cols-5 gap-6 mb-16">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-white"
          >

            
            <div className="relative w-full h-72">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-bold">
                  {product.name}
                </h2>
                <p className="font-semibold">
                  ₹{product.price}
                </p>
              </div>
            </div>

            <div className="p-4">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#976f4c] text-white py-2 rounded-lg hover:bg-[#7d5b3e] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Cart Items ({cart.length})
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-600">No items in cart</p>
        )}

        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow"
          >
          
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            </div>

           
            <button
              onClick={() => removeFromCart(index)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}

      
        {cart.length > 0 && (
          <div className="mt-6 text-xl font-bold">
            Total: ₹{total}
          </div>
        )}
      </div>

    </div>
  );
}
