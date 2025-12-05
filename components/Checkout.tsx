'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'home'
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = formData.deliveryMethod === 'pickup' ? 0 : 5.00
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const orderSummary = {
      customer: {
        name: formData.customerName,
        phone: formData.customerPhone,
        email: formData.customerEmail || 'N/A'
      },
      address: {
        full: formData.deliveryAddress,
        city: formData.city,
        postalCode: formData.postalCode || 'N/A'
      },
      delivery: {
        method: formData.deliveryMethod,
        cost: shipping
      },
      items: cart,
      totals: {
        subtotal: subtotal,
        shipping: shipping,
        total: total
      },
      date: new Date().toISOString()
    }

    console.log('Order placed:', orderSummary)
    
    setMessage({
      type: 'success',
      text: `Thank you ${formData.customerName}! Your order has been placed. We will contact you at ${formData.customerPhone} to confirm. Order Total: ${total.toFixed(2)} TND`
    })

    clearCart()
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      deliveryAddress: '',
      city: '',
      postalCode: '',
      deliveryMethod: 'home'
    })
  }

  return (
    <section id="checkout" className="checkout-section">
      <div className="container">
        <h2 className="section-title">Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Full Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="customerEmail">Email</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Delivery Address</h3>
            <div className="form-group">
              <label htmlFor="deliveryAddress">Full Address *</label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                rows={3}
                required
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Delivery Method</h3>
            <div className="delivery-options">
              <label className="delivery-option">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="home"
                  checked={formData.deliveryMethod === 'home'}
                  onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                />
                <span>Home Delivery (5 TND)</span>
              </label>
              <label className="delivery-option">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                />
                <span>Store Pickup (Free)</span>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Order Summary</h3>
            <div id="checkoutSummary">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} TND</span>
                </div>
              ))}
              <div className="summary-item" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span><strong>Subtotal</strong></span>
                <span><strong>{subtotal.toFixed(2)} TND</strong></span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)} TND</span>
              </div>
              <div className="summary-item" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid var(--primary-color)', fontSize: '1.2rem', fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary-color)' }}>{total.toFixed(2)} TND</span>
              </div>
            </div>
          </div>

          <div className="animated-button-wrapper" style={{ width: '100%' }}>
            <button type="submit" className="submit-order-btn">Place Order</button>
          </div>
        </form>
        {message && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </section>
  )
}

