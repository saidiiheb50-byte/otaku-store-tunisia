'use client'

import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartCount } = useCart()

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 5.00
  const total = subtotal + shipping

  const handleCheckout = () => {
    if (cart.length > 0) {
      const checkoutSection = document.getElementById('checkout')
      if (checkoutSection) {
        const offsetTop = checkoutSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <section id="cart" className="cart-section">
      <div className="container">
        <h2 className="section-title">Shopping Cart</h2>
        <div className="cart-container">
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart" role="status">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image" aria-hidden="true">
                    <span>{item.image}</span>
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">{item.price.toFixed(2)} TND</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity-value" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} TND</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping.toFixed(2)} TND</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{total.toFixed(2)} TND</span>
            </div>
            <div className="animated-button-wrapper" style={{ width: '100%' }}>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={cart.length === 0}
                aria-disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

