// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    mobileMenuToggle.classList.toggle("active")
  })
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    mobileMenuToggle.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    console.log("[v0] Form submitted with data:", data)

    // Hide form and show success message
    contactForm.style.display = "none"
    formSuccess.classList.add("show")

    // Reset form after 5 seconds
    setTimeout(() => {
      contactForm.reset()
      contactForm.style.display = "flex"
      formSuccess.classList.remove("show")
    }, 5000)
  })
}

// Smooth scroll for anchor links
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

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
const animateElements = document.querySelectorAll(".service-card, .event-card, .gallery-item")
animateElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

const carouselTrack = document.getElementById("carouselTrack")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const dotsContainer = document.getElementById("carouselDots")

if (carouselTrack) {
  const slides = carouselTrack.querySelectorAll(".carousel-slide")
  let currentSlide = 0
  const totalSlides = slides.length

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button")
    dot.classList.add("carousel-dot")
    if (index === 0) dot.classList.add("active")
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`)
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })

  const dots = dotsContainer.querySelectorAll(".carousel-dot")

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  function goToSlide(index) {
    currentSlide = index
    updateCarousel()
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    updateCarousel()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    updateCarousel()
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  if (prevBtn) prevBtn.addEventListener("click", prevSlide)

  // Auto-advance carousel
  let autoplayInterval = setInterval(nextSlide, 5000)

  // Pause autoplay on hover
  carouselTrack.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval)
  })

  carouselTrack.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(nextSlide, 5000)
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide()
    if (e.key === "ArrowRight") nextSlide()
  })
}
