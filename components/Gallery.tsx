"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&crop=center",
    title: "Smart Coffee Maker",
    category: "Kitchen",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center",
    title: "Wireless Headphones",
    category: "Audio",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center",
    title: "Smart Watch",
    category: "Wearable",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center",
    title: "Premium Backpack",
    category: "Lifestyle",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop&crop=center",
    title: "Wireless Speaker",
    category: "Audio",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&h=600&fit=crop&crop=center",
    title: "Phone Charger",
    category: "Tech",
  },
]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["All", "Kitchen", "Audio", "Wearable", "Lifestyle", "Tech"]

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
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
              Innovation Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the visual journey of our cutting-edge technology and futuristic designs
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white neon-blue"
                    : "glass text-gray-300 hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass hover:neon-pink transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                  <span className="text-cyan-400 text-sm font-medium">{image.category}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
