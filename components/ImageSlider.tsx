"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
}

const slides: Slide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
    title: "Premium Quality",
    subtitle: "Everyday essentials redefined",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=600&fit=crop&crop=center",
    title: "Smart Living",
    subtitle: "Technology that enhances your daily life",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=600&fit=crop&crop=center",
    title: "Modern Design",
    subtitle: "Beautiful products for modern homes",
  },
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % slides.length
      } else {
        return prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      }
    })
  }

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].image || "/placeholder.svg"}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-4xl px-4"
              >
                <motion.h2
                  className="text-5xl md:text-7xl font-bold font-orbitron mb-4 neon-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {slides[currentIndex].title}
                  </span>
                </motion.h2>
                <motion.p
                  className="text-xl md:text-2xl text-gray-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {slides[currentIndex].subtitle}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 glass rounded-full hover:neon-blue transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 glass rounded-full hover:neon-blue transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-cyan-400 neon-blue" : "bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
