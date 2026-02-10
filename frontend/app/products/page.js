"use client";

import { useEffect, useState } from "react";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    console.log("API response:", data);

    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      setProducts([]);
    }
  };
  fetchProducts();
}, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Recommended Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <h2 className="font-semibold">{p.name}</h2>
            <p>{p.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}