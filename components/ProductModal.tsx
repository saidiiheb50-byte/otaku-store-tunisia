'use client'

import { useEffect } from 'react'
import { Product } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAddToCart = () => {
    addToCart(product)
    onClose()
  }

  return (
    <div 
      className="modal" 
      style={{ display: 'block' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <button 
          className="close-modal" 
          onClick={onClose}
          aria-label="Close product details"
        >
          &times;
        </button>
        <div className="product-detail">
          <div className="product-detail-image" aria-hidden="true">
            <span>{product.image}</span>
          </div>
          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h2 id="modal-title">{product.name}</h2>
            <div className="product-price" aria-label={`Price: ${product.price.toFixed(2)} TND`}>
              {product.price.toFixed(2)} TND
            </div>
            <p className="product-description">{product.description}</p>
            <div className="animated-button-wrapper">
              <button 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

