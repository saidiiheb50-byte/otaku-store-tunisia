'use client'

export default function Hero() {
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog')
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Hadrumet Store</h1>
          <p>Your one-stop shop for premium manga stickers, books, and posters. Discover your favorite anime and manga merchandise!</p>
          <div className="hero-logo">
            <img 
              src="/logo.svg" 
              alt="HADRUMET STORE" 
              className="hero-logo-image"
            />
          </div>
          <div className="cta-button-wrapper">
            <a href="#catalog" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToCatalog() }}>
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

