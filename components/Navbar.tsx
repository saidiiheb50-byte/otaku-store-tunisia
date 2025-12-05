'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar" id="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <h2>🎌 Otaku Store Tunisia</h2>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
            <li>
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
                Home
              </a>
            </li>
            <li>
              <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>
                Catalog
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
                Contact
              </a>
            </li>
            <li>
              <a 
                href="#cart" 
                className="cart-link"
                onClick={(e) => { e.preventDefault(); scrollToSection('cart') }}
              >
                Cart ({cartCount})
              </a>
            </li>
          </ul>
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

