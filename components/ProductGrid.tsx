"use client"

import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

const sampleProducts = [
  {
    id: "1",
    name: "Smart Coffee Maker",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "Tech",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center",
    rating: 4,
    category: "Innovation",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "Display",
  },
  {
    id: "4",
    name: "Premium Backpack",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center",
    rating: 4,
    category: "Wearable",
  },
  {
    id: "5",
    name: "Wireless Speaker",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "AI",
  },
  {
    id: "6",
    name: "Phone Charger",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop&crop=center",
    rating: 4,
    category: "Power",
  },
]

export default function ProductGrid() {
  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-4 neon-text">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our cutting-edge collection of futuristic technology and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
