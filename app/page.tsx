'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Catalog from '@/components/Catalog'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ProductModal from '@/components/ProductModal'
import { CartProvider } from '@/context/CartContext'
import { Product } from '@/context/CartContext'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'catalog', 'about', 'contact', 'cart', 'checkout']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <CartProvider>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <FeaturedProducts onProductClick={openModal} />
        <Catalog onProductClick={openModal} />
        <Cart />
        <Checkout />
        <About />
        <Contact />
      </main>
      <Footer />
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </CartProvider>
  )
}

