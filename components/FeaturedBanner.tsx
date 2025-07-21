"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"

export default function FeaturedBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-semibold">Featured Product</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6 neon-text">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Premium Wireless Headphones
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience crystal-clear audio with our premium wireless headphones. Advanced noise cancellation and
              superior comfort for all-day listening pleasure.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">40mm</div>
                <div className="text-sm text-gray-400">Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">30hrs</div>
                <div className="text-sm text-gray-400">Battery Life</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">ANC</div>
                <div className="text-sm text-gray-400">Noise Cancel</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-white flex items-center gap-2 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 neon-blue"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{
                rotateY: [0, 10, 0, -10, 0],
                rotateX: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="relative h-96 w-full rounded-2xl overflow-hidden glass">
                <Image
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&crop=center"
                  alt="Premium Wireless Headphones"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 glass rounded-full p-4"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-4 -left-4 glass rounded-full p-3"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-blue-500 rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
