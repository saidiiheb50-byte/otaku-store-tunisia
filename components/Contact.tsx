export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p><a href="tel:+21612345678">+216 12 345 678</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/21612345678" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:info@otakustore.tn">info@otakustore.tn</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Store Location</h3>
                <p>Tunis, Tunisia</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div>
                <h3>Opening Hours</h3>
                <p>Monday - Saturday: 10:00 - 20:00<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



