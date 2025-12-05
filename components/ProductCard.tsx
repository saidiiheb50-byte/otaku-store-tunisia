'use client'

import { Product } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
  onProductClick: (product: Product) => void
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div 
      className="product-card" 
      onClick={() => onProductClick(product)}
      role="article"
      aria-label={product.name}
    >
      <div className="product-image" aria-hidden="true">
        <span>{product.image}</span>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price" aria-label={`Price: ${product.price.toFixed(2)} TND`}>
            {product.price.toFixed(2)} TND
          </span>
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
  )
}

