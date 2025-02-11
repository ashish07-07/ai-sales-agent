
"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Lens } from '../components/ui/lens';
import { cn } from '../lib/util';


interface ProductType {
  itemName: string;
  description: string;
  cost: number;
  stock: number;
  imageLink: string;
  sizes: string[];
}

export default function SeeDetail() {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [hovering, setHovering] = useState(false);
  async function customrequest()
  {
       router.push('/quote-request')
  }

  useEffect(() => {
    // Get the product details from sessionStorage
    const storedProduct = sessionStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D2235] to-[#121318] py-8">
      <div className="max-w-6xl mx-auto p-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#1D2235] to-[#121318] p-8">
          <div className="md:flex gap-8 items-start">
            {/* Image section with Lens */}
            <div className="md:w-1/2 relative z-10">
              <Lens hovering={hovering} setHovering={setHovering}>
                <Image
                  src={product.imageLink}
                  alt={product.itemName}
                  width={500}
                  height={500}
                  className="rounded-2xl w-full"
                />
              </Lens>
            </div>

            {/* Product details section */}
            <motion.div 
              animate={{
                filter: hovering ? "blur(2px)" : "blur(0px)",
              }}
              className="md:w-1/2 relative z-20 mt-8 md:mt-0"
            >
              <h1 className="text-3xl font-bold text-white mb-4">{product.itemName}</h1>
              <p className="text-neutral-200 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Available Sizes:</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-purple-900/50 text-purple-100 rounded-full border border-purple-500/30"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="text-3xl font-bold text-blue-400">₹{product.cost}</div>
                <div className="text-lg bg-blue-900/50 px-4 py-2 rounded-full border border-blue-500/30 text-blue-100">
                  Stock: {product.stock}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => router.back()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Back to Products
                </button>
                <button
                 onClick={customrequest}
                   
                  className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
                  
                >
                  Customization Request to salesteam
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}