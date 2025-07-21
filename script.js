// Global Variables
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
let slideInterval
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Sample Products Data with extended information
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "Audio",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Advanced noise cancellation and superior comfort for all-day listening pleasure.",
    features: [
      "Active noise cancellation",
      "40mm drivers for premium sound",
      "30-hour battery life",
      "Quick charge capability",
      "Bluetooth 5.2 connectivity",
    ],
  },
  {
    id: 2,
    name: "Smart Mobile Phone",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center",
    rating: 4,
    category: "Electronics",
    description:
      "Latest smartphone with advanced features, high-resolution camera, and lightning-fast performance for all your daily needs.",
    features: [
      "High-resolution display",
      "Advanced camera system",
      "Fast charging technology",
      "Water resistant design",
      "5G connectivity",
    ],
  },
  {
    id: 3,
    name: "Snow Blades",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "Sports",
    description:
      "Professional snow blades for winter sports enthusiasts. Lightweight, durable, and designed for optimal performance on the slopes.",
    features: [
      "Lightweight carbon fiber",
      "Professional grade bindings",
      "All-terrain design",
      "Weather resistant coating",
      "Adjustable settings",
    ],
  },
  {
    id: 4,
    name: "Premium Backpack",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center",
    rating: 4,
    category: "Lifestyle",
    description:
      "Carry your tech in style with our premium backpack. Multiple compartments, water-resistant material, and ergonomic design for all-day comfort.",
    features: [
      "Anti-theft design",
      "USB charging port",
      "Water-resistant material",
      "Padded laptop compartment",
      "Ergonomic shoulder straps",
    ],
  },
  {
    id: 5,
    name: "Smart Glasses",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "Wearables",
    description:
      "Revolutionary smart glasses with augmented reality features, voice control, and all-day battery life for the future of wearable technology.",
    features: [
      "Augmented reality display",
      "Voice control integration",
      "All-day battery life",
      "Lightweight titanium frame",
      "UV protection",
    ],
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop&crop=center",
    rating: 4,
    category: "Tech",
    description:
      "Charge your devices faster with our advanced wireless charging pad. Compatible with all Qi-enabled devices and features smart temperature control.",
    features: [
      "15W fast charging",
      "Multiple device charging",
      "Smart temperature control",
      "Foreign object detection",
      "LED charging indicator",
    ],
  },
  {
    id: 7,
    name: "Premium Coffee Maker",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop&crop=center",
    rating: 5,
    category: "Kitchen",
    description:
      "A premium smart coffee maker with app control, multiple brewing modes, and programmable settings for the perfect cup every time.",
    features: [
      "App-controlled brewing",
      "Multiple brewing modes",
      "Programmable timer",
      "Built-in grinder",
      "Auto-off safety feature",
    ],
  },
]

// Gallery Images Data
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center",
    title: "Premium Headphones",
    category: "Audio",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center",
    title: "Smart Phone",
    category: "Electronics",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&crop=center",
    title: "Snow Blades",
    category: "Sports",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center",
    title: "Premium Backpack",
    category: "Lifestyle",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop&crop=center",
    title: "Smart Glasses",
    category: "Wearables",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&h=600&fit=crop&crop=center",
    title: "Wireless Charging Pad",
    category: "Tech",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&crop=center",
    title: "Premium Coffee Maker",
    category: "Kitchen",
  },
]

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize Application
function initializeApp() {
  setupNavigation()
  setupSlider()
  setupScrollAnimations()
  loadProducts()
  loadGallery()
  setupGalleryFilter()
  setupIntersectionObserver()
  startSlideshow()
  setupCart()
  setupSearch()
  setupContactForm()
  setupProductModal()
  setupFeatureButtons()
  updateCartCount()
}

// Navigation Setup
function setupNavigation() {
  const navbar = document.getElementById("navbar")
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("glass", "backdrop-blur-md")
      navbar.classList.remove("bg-transparent")
    } else {
      navbar.classList.remove("glass", "backdrop-blur-md")
      navbar.classList.add("bg-transparent")
    }
  })

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    menuIcon.classList.toggle("hidden")
    closeIcon.classList.toggle("hidden")
  })

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      menuIcon.classList.remove("hidden")
      closeIcon.classList.add("hidden")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Slider Setup
function setupSlider() {
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      changeSlide(-1)
    })

    nextBtn.addEventListener("click", () => {
      changeSlide(1)
    })
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  // Touch/swipe support
  let startX = 0
  let endX = 0

  const sliderContainer = document.querySelector(".slider-container")

  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    sliderContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      handleSwipe()
    })

    function handleSwipe() {
      const threshold = 100
      const diff = startX - endX

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          changeSlide(1) // Swipe left - next slide
        } else {
          changeSlide(-1) // Swipe right - previous slide
        }
      }
    }
  }
}

// Slider Functions
function changeSlide(direction) {
  if (slides.length === 0) return

  slides[currentSlide].classList.remove("active")
  if (dots[currentSlide]) {
    dots[currentSlide].classList.remove("bg-cyan-400", "neon-blue")
    dots[currentSlide].classList.add("bg-gray-600")
  }

  currentSlide += direction

  if (currentSlide >= slides.length) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1
  }

  slides[currentSlide].classList.add("active")
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("bg-cyan-400", "neon-blue")
    dots[currentSlide].classList.remove("bg-gray-600")
  }

  resetSlideshow()
}

function goToSlide(index) {
  if (slides.length === 0) return

  slides[currentSlide].classList.remove("active")
  if (dots[currentSlide]) {
    dots[currentSlide].classList.remove("bg-cyan-400", "neon-blue")
    dots[currentSlide].classList.add("bg-gray-600")
  }

  currentSlide = index

  slides[currentSlide].classList.add("active")
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("bg-cyan-400", "neon-blue")
    dots[currentSlide].classList.remove("bg-gray-600")
  }

  resetSlideshow()
}

function startSlideshow() {
  if (slides.length > 0) {
    slideInterval = setInterval(() => {
      changeSlide(1)
    }, 5000)
  }
}

function resetSlideshow() {
  clearInterval(slideInterval)
  startSlideshow()
}

// Load Products
function loadProducts() {
  const productsGrid = document.getElementById("products-grid")
  if (!productsGrid) return

  productsGrid.innerHTML = ""

  products.forEach((product, index) => {
    const productCard = createProductCard(product, index)
    productsGrid.appendChild(productCard)
  })
}

// Create Product Card
function createProductCard(product, index) {
  const card = document.createElement("div")
  card.className =
    "product-card glass rounded-2xl overflow-hidden group hover:neon-blue transition-all duration-500 opacity-0 translate-y-12"
  card.style.transitionDelay = `${index * 100}ms`
  card.dataset.productId = product.id

  card.innerHTML = `
        <div class="relative h-64 overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="product-image w-full h-full object-cover transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <button class="add-to-cart-btn p-2 glass rounded-full hover:neon-blue transition-all duration-300" data-product-id="${product.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"></path>
                    </svg>
                </button>
                <button class="view-product-btn p-2 glass rounded-full hover:neon-pink transition-all duration-300" data-product-id="${product.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                </button>
            </div>

            <div class="absolute top-4 left-4">
                <span class="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full">
                    ${product.category}
                </span>
            </div>
        </div>

        <div class="p-6">
            <h3 class="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                ${product.name}
            </h3>

            <div class="flex items-center gap-1 mb-3">
                ${generateStars(product.rating)}
                <span class="text-sm text-gray-400 ml-2">(${product.rating})</span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    $${product.price.toFixed(2)}
                </span>
                <button class="add-to-cart-btn px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `

  // Add event listeners after the card is added to the DOM
  setTimeout(() => {
    const addToCartButtons = card.querySelectorAll(".add-to-cart-btn")
    addToCartButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const productId = Number.parseInt(btn.dataset.productId)
        addToCart(productId)
      })
    })

    const viewProductButtons = card.querySelectorAll(".view-product-btn")
    viewProductButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const productId = Number.parseInt(btn.dataset.productId)
        openProductModal(productId)
      })
    })

    // Make the entire card clickable to view product details
    card.addEventListener("click", () => {
      const productId = Number.parseInt(card.dataset.productId)
      openProductModal(productId)
    })
  }, 100)

  return card
}

// Generate Stars
function generateStars(rating) {
  let stars = ""
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>`
    } else {
      stars += `<svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>`
    }
  }
  return stars
}

// Load Gallery
function loadGallery() {
  const galleryGrid = document.getElementById("gallery-grid")
  if (!galleryGrid) return

  galleryGrid.innerHTML = ""

  galleryImages.forEach((image, index) => {
    const galleryItem = createGalleryItem(image, index)
    galleryGrid.appendChild(galleryItem)
  })
}

// Create Gallery Item
function createGalleryItem(image, index) {
  const item = document.createElement("div")
  item.className = `gallery-item group relative overflow-hidden rounded-2xl glass hover:neon-pink transition-all duration-500 opacity-0 scale-90`
  item.style.transitionDelay = `${index * 100}ms`
  item.dataset.category = image.category

  item.innerHTML = `
        <div class="relative h-80 overflow-hidden">
            <img src="${image.src}" alt="${image.title}" class="gallery-image w-full h-full object-cover transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 class="text-xl font-bold text-white mb-1">${image.title}</h3>
                <span class="text-cyan-400 text-sm font-medium">${image.category}</span>
            </div>
        </div>
    `

  return item
}

// Gallery Filter Setup
function setupGalleryFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category

      // Update active button
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-gradient-to-r", "from-cyan-500", "to-purple-600", "text-white", "neon-blue")
        btn.classList.add("glass", "text-gray-300")
      })

      button.classList.add("active", "bg-gradient-to-r", "from-cyan-500", "to-purple-600", "text-white", "neon-blue")
      button.classList.remove("glass", "text-gray-300")

      // Filter gallery items
      filterGallery(category)
    })
  })
}

// Filter Gallery
function filterGallery(category) {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item, index) => {
    const itemCategory = item.dataset.category

    if (category === "All" || itemCategory === category) {
      item.style.display = "block"
      setTimeout(() => {
        item.classList.remove("opacity-0", "scale-90")
        item.classList.add("opacity-100", "scale-100")
      }, index * 50)
    } else {
      item.classList.add("opacity-0", "scale-90")
      item.classList.remove("opacity-100", "scale-100")
      setTimeout(() => {
        item.style.display = "none"
      }, 300)
    }
  })
}

// Intersection Observer for Scroll Animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Special handling for different elements
        if (entry.target.classList.contains("hero-content")) {
          animateHeroContent()
        } else if (entry.target.classList.contains("featured-content")) {
          animateFeaturedContent()
        } else if (entry.target.classList.contains("featured-image")) {
          animateFeaturedImage()
        } else if (entry.target.classList.contains("products-header")) {
          animateProductsHeader()
        } else if (entry.target.classList.contains("gallery-header")) {
          animateGalleryHeader()
        } else if (entry.target.classList.contains("about-header")) {
          animateAboutHeader()
        } else if (entry.target.classList.contains("about-content")) {
          animateAboutContent()
        } else if (entry.target.classList.contains("about-image")) {
          animateAboutImage()
        } else if (entry.target.classList.contains("contact-header")) {
          animateContactHeader()
        } else if (entry.target.classList.contains("contact-info")) {
          animateContactInfo()
        } else if (entry.target.classList.contains("contact-form")) {
          animateContactForm()
        } else if (entry.target.classList.contains("product-card")) {
          animateProductCard(entry.target)
        } else if (entry.target.classList.contains("gallery-item")) {
          animateGalleryItem(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observe elements
  const elementsToObserve = [
    ".hero-content",
    ".featured-content",
    ".featured-image",
    ".products-header",
    ".gallery-header",
    ".about-header",
    ".about-content",
    ".about-image",
    ".contact-header",
    ".contact-info",
    ".contact-form",
    ".product-card",
    ".gallery-item",
  ]

  elementsToObserve.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  })
}

// Animation Functions
function animateHeroContent() {
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.transition = "all 0.8s ease"
    heroContent.style.opacity = "1"
    heroContent.style.transform = "translateY(0)"
  }
}

function animateFeaturedContent() {
  const featuredContent = document.querySelector(".featured-content")
  if (featuredContent) {
    featuredContent.style.transition = "all 0.8s ease"
    featuredContent.style.opacity = "1"
    featuredContent.style.transform = "translateX(0)"
  }
}

function animateFeaturedImage() {
  const featuredImage = document.querySelector(".featured-image")
  if (featuredImage) {
    featuredImage.style.transition = "all 0.8s ease 0.2s"
    featuredImage.style.opacity = "1"
    featuredImage.style.transform = "translateX(0)"
  }
}

function animateProductsHeader() {
  const productsHeader = document.querySelector(".products-header")
  if (productsHeader) {
    productsHeader.style.transition = "all 0.8s ease"
    productsHeader.style.opacity = "1"
    productsHeader.style.transform = "translateY(0)"
  }
}

function animateGalleryHeader() {
  const galleryHeader = document.querySelector(".gallery-header")
  if (galleryHeader) {
    galleryHeader.style.transition = "all 0.8s ease"
    galleryHeader.style.opacity = "1"
    galleryHeader.style.transform = "translateY(0)"
  }
}

function animateAboutHeader() {
  const aboutHeader = document.querySelector(".about-header")
  if (aboutHeader) {
    aboutHeader.style.transition = "all 0.8s ease"
    aboutHeader.style.opacity = "1"
    aboutHeader.style.transform = "translateY(0)"
  }
}

function animateAboutContent() {
  const aboutContent = document.querySelector(".about-content")
  if (aboutContent) {
    aboutContent.style.transition = "all 0.8s ease"
    aboutContent.style.opacity = "1"
    aboutContent.style.transform = "translateX(0)"
  }
}

function animateAboutImage() {
  const aboutImage = document.querySelector(".about-image")
  if (aboutImage) {
    aboutImage.style.transition = "all 0.8s ease 0.2s"
    aboutImage.style.opacity = "1"
    aboutImage.style.transform = "translateX(0)"
  }
}

function animateContactHeader() {
  const contactHeader = document.querySelector(".contact-header")
  if (contactHeader) {
    contactHeader.style.transition = "all 0.8s ease"
    contactHeader.style.opacity = "1"
    contactHeader.style.transform = "translateY(0)"
  }
}

function animateContactInfo() {
  const contactInfo = document.querySelector(".contact-info")
  if (contactInfo) {
    contactInfo.style.transition = "all 0.8s ease"
    contactInfo.style.opacity = "1"
    contactInfo.style.transform = "translateX(0)"
  }
}

function animateContactForm() {
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.style.transition = "all 0.8s ease 0.2s"
    contactForm.style.opacity = "1"
    contactForm.style.transform = "translateX(0)"
  }
}

function animateProductCard(card) {
  card.style.opacity = "1"
  card.style.transform = "translateY(0)"
}

function animateGalleryItem(item) {
  item.style.opacity = "1"
  item.style.transform = "scale(1)"
}

// Scroll Animations Setup
function setupScrollAnimations() {
  // Parallax effect for floating elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallax1 = document.querySelector(".floating-element-1")
    const parallax2 = document.querySelector(".floating-element-2")

    if (parallax1) {
      parallax1.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.1}deg)`
    }

    if (parallax2) {
      parallax2.style.transform = `translateY(${scrolled * -0.3}px) rotate(${scrolled * -0.1}deg)`
    }
  })
}

// Cart Functions
function setupCart() {
  const cartBtn = document.getElementById("cart-btn")
  const cartToggle = document.getElementById("cart-toggle")
  const closeCartBtn = document.getElementById("close-cart")
  const cartModal = document.getElementById("cart-modal")

  // Open cart modal
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      openCartModal()
    })
  }

  if (cartToggle) {
    cartToggle.addEventListener("click", () => {
      openCartModal()
    })
  }

  // Close cart modal
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartModal.classList.add("hidden")
      cartModal.classList.remove("flex")
    })
  }

  // Close modal when clicking outside
  if (cartModal) {
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        cartModal.classList.add("hidden")
        cartModal.classList.remove("flex")
      }
    })
  }

  // Update cart on load
  updateCartDisplay()
}

function openCartModal() {
  const cartModal = document.getElementById("cart-modal")
  if (cartModal) {
    cartModal.classList.remove("hidden")
    cartModal.classList.add("flex")
    updateCartDisplay()
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update UI
  updateCartCount()
  showNotification("Added to Cart", `${product.name} has been added to your cart.`, "success")
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartDisplay()
  updateCartCount()
  showNotification("Removed from Cart", "Item has been removed from your cart.", "info")
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = newQuantity
      localStorage.setItem("cart", JSON.stringify(cart))
      updateCartDisplay()
      updateCartCount()
    }
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items")
  const emptyCart = document.getElementById("empty-cart")
  const cartFooter = document.getElementById("cart-footer")
  const cartTotal = document.getElementById("cart-total")

  if (!cartItems) return

  // Clear current items
  cartItems.innerHTML = ""

  if (cart.length === 0) {
    if (emptyCart) emptyCart.classList.remove("hidden")
    if (cartFooter) cartFooter.classList.add("hidden")
    return
  }

  if (emptyCart) emptyCart.classList.add("hidden")
  if (cartFooter) cartFooter.classList.remove("hidden")

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`

  // Add cart items
  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.className = "flex items-center gap-4 p-4 glass rounded-lg mb-4"
    cartItem.innerHTML = `
      <div class="relative w-16 h-16 rounded-lg overflow-hidden">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1">
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-cyan-400 font-bold">$${item.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="quantity-btn p-1 glass rounded hover:bg-gray-700" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span class="w-8 text-center">${item.quantity}</span>
        <button class="quantity-btn p-1 glass rounded hover:bg-gray-700" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
      <button class="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-300" onclick="removeFromCart(${item.id})">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    `
    cartItems.appendChild(cartItem)
  })
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  const floatingCartCount = document.getElementById("floating-cart-count")
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (totalItems > 0) {
    if (cartCount) {
      cartCount.textContent = totalItems
      cartCount.classList.remove("hidden")
    }
    if (floatingCartCount) {
      floatingCartCount.textContent = totalItems
      floatingCartCount.classList.remove("hidden")
    }
  } else {
    if (cartCount) cartCount.classList.add("hidden")
    if (floatingCartCount) floatingCartCount.classList.add("hidden")
  }
}

// Search Functions
function setupSearch() {
  const searchBtn = document.getElementById("search-btn")
  const searchModal = document.getElementById("search-modal")
  const closeSearchBtn = document.getElementById("close-search")
  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")

  // Open search modal
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      if (searchModal) {
        searchModal.classList.remove("hidden")
        searchModal.classList.add("flex")
        if (searchInput) searchInput.focus()
      }
    })
  }

  // Close search modal
  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", () => {
      if (searchModal) {
        searchModal.classList.add("hidden")
        searchModal.classList.remove("flex")
        if (searchInput) searchInput.value = ""
        if (searchResults) {
          searchResults.innerHTML =
            '<div class="text-center py-8 text-gray-400">Start typing to search products...</div>'
        }
      }
    })
  }

  // Close modal when clicking outside
  if (searchModal) {
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        searchModal.classList.add("hidden")
        searchModal.classList.remove("flex")
      }
    })
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim()

      if (query === "") {
        if (searchResults) {
          searchResults.innerHTML =
            '<div class="text-center py-8 text-gray-400">Start typing to search products...</div>'
        }
        return
      }

      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      )

      displaySearchResults(filteredProducts)
    })
  }

  // Close search on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchModal && !searchModal.classList.contains("hidden")) {
      searchModal.classList.add("hidden")
      searchModal.classList.remove("flex")
    }
  })
}

function displaySearchResults(products) {
  const searchResults = document.getElementById("search-results")
  if (!searchResults) return

  if (products.length === 0) {
    searchResults.innerHTML =
      '<div class="text-center py-8 text-gray-400">No products found. Try a different search term.</div>'
    return
  }

  searchResults.innerHTML = products
    .map(
      (product) => `
    <div class="search-result-item flex items-center gap-4 p-4 glass rounded-lg mb-4 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer" onclick="openProductModal(${product.id}); closeSearchModal()">
      <div class="relative w-16 h-16 rounded-lg overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1">
        <h3 class="font-semibold text-white">${product.name}</h3>
        <p class="text-gray-400 text-sm">${product.category}</p>
        <p class="text-cyan-400 font-bold">$${product.price.toFixed(2)}</p>
      </div>
      <button class="add-to-cart-btn p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300" onclick="event.stopPropagation(); addToCart(${product.id})">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"></path>
        </svg>
      </button>
    </div>
  `,
    )
    .join("")
}

function closeSearchModal() {
  const searchModal = document.getElementById("search-modal")
  if (searchModal) {
    searchModal.classList.add("hidden")
    searchModal.classList.remove("flex")
  }
}

// Contact Form Functions
function setupContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Simulate form submission
      showNotification("Message Sent", "Thank you for your message! We'll get back to you soon.", "success")

      // Create mailto link
      const mailtoLink = `mailto:m.saadshakeelvirk@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

      // Open email client
      window.location.href = mailtoLink

      // Reset form
      contactForm.reset()
    })
  }
}

// Product Modal Functions
function setupProductModal() {
  const productModal = document.getElementById("product-modal")
  const closeProductModal = document.getElementById("close-product-modal")
  const quantityInput = document.getElementById("product-modal-quantity")
  const decreaseBtn = document.getElementById("product-modal-decrease")
  const increaseBtn = document.getElementById("product-modal-increase")
  const addToCartBtn = document.getElementById("product-modal-add-to-cart")

  // Close modal
  if (closeProductModal) {
    closeProductModal.addEventListener("click", () => {
      if (productModal) {
        productModal.classList.add("hidden")
        productModal.classList.remove("flex")
      }
    })
  }

  // Close modal when clicking outside
  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) {
        productModal.classList.add("hidden")
        productModal.classList.remove("flex")
      }
    })
  }

  // Quantity controls
  if (decreaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1
      }
    })
  }

  if (increaseBtn && quantityInput) {
    increaseBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(quantityInput.value)
      quantityInput.value = currentValue + 1
    })
  }

  // Add to cart from modal
  if (addToCartBtn && quantityInput) {
    addToCartBtn.addEventListener("click", () => {
      const productId = Number.parseInt(addToCartBtn.dataset.productId)
      const quantity = Number.parseInt(quantityInput.value)

      for (let i = 0; i < quantity; i++) {
        addToCart(productId)
      }

      if (productModal) {
        productModal.classList.add("hidden")
        productModal.classList.remove("flex")
      }
    })
  }
}

function openProductModal(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const productModal = document.getElementById("product-modal")
  const modalTitle = document.getElementById("product-modal-title")
  const modalImage = document.getElementById("product-modal-image")
  const modalName = document.getElementById("product-modal-name")
  const modalRating = document.getElementById("product-modal-rating")
  const modalDescription = document.getElementById("product-modal-description")
  const modalPrice = document.getElementById("product-modal-price")
  const modalCategory = document.getElementById("product-modal-category")
  const modalFeatures = document.getElementById("product-modal-features")
  const modalQuantity = document.getElementById("product-modal-quantity")
  const addToCartBtn = document.getElementById("product-modal-add-to-cart")

  if (!productModal) return

  // Populate modal with product data
  if (modalTitle) {
    modalTitle.innerHTML = `<span class="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">${product.name}</span>`
  }
  if (modalImage) {
    modalImage.src = product.image
    modalImage.alt = product.name
  }
  if (modalName) modalName.textContent = product.name
  if (modalRating) {
    modalRating.innerHTML =
      generateStars(product.rating) + `<span class="text-sm text-gray-400 ml-2">(${product.rating})</span>`
  }
  if (modalDescription) modalDescription.textContent = product.description
  if (modalPrice) modalPrice.textContent = `$${product.price.toFixed(2)}`
  if (modalCategory) modalCategory.textContent = product.category
  if (modalQuantity) modalQuantity.value = 1
  if (addToCartBtn) addToCartBtn.dataset.productId = product.id

  // Populate features
  if (modalFeatures) {
    modalFeatures.innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join("")
  }

  // Show modal
  productModal.classList.remove("hidden")
  productModal.classList.add("flex")
}

// Feature Button Functions
function setupFeatureButtons() {
  const exploreProductsBtn = document.getElementById("explore-products-btn")
  const watchDemoBtn = document.getElementById("watch-demo-btn")

  if (exploreProductsBtn) {
    exploreProductsBtn.addEventListener("click", () => {
      const productsSection = document.getElementById("products")
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  if (watchDemoBtn) {
    watchDemoBtn.addEventListener("click", () => {
      showNotification("Demo Coming Soon", "Our interactive demo will be available soon!", "info")
    })
  }
}

// Notification System
function showNotification(title, message, type = "info") {
  const notification = document.getElementById("notification")
  const notificationIcon = document.getElementById("notification-icon")
  const notificationTitle = document.getElementById("notification-title")
  const notificationMessage = document.getElementById("notification-message")

  if (!notification) return

  // Set icon and color based on type
  let iconSvg = ""
  let iconClass = ""

  switch (type) {
    case "success":
      iconClass = "bg-green-500"
      iconSvg = `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>`
      break
    case "error":
      iconClass = "bg-red-500"
      iconSvg = `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>`
      break
    case "info":
    default:
      iconClass = "bg-blue-500"
      iconSvg = `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`
      break
  }

  if (notificationIcon) {
    notificationIcon.className = `p-2 rounded-full ${iconClass}`
    notificationIcon.innerHTML = iconSvg
  }
  if (notificationTitle) notificationTitle.textContent = title
  if (notificationMessage) notificationMessage.textContent = message

  // Show notification
  notification.classList.remove("hidden")

  // Hide after 4 seconds
  setTimeout(() => {
    notification.classList.add("hidden")
  }, 4000)
}

// Make functions globally available
window.addToCart = addToCart
window.removeFromCart = removeFromCart
window.updateQuantity = updateQuantity
window.openProductModal = openProductModal
window.closeSearchModal = closeSearchModal

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error)
})

// Performance Optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Preload images
    galleryImages.forEach((image) => {
      const img = new Image()
      img.src = image.src
    })
  })
}
