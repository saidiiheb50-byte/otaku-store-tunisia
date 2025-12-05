import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Otaku Store Tunisia - Manga Stickers, Books & Posters',
  description: 'Your one-stop shop for premium manga stickers, books, and posters in Tunisia',
  keywords: ['manga', 'anime', 'stickers', 'books', 'posters', 'otaku', 'tunisia', 'merchandise'],
  authors: [{ name: 'Otaku Store Tunisia' }],
  openGraph: {
    title: 'Otaku Store Tunisia - Manga Stickers, Books & Posters',
    description: 'Your one-stop shop for premium manga stickers, books, and posters in Tunisia',
    type: 'website',
  },
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Otaku Store Tunisia",
              "description": "Premium manga stickers, books, and posters store in Tunisia",
              "url": "https://otakustore.tn",
              "telephone": "+21612345678",
              "email": "info@otakustore.tn",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tunis",
                "addressCountry": "TN"
              },
              "openingHours": "Mo-Sa 10:00-20:00"
            })
          }}
        />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

