"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { ShoppingCart, Heart, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating?: number
  category?: string
}

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const springConfig = { damping: 15, stiffness: 300 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group perspective-1000"
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          x.set(e.clientX - centerX)
          y.set(e.clientY - centerY)
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        whileHover={{ scale: 1.05 }}
        className="glass rounded-2xl overflow-hidden cursor-pointer transform-gpu"
      >
        <div className="relative overflow-hidden">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
          >
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 glass rounded-full hover:neon-blue transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 glass rounded-full hover:neon-pink transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full">
                {product.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {product.name}
          </h3>

          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < product.rating! ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                />
              ))}
              <span className="text-sm text-gray-400 ml-2">({product.rating})</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
