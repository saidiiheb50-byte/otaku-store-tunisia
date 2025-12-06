'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/context/CartContext'
import { products } from '@/data/products'
import ProductCard from './ProductCard'

interface CatalogProps {
  onProductClick: (product: Product) => void
}

export default function Catalog({ onProductClick }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, activeCategory])

  const categories = ['all', 'stickers', 'books', 'posters']

  return (
    <section id="catalog" className="catalog">
      <div className="container">
        <h2 className="section-title">Our Catalog</h2>
        <div className="catalog-controls">
          <div className="search-box">
            <label htmlFor="searchInput" className="sr-only">Search products</label>
            <input
              type="text"
              id="searchInput"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="category-filters" role="group" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onProductClick}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '3rem', color: 'var(--text-light)' }}>
              No products found
            </p>
          )}
        </div>
      </div>
    </section>
  )
}



