// Admin Panel JavaScript
let adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || []

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin()
})

// Initialize Admin Panel
function initializeAdmin() {
  setupFormValidation()
  setupFormSubmission()
  loadAdminProducts()
  setupAnimations()
}

// Setup Form Validation
function setupFormValidation() {
  const form = document.getElementById("product-form")
  const inputs = form.querySelectorAll("input, select")

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input))
    input.addEventListener("input", () => clearError(input))
  })
}

// Validate Field
function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let errorMessage = ""

  switch (fieldName) {
    case "name":
      if (!value) {
        errorMessage = "Product name is required"
        isValid = false
      } else if (value.length < 2) {
        errorMessage = "Product name must be at least 2 characters"
        isValid = false
      }
      break

    case "price":
      if (!value) {
        errorMessage = "Price is required"
        isValid = false
      } else if (isNaN(value) || Number.parseFloat(value) <= 0) {
        errorMessage = "Price must be a positive number"
        isValid = false
      }
      break

    case "image":
      if (!value) {
        errorMessage = "Image URL is required"
        isValid = false
      } else if (!isValidURL(value)) {
        errorMessage = "Please enter a valid URL"
        isValid = false
      } else if (!isImageURL(value)) {
        errorMessage = "Please enter a valid image URL"
        isValid = false
      }
      break
  }

  if (!isValid) {
    showError(field, errorMessage)
    field.classList.add("border-red-500")
    field.classList.remove("border-gray-600")
  } else {
    clearError(field)
    field.classList.remove("border-red-500")
    field.classList.add("border-gray-600")
  }

  return isValid
}

// Show Error
function showError(field, message) {
  const errorElement = field.parentNode.querySelector(".error-message")
  errorElement.textContent = message
  errorElement.classList.remove("hidden")
}

// Clear Error
function clearError(field) {
  const errorElement = field.parentNode.querySelector(".error-message")
  errorElement.textContent = ""
  errorElement.classList.add("hidden")
}

// Validate URL
function isValidURL(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Validate Image URL
function isImageURL(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)(\?.*)?$/i.test(url)
}

// Setup Form Submission
function setupFormSubmission() {
  const form = document.getElementById("product-form")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (validateForm()) {
      await submitProduct()
    }
  })
}

// Validate Form
function validateForm() {
  const form = document.getElementById("product-form")
  const inputs = form.querySelectorAll("input[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false
    }
  })

  return isValid
}

// Update the submitProduct function to handle both add and edit
async function submitProduct() {
  const form = document.getElementById("product-form")
  const submitBtn = document.getElementById("submit-btn")
  const formData = new FormData(form)
  const isEditMode = form.dataset.editMode === "true"
  const editId = form.dataset.editId

  // Show loading state
  submitBtn.disabled = true
  submitBtn.innerHTML = `
    <div class="loading"></div>
    ${isEditMode ? "Updating" : "Adding"} Product...
  `

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (isEditMode) {
    // Update existing product
    const productIndex = adminProducts.findIndex((p) => p.id === editId)
    if (productIndex !== -1) {
      adminProducts[productIndex] = {
        ...adminProducts[productIndex],
        name: formData.get("name"),
        price: Number.parseFloat(formData.get("price")),
        image: formData.get("image"),
        category: formData.get("category"),
        dateModified: new Date().toISOString(),
      }
      showSuccessMessage("Product updated successfully!")
    }

    // Reset form to add mode
    cancelEdit()
  } else {
    // Add new product
    const newProduct = {
      id: Date.now().toString(),
      name: formData.get("name"),
      price: Number.parseFloat(formData.get("price")),
      image: formData.get("image"),
      category: formData.get("category"),
      dateAdded: new Date().toISOString(),
    }

    adminProducts.push(newProduct)
    showSuccessMessage("Product added successfully!")
  }

  // Save to localStorage
  localStorage.setItem("adminProducts", JSON.stringify(adminProducts))

  // Reset form if not in edit mode
  if (!isEditMode) {
    form.reset()
  }

  // Reload products list
  loadAdminProducts()

  // Reset button
  submitBtn.disabled = false
  if (!isEditMode) {
    submitBtn.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
      </svg>
      Add Product
    `
  }
}

// Load Admin Products
function loadAdminProducts() {
  const productsList = document.getElementById("products-list")
  const noProducts = document.getElementById("no-products")
  const productCount = document.getElementById("product-count")

  // Update count
  productCount.textContent = adminProducts.length

  if (adminProducts.length === 0) {
    noProducts.classList.remove("hidden")
    // Remove bulk actions if they exist
    const bulkActions = document.getElementById("bulk-actions")
    if (bulkActions) {
      bulkActions.remove()
    }
    return
  }

  noProducts.classList.add("hidden")

  // Add bulk actions
  addBulkActions()

  // Clear existing products
  const existingProducts = productsList.querySelectorAll(".admin-product-card")
  existingProducts.forEach((card) => card.remove())

  // Add products
  adminProducts.forEach((product, index) => {
    const productCard = createAdminProductCard(product, index)
    productsList.appendChild(productCard)

    // Animate in
    setTimeout(() => {
      productCard.classList.remove("opacity-0", "translate-y-4")
      productCard.classList.add("opacity-100", "translate-y-0")
    }, index * 100)
  })
}

// Update the createAdminProductCard function to include proper delete functionality
function createAdminProductCard(product, index) {
  const card = document.createElement("div")
  card.className =
    "admin-product-card glass rounded-lg p-4 flex items-center gap-4 opacity-0 translate-y-4 transition-all duration-300"
  card.dataset.productId = product.id

  card.innerHTML = `
        <div class="relative w-16 h-16 rounded-lg overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.src='/placeholder.svg'">
        </div>

        <div class="flex-1">
            <h3 class="font-semibold text-lg">${product.name}</h3>
            <p class="text-cyan-400 font-bold">$${product.price.toFixed(2)}</p>
            <p class="text-gray-400 text-sm">${product.category}</p>
            <p class="text-gray-500 text-xs">Added: ${new Date(product.dateAdded).toLocaleDateString()}</p>
        </div>

        <div class="flex items-center gap-2">
            <button class="edit-btn p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-all duration-300 group" title="Edit Product">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            </button>
            <button class="delete-btn p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-300 group" title="Delete Product">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </div>
    `

  // Add event listeners for edit and delete
  const editBtn = card.querySelector(".edit-btn")
  const deleteBtn = card.querySelector(".delete-btn")

  editBtn.addEventListener("click", () => editProduct(product.id))
  deleteBtn.addEventListener("click", () => deleteProduct(product.id))

  return card
}

// Delete Product
function deleteProduct(productId) {
  const product = adminProducts.find((p) => p.id === productId)
  if (!product) return

  // Create custom confirmation modal
  const confirmModal = document.createElement("div")
  confirmModal.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  confirmModal.innerHTML = `
    <div class="glass rounded-2xl p-6 max-w-md w-full">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-white mb-2">Delete Product</h3>
        <p class="text-gray-300 mb-6">Are you sure you want to delete "${product.name}"? This action cannot be undone.</p>
        <div class="flex gap-3 justify-center">
          <button id="cancel-delete" class="px-4 py-2 glass rounded-lg hover:bg-gray-700 transition-all duration-300">
            Cancel
          </button>
          <button id="confirm-delete" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300">
            Delete
          </button>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(confirmModal)

  // Handle confirmation
  const cancelBtn = confirmModal.querySelector("#cancel-delete")
  const confirmBtn = confirmModal.querySelector("#confirm-delete")

  cancelBtn.addEventListener("click", () => {
    document.body.removeChild(confirmModal)
  })

  confirmBtn.addEventListener("click", () => {
    // Remove from array
    adminProducts = adminProducts.filter((p) => p.id !== productId)

    // Update localStorage
    localStorage.setItem("adminProducts", JSON.stringify(adminProducts))

    // Reload products list with animation
    const productCard = document.querySelector(`[data-product-id="${productId}"]`)
    if (productCard) {
      productCard.style.transform = "translateX(-100%)"
      productCard.style.opacity = "0"
      setTimeout(() => {
        loadAdminProducts()
      }, 300)
    }

    // Remove modal
    document.body.removeChild(confirmModal)

    // Show success message
    showSuccessMessage(`"${product.name}" has been deleted successfully!`)
  })

  // Close modal when clicking outside
  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
      document.body.removeChild(confirmModal)
    }
  })
}

// Edit product function (bonus feature)
function editProduct(productId) {
  const product = adminProducts.find((p) => p.id === productId)
  if (!product) return

  // Populate form with existing data
  document.getElementById("name").value = product.name
  document.getElementById("price").value = product.price
  document.getElementById("image").value = product.image
  document.getElementById("category").value = product.category

  // Change form to edit mode
  const form = document.getElementById("product-form")
  const submitBtn = document.getElementById("submit-btn")

  form.dataset.editMode = "true"
  form.dataset.editId = productId

  submitBtn.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
    Update Product
  `

  // Add cancel button
  if (!document.getElementById("cancel-edit")) {
    const cancelBtn = document.createElement("button")
    cancelBtn.type = "button"
    cancelBtn.id = "cancel-edit"
    cancelBtn.className =
      "w-full py-3 mt-2 glass rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
    cancelBtn.textContent = "Cancel Edit"
    cancelBtn.addEventListener("click", cancelEdit)

    submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling)
  }

  // Scroll to form
  document.querySelector(".admin-form").scrollIntoView({ behavior: "smooth" })
}

// Cancel edit function
function cancelEdit() {
  const form = document.getElementById("product-form")
  const submitBtn = document.getElementById("submit-btn")
  const cancelBtn = document.getElementById("cancel-edit")

  // Reset form
  form.reset()
  form.removeAttribute("data-edit-mode")
  form.removeAttribute("data-edit-id")

  // Reset submit button
  submitBtn.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
    </svg>
    Add Product
  `

  // Remove cancel button
  if (cancelBtn) {
    cancelBtn.remove()
  }
}

// Add bulk actions
function addBulkActions() {
  const productsList = document.getElementById("products-list")

  if (adminProducts.length > 0 && !document.getElementById("bulk-actions")) {
    const bulkActionsDiv = document.createElement("div")
    bulkActionsDiv.id = "bulk-actions"
    bulkActionsDiv.className = "flex gap-4 mb-4 p-4 glass rounded-lg"
    bulkActionsDiv.innerHTML = `
      <button id="select-all" class="px-4 py-2 glass rounded-lg hover:bg-gray-700 transition-all duration-300">
        Select All
      </button>
      <button id="delete-selected" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 opacity-50 cursor-not-allowed" disabled>
        Delete Selected
      </button>
      <button id="export-products" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300">
        Export Products
      </button>
    `

    productsList.parentNode.insertBefore(bulkActionsDiv, productsList)

    // Add event listeners for bulk actions
    setupBulkActions()
  }
}

// Setup bulk actions functionality
function setupBulkActions() {
  const selectAllBtn = document.getElementById("select-all")
  const deleteSelectedBtn = document.getElementById("delete-selected")
  const exportBtn = document.getElementById("export-products")

  function toggleSelectAll() {
    console.log("toggleSelectAll function called")
  }

  function deleteSelected() {
    console.log("deleteSelected function called")
  }

  if (selectAllBtn) {
    selectAllBtn.addEventListener("click", toggleSelectAll)
  }

  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener("click", deleteSelected)
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportProducts)
  }
}

// Show Success Message
function showSuccessMessage(message) {
  const successDiv = document.createElement("div")
  successDiv.className =
    "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300"
  successDiv.textContent = message

  document.body.appendChild(successDiv)

  // Animate in
  setTimeout(() => {
    successDiv.classList.remove("translate-x-full")
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    successDiv.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(successDiv)
    }, 300)
  }, 3000)
}

// Setup Animations
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("admin-form")) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateX(0)"
        } else if (entry.target.classList.contains("admin-list")) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateX(0)"
          entry.target.style.transitionDelay = "0.2s"
        }
      }
    })
  }, observerOptions)

  // Observe admin elements
  document.querySelectorAll(".admin-form, .admin-list").forEach((el) => {
    observer.observe(el)
  })
}

// Export products (bonus feature)
function exportProducts() {
  const dataStr = JSON.stringify(adminProducts, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = "swiftcraft-products.json"
  link.click()
  URL.revokeObjectURL(url)
}

// Make functions globally available
window.deleteProduct = deleteProduct
window.exportProducts = exportProducts
