'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'admin123' // Change this to your desired password

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if admin is already logged in
    if (typeof window !== 'undefined') {
      const adminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'
      setIsLoggedIn(adminLoggedIn)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true')
      setIsLoggedIn(true)
      setError('')
      setPassword('')
    } else {
      setError('Incorrect password!')
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    setIsLoggedIn(false)
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <section id="admin" className="admin-section">
        <div className="container">
          <h2 className="section-title">Admin Panel</h2>
          <div className="admin-login">
            <div className="admin-login-box">
              <h3>Admin Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="adminPassword">Password</label>
                  <input
                    type="password"
                    id="adminPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                {error && <div className="admin-error">{error}</div>}
                <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%' }}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="admin" className="admin-section">
      <div className="container">
        <div className="admin-header">
          <h2 className="section-title">Admin Panel - Back Office</h2>
          <button onClick={handleLogout} className="admin-btn admin-btn-secondary">
            Logout
          </button>
        </div>
        <div className="admin-panel-content">
          <p>Admin panel is ready for implementation.</p>
          <p>You can add product management, order management, and other admin features here.</p>
        </div>
      </div>
    </section>
  )
}

