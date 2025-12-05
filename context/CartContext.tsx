'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, change: number) => void
  getCartCount: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Only access localStorage after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error loading cart from localStorage', e)
      }
    }
  }, [])

  useEffect(() => {
    // Only update localStorage on client-side after mount
    if (isMounted) {
      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        localStorage.removeItem('cart')
      }
    }
  }, [cart, isMounted])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId)
      if (!item) return prevCart

      const newQuantity = item.quantity + change
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== productId)
      }

      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    })
  }

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

