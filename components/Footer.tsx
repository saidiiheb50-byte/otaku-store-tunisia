export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Otaku Store Tunisia</h3>
            <p>Your trusted source for manga merchandise in Tunisia.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Home</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Catalog</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Stickers</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Books</a></li>
              <li><a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Posters</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Otaku Store Tunisia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

