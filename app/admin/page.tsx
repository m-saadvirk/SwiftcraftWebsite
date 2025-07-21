"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Plus, Trash2, Save } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number"
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required"
    } else {
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = "Please enter a valid URL"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
    }

    setProducts((prev) => [...prev, newProduct])
    setFormData({ name: "", price: "", image: "" })
    setIsSubmitting(false)
  }

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass backdrop-blur-md border-b border-gray-800 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold font-orbitron neon-text">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              SwiftCraft Admin Panel
            </span>
          </h1>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6 text-cyan-400" />
              Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Product Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 glass rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } focus:border-cyan-400 focus:outline-none transition-all duration-300`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2">
                  Price ($)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  id="price"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  className={`w-full px-4 py-3 glass rounded-lg border ${
                    errors.price ? "border-red-500" : "border-gray-600"
                  } focus:border-cyan-400 focus:outline-none transition-all duration-300`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.price}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-2">
                  External Image Link 🔻 paste image link here
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="url"
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  className={`w-full px-4 py-3 glass rounded-lg border ${
                    errors.image ? "border-red-500" : "border-gray-600"
                  } focus:border-cyan-400 focus:outline-none transition-all duration-300`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.image}
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Add Product
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Product List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Product List ({products.length})</h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {products.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-400"
                  >
                    No products added yet. Add your first product!
                  </motion.div>
                ) : (
                  products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="glass rounded-lg p-4 flex items-center gap-4"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-cyan-400 font-bold">${product.price}</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
