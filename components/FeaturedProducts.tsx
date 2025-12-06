'use client'

import { Product } from '@/context/CartContext'
import { products } from '@/data/products'
import ProductCard from './ProductCard'

interface FeaturedProductsProps {
  onProductClick: (product: Product) => void
}

export default function FeaturedProducts({ onProductClick }: FeaturedProductsProps) {
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}




