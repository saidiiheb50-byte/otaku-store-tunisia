# Auto Ecole - Next.js Application

This is a Next.js application for Otaku Store Tunisia, built with React and TypeScript.

## Features

- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart functionality
- 💳 Checkout process
- 📱 Responsive design
- ⚡ Fast performance with Next.js
- 🎨 Modern UI with animations

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
autoecole/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── FeaturedProducts.tsx
│   ├── Catalog.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ProductModal.tsx
├── context/
│   └── CartContext.tsx  # Cart state management
├── data/
│   └── products.ts      # Product data
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Styling

## Features in Development

- [ ] User authentication
- [ ] Payment integration
- [ ] Order tracking
- [ ] Product reviews
- [ ] Admin dashboard

## License

ISC
