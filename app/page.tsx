import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import ImageSlider from "@/components/ImageSlider"
import ProductGrid from "@/components/ProductGrid"
import TechShowcase from "@/components/TechShowcase"
import FeaturedBanner from "@/components/FeaturedBanner"
import Gallery from "@/components/Gallery"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <ImageSlider />
      <FeaturedBanner />
      <ProductGrid />
      <TechShowcase />
      <Gallery />
    </main>
  )
}
