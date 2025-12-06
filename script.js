// Product Data - Load from localStorage or use default
let products = JSON.parse(localStorage.getItem('storeProducts')) || [
    // Stickers
    { id: 1, name: "Naruto Sticker Pack", category: "stickers", price: 15.00, description: "Set of 10 high-quality Naruto character stickers", image: "🎌" },
    { id: 2, name: "One Piece Sticker Pack", category: "stickers", price: 15.00, description: "Set of 10 One Piece character stickers", image: "🏴‍☠️" },
    { id: 3, name: "Dragon Ball Z Stickers", category: "stickers", price: 12.00, description: "Set of 8 Dragon Ball Z character stickers", image: "🐉" },
    { id: 4, name: "Attack on Titan Stickers", category: "stickers", price: 18.00, description: "Set of 12 Attack on Titan themed stickers", image: "⚔️" },
    { id: 5, name: "My Hero Academia Stickers", category: "stickers", price: 16.00, description: "Set of 10 My Hero Academia character stickers", image: "🦸" },
    { id: 6, name: "Demon Slayer Stickers", category: "stickers", price: 17.00, description: "Set of 10 Demon Slayer character stickers", image: "🗡️" },
    
    // Books
    { id: 7, name: "Naruto Volume 1", category: "books", price: 25.00, description: "First volume of the Naruto manga series", image: "📖" },
    { id: 8, name: "One Piece Volume 1", category: "books", price: 25.00, description: "First volume of the One Piece manga series", image: "📚" },
    { id: 9, name: "Dragon Ball Z Complete Set", category: "books", price: 150.00, description: "Complete Dragon Ball Z manga collection (6 volumes)", image: "📕" },
    { id: 10, name: "Attack on Titan Volume 1", category: "books", price: 28.00, description: "First volume of Attack on Titan manga", image: "📗" },
    { id: 11, name: "My Hero Academia Volume 1", category: "books", price: 26.00, description: "First volume of My Hero Academia manga", image: "📘" },
    { id: 12, name: "Demon Slayer Volume 1", category: "books", price: 27.00, description: "First volume of Demon Slayer manga", image: "📙" },
    { id: 13, name: "Tokyo Ghoul Complete Set", category: "books", price: 200.00, description: "Complete Tokyo Ghoul manga collection (14 volumes)", image: "📓" },
    { id: 14, name: "Death Note Complete Set", category: "books", price: 180.00, description: "Complete Death Note manga collection (12 volumes)", image: "📔" },
    
    // Posters
    { id: 15, name: "Naruto Poster A3", category: "posters", price: 20.00, description: "High-quality A3 size Naruto character poster", image: "🖼️" },
    { id: 16, name: "One Piece Poster A3", category: "posters", price: 20.00, description: "High-quality A3 size One Piece poster", image: "🎨" },
    { id: 17, name: "Dragon Ball Z Poster A2", category: "posters", price: 30.00, description: "Large A2 size Dragon Ball Z poster", image: "🖼️" },
    { id: 18, name: "Attack on Titan Poster A3", category: "posters", price: 22.00, description: "High-quality A3 size Attack on Titan poster", image: "🎨" },
    { id: 19, name: "My Hero Academia Poster Set", category: "posters", price: 50.00, description: "Set of 3 A3 My Hero Academia posters", image: "🖼️" },
    { id: 20, name: "Demon Slayer Poster A3", category: "posters", price: 21.00, description: "High-quality A3 size Demon Slayer poster", image: "🎨" },
    { id: 21, name: "Studio Ghibli Poster Collection", category: "posters", price: 60.00, description: "Set of 4 A3 Studio Ghibli movie posters", image: "🖼️" },
    { id: 22, name: "Anime Characters Collage Poster", category: "posters", price: 35.00, description: "Large A2 poster featuring multiple anime characters", image: "🎨" }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cached DOM elements
const DOMCache = {
    featuredProducts: null,
    catalogProducts: null,
    searchInput: null,
    cartItems: null,
    cartCount: null,
    modal: null,
    productDetail: null,
    navbar: null,
    themeToggle: null,
    themeIcon: null,
    themeText: null
};

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme Management - Time-Aware
const ThemeManager = {
    currentTheme: 'auto', // 'light', 'dark', or 'auto'
    checkInterval: null,
    
    // Get current time of day (day or night)
    getTimeOfDay() {
        const now = new Date();
        const hour = now.getHours();
        // Consider 6 AM to 8 PM as day, rest as night
        return (hour >= 6 && hour < 20) ? 'day' : 'night';
    },
    
    // Get stored theme preference or default to 'auto'
    getStoredTheme() {
        return localStorage.getItem('theme') || 'auto';
    },
    
    // Save theme preference
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    },
    
    // Apply theme to document
    applyTheme(theme = null) {
        const themeToApply = theme || this.currentTheme;
        const html = document.documentElement;
        
        // Remove existing theme attributes
        html.removeAttribute('data-theme');
        html.removeAttribute('data-time');
        
        if (themeToApply === 'auto') {
            html.setAttribute('data-theme', 'auto');
            const timeOfDay = this.getTimeOfDay();
            html.setAttribute('data-time', timeOfDay);
        } else {
            html.setAttribute('data-theme', themeToApply);
        }
        
        this.updateThemeToggleUI(themeToApply);
    },
    
    // Update theme toggle button UI
    updateThemeToggleUI(theme) {
        if (!DOMCache.themeIcon || !DOMCache.themeText) return;
        
        let icon, text;
        
        if (theme === 'auto') {
            const timeOfDay = this.getTimeOfDay();
            icon = timeOfDay === 'night' ? '🌙' : '☀️';
            text = 'Auto';
        } else if (theme === 'dark') {
            icon = '🌙';
            text = 'Dark';
        } else {
            icon = '☀️';
            text = 'Light';
        }
        
        DOMCache.themeIcon.textContent = icon;
        DOMCache.themeText.textContent = text;
        
        // Update aria-label
        if (DOMCache.themeToggle) {
            DOMCache.themeToggle.setAttribute('aria-label', `Current theme: ${text}. Click to change theme.`);
        }
    },
    
    // Toggle between themes: auto -> light -> dark -> auto
    toggleTheme() {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        this.saveTheme(nextTheme);
        this.applyTheme(nextTheme);
        
        // If switching to auto, start checking time
        if (nextTheme === 'auto') {
            this.startTimeCheck();
        } else {
            this.stopTimeCheck();
        }
    },
    
    // Start checking time periodically for auto theme
    startTimeCheck() {
        // Check every minute
        this.checkInterval = setInterval(() => {
            if (this.currentTheme === 'auto') {
                const timeOfDay = this.getTimeOfDay();
                const currentTime = document.documentElement.getAttribute('data-time');
                
                if (currentTime !== timeOfDay) {
                    this.applyTheme('auto');
                }
            }
        }, 60000); // Check every minute
    },
    
    // Stop time checking
    stopTimeCheck() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    },
    
    // Initialize theme system
    init() {
        // Get stored preference or default to auto
        this.currentTheme = this.getStoredTheme();
        
        // Apply theme
        this.applyTheme(this.currentTheme);
        
        // Start time checking if auto mode
        if (this.currentTheme === 'auto') {
            this.startTimeCheck();
        }
        
        // Setup theme toggle button
        if (DOMCache.themeToggle) {
            DOMCache.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
};

// Initialize theme
function initTheme() {
    ThemeManager.init();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    initTheme();
    initNavigation();
    loadFeaturedProducts();
    loadCatalogProducts();
    loadStickersSection();
    loadPostersSection();
    setupEventListeners();
    initAdminPanel();
    updateCartCount();
    loadCart();
});

// Cache DOM elements for better performance
function cacheDOMElements() {
    DOMCache.featuredProducts = document.getElementById('featuredProducts');
    DOMCache.catalogProducts = document.getElementById('catalogProducts');
    DOMCache.searchInput = document.getElementById('searchInput');
    DOMCache.cartItems = document.getElementById('cartItems');
    DOMCache.cartCount = document.getElementById('cartCount');
    DOMCache.modal = document.getElementById('productModal');
    DOMCache.productDetail = document.getElementById('productDetail');
    DOMCache.navbar = document.getElementById('navbar');
    DOMCache.themeToggle = document.getElementById('themeToggle');
    DOMCache.themeIcon = document.getElementById('themeIcon');
    DOMCache.themeText = document.getElementById('themeText');
}

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive.toString());
        });
    }
    
    // Close mobile menu on link click
    if (navMenu && hamburger) {
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Load Featured Products
function loadFeaturedProducts() {
    if (!DOMCache.featuredProducts) return;
    
    const featured = products.slice(0, 6);
    DOMCache.featuredProducts.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Load Catalog Products
function loadCatalogProducts(filteredProducts = products) {
    if (!DOMCache.catalogProducts) return;
    
    if (filteredProducts.length === 0) {
        DOMCache.catalogProducts.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: var(--text-light);">No products found</p>';
        return;
    }
    
    DOMCache.catalogProducts.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Load Stickers Section
function loadStickersSection() {
    const stickersContainer = document.getElementById('stickersProducts');
    if (!stickersContainer) return;
    
    const stickers = products.filter(p => p.category === 'stickers');
    if (stickers.length === 0) {
        stickersContainer.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: var(--text-light);">No stickers available</p>';
        return;
    }
    
    stickersContainer.innerHTML = stickers.map(product => createProductCard(product)).join('');
}

// Load Posters Section
function loadPostersSection() {
    const postersContainer = document.getElementById('postersProducts');
    if (!postersContainer) return;
    
    const posters = products.filter(p => p.category === 'posters');
    if (posters.length === 0) {
        postersContainer.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: var(--text-light);">No posters available</p>';
        return;
    }
    
    postersContainer.innerHTML = posters.map(product => createProductCard(product)).join('');
}

// Generate otaku-friendly placeholder image URL
function getOtakuPlaceholderImage(product) {
    // Use placeholder.com with anime/manga theme colors
    const width = 400;
    const height = 400;
    
    // Category-based color schemes (anime-themed)
    const categoryColors = {
        'stickers': { bg: 'E91E63', accent: 'FF6B9D' }, // Pink/Magenta
        'books': { bg: '9C27B0', accent: 'BA68C8' },    // Purple
        'posters': { bg: 'FF5722', accent: 'FF8A65' }   // Orange/Red
    };
    
    const colors = categoryColors[product.category] || categoryColors['stickers'];
    const textColor = 'FFFFFF';
    const text = encodeURIComponent(product.name.substring(0, 15));
    
    // Create gradient-style placeholder with anime theme
    // Using placehold.co with custom styling
    return `https://placehold.co/${width}x${height}/${colors.bg}/${textColor}?text=${text}&font=poppins`;
}

// Create Product Card - with accessibility improvements
function createProductCard(product) {
    const imageUrl = product.imageUrl || getOtakuPlaceholderImage(product);
    const discount = product.discount || 0;
    const finalPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
    
    return `
        <div class="product-card" data-product-id="${product.id}" role="article" aria-label="${product.name}">
            ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
            <div class="product-image" aria-hidden="true">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image-fallback" style="display: none;">
                    <span class="product-emoji">${product.image || '🎌'}</span>
                    <div class="product-image-pattern"></div>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="price-container">
                        ${discount > 0 ? `<span class="product-price-old">${product.price.toFixed(2)} TND</span>` : ''}
                        <span class="product-price" aria-label="Price: ${finalPrice.toFixed(2)} TND">${finalPrice.toFixed(2)} TND</span>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Setup Event Listeners with event delegation for better performance
function setupEventListeners() {
    // Search with debouncing (300ms delay)
    if (DOMCache.searchInput) {
        DOMCache.searchInput.addEventListener('input', debounce((e) => {
            filterProducts(e.target.value);
        }, 300));
    }
    
    // Category Filters - using event delegation
    const catalogControls = document.querySelector('.catalog-controls');
    if (catalogControls) {
        catalogControls.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                e.target.classList.add('active');
                e.target.setAttribute('aria-pressed', 'true');
                const category = e.target.dataset.category;
                filterByCategory(category);
            }
        });
    }
    
    // Footer category links
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-category]');
            if (link) {
                e.preventDefault();
                const category = link.dataset.category;
                const filterBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
                if (filterBtn) {
                    filterBtn.click();
                    window.location.hash = '#catalog';
                    const catalogSection = document.getElementById('catalog');
                    if (catalogSection) {
                        window.scrollTo({ top: catalogSection.offsetTop - 80, behavior: 'smooth' });
                    }
                }
            }
        });
    }
    
    // Modal - using cached elements
    if (DOMCache.modal) {
        const closeModal = DOMCache.modal.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', closeModalHandler);
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === DOMCache.modal) {
                closeModalHandler();
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOMCache.modal.style.display === 'block') {
                closeModalHandler();
            }
        });
    }
    
    function closeModalHandler() {
        if (DOMCache.modal) {
            DOMCache.modal.style.display = 'none';
            DOMCache.modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }
    
    // Product cards and buttons - event delegation for better performance
    document.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        
        if (addToCartBtn) {
            e.stopPropagation();
            const productId = parseInt(addToCartBtn.dataset.productId);
            if (productId) addToCart(productId);
        } else if (productCard) {
            const productId = parseInt(productCard.dataset.productId);
            if (productId) showProductDetail(productId);
        }
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.hash = '#checkout';
                const checkoutSection = document.getElementById('checkout');
                if (checkoutSection) {
                    window.scrollTo({ top: checkoutSection.offsetTop - 80, behavior: 'smooth' });
                }
                updateCheckoutSummary();
            }
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    // Delivery method change - using event delegation
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
        checkoutSection.addEventListener('change', (e) => {
            if (e.target.name === 'deliveryMethod') {
                updateCheckoutSummary();
            }
        });
    }
}

// Filter Products - optimized with early returns
function filterProducts(searchTerm) {
    const activeFilter = document.querySelector('.filter-btn.active');
    const category = activeFilter?.dataset.category || 'all';
    
    // Use filter with single pass for better performance
    const term = searchTerm ? searchTerm.toLowerCase().trim() : '';
    
    const filtered = products.filter(p => {
        // Category filter
        if (category !== 'all' && p.category !== category) return false;
        
        // Search filter
        if (term) {
            return p.name.toLowerCase().includes(term) || 
                   p.description.toLowerCase().includes(term) ||
                   p.category.toLowerCase().includes(term);
        }
        
        return true;
    });
    
    loadCatalogProducts(filtered);
}

// Filter by Category
function filterByCategory(category) {
    updateFilterButtonStates(category);
    const searchTerm = DOMCache.searchInput?.value || '';
    filterProducts(searchTerm);
}

// Show Product Detail - using cached elements
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !DOMCache.modal || !DOMCache.productDetail) return;
    
    const imageUrl = product.imageUrl || getOtakuPlaceholderImage(product);
    const discount = product.discount || 0;
    const finalPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
    
    DOMCache.productDetail.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image" aria-hidden="true">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image-fallback" style="display: none;">
                    <span class="product-emoji">${product.image || '🎌'}</span>
                    <div class="product-image-pattern"></div>
                </div>
            </div>
            <div class="product-detail-info">
                <span class="product-category">${product.category}</span>
                <h2 id="modal-title">${product.name}</h2>
                <div class="price-container">
                    ${discount > 0 ? `<span class="product-price-old">${product.price.toFixed(2)} TND</span>` : ''}
                    <div class="product-price" aria-label="Price: ${finalPrice.toFixed(2)} TND">${finalPrice.toFixed(2)} TND</div>
                </div>
                ${discount > 0 ? `<div style="color: var(--accent-color); font-weight: 600; margin-top: 0.5rem;">${discount}% OFF!</div>` : ''}
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}" style="padding: 1rem 2rem; font-size: 1.1rem;" aria-label="Add ${product.name} to cart">Add to Cart</button>
            </div>
        </div>
    `;
    
    DOMCache.modal.style.display = 'block';
    DOMCache.modal.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    const closeBtn = DOMCache.modal.querySelector('.close-modal');
    if (closeBtn) closeBtn.focus();
    
    // Trap focus in modal
    document.body.style.overflow = 'hidden';
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    loadCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCart();
    updateCheckoutSummary();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        loadCart();
        updateCheckoutSummary();
    }
}

// Save Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count - using cached element
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (DOMCache.cartCount) {
        DOMCache.cartCount.textContent = count;
        DOMCache.cartCount.setAttribute('aria-label', `${count} items in cart`);
    }
}

// Load Cart - using cached element and event delegation
function loadCart() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!DOMCache.cartItems) return;
    
    if (cart.length === 0) {
        DOMCache.cartItems.innerHTML = '<p class="empty-cart" role="status">Your cart is empty</p>';
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.setAttribute('aria-disabled', 'true');
            checkoutBtn.removeAttribute('style'); // Remove any inline styles
        }
        return;
    }
    
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.removeAttribute('disabled'); // Ensure it's not disabled
        checkoutBtn.setAttribute('aria-disabled', 'false');
        checkoutBtn.removeAttribute('style'); // Remove any inline styles
    }
    
    // Use data attributes instead of inline onclick for better performance
    DOMCache.cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image" aria-hidden="true">
                <span>${item.image}</span>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toFixed(2)} TND</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" data-action="decrease" data-product-id="${item.id}" aria-label="Decrease quantity">−</button>
                    <span class="quantity-value" aria-live="polite">${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-product-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <button class="remove-item-btn" data-action="remove" data-product-id="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
            </div>
        </div>
    `).join('');
    
    // Add event delegation for cart controls
    setupCartEventListeners();
    
    updateCartSummary();
}

// Setup cart event listeners using delegation
function setupCartEventListeners() {
    if (!DOMCache.cartItems) return;
    
    DOMCache.cartItems.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        
        const productId = parseInt(btn.dataset.productId);
        const action = btn.dataset.action;
        
        if (action === 'increase') {
            updateQuantity(productId, 1);
        } else if (action === 'decrease') {
            updateQuantity(productId, -1);
        } else if (action === 'remove') {
            removeFromCart(productId);
        }
    });
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} TND`;
    if (totalEl) totalEl.textContent = `${total.toFixed(2)} TND`;
}

// Update Checkout Summary
function updateCheckoutSummary() {
    const summaryContainer = document.getElementById('checkoutSummary');
    if (!summaryContainer) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value;
    const shipping = deliveryMethod === 'pickup' ? 0 : 5.00;
    const total = subtotal + shipping;
    
    summaryContainer.innerHTML = `
        ${cart.map(item => `
            <div class="summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)} TND</span>
            </div>
        `).join('')}
        <div class="summary-item" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
            <span><strong>Subtotal</strong></span>
            <span><strong>${subtotal.toFixed(2)} TND</strong></span>
        </div>
        <div class="summary-item">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)} TND</span>
        </div>
        <div class="summary-item" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--primary-color); font-size: 1.2rem; font-weight: 700;">
            <span>Total</span>
            <span style="color: var(--primary-color);">${total.toFixed(2)} TND</span>
        </div>
    `;
}

// Handle Checkout
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = data.deliveryMethod === 'pickup' ? 0 : 5.00;
    const total = subtotal + shipping;
    
    // Create order summary
    const orderSummary = {
        customer: {
            name: data.customerName,
            phone: data.customerPhone,
            email: data.customerEmail || 'N/A'
        },
        address: {
            full: data.deliveryAddress,
            city: data.city,
            postalCode: data.postalCode || 'N/A'
        },
        delivery: {
            method: data.deliveryMethod,
            cost: shipping
        },
        items: cart,
        totals: {
            subtotal: subtotal,
            shipping: shipping,
            total: total
        },
        date: new Date().toISOString()
    };
    
    // In a real application, send this to your server
    console.log('Order placed:', orderSummary);
    
    // Show success message
    const messageEl = document.getElementById('orderMessage');
    if (messageEl) {
        messageEl.className = 'form-message success';
        messageEl.textContent = `Thank you ${data.customerName}! Your order has been placed. We will contact you at ${data.customerPhone} to confirm. Order Total: ${total.toFixed(2)} TND`;
        messageEl.style.display = 'block';
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    loadCart();
    
    // Reset form
    e.target.reset();
    
    // In a real application, you would send this data to your server:
    // fetch('/api/orders', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderSummary)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle success
    // })
    // .catch(error => {
    //     // Handle error
    // });
}

// Show Notification - improved with accessibility
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--accent-color)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect - optimized with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    
    scrollTimeout = requestAnimationFrame(() => {
        if (DOMCache.navbar) {
            if (window.scrollY > 100) {
                DOMCache.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                DOMCache.navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
        scrollTimeout = null;
    });
}, { passive: true });

// ==================== ADMIN PANEL FUNCTIONALITY ====================

// Admin password (change this to your desired password)
const ADMIN_PASSWORD = 'admin123'; // Change this!

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('storeProducts', JSON.stringify(products));
}

// Initialize Admin Panel
function initAdminPanel() {
    // Check if admin is logged in
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    if (isAdminLoggedIn) {
        showAdminPanel();
    }
    
    // Admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                showAdminPanel();
                const adminLink = document.getElementById('adminLink');
                if (adminLink) adminLink.style.display = 'block';
            } else {
                alert('Incorrect password!');
            }
        });
    }
    
    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchAdminTab(tabName);
        });
    });
    
    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
        setupImageUpload();
    }
    
    // Cancel edit
    const cancelEdit = document.getElementById('cancelEdit');
    if (cancelEdit) {
        cancelEdit.addEventListener('click', () => {
            resetProductForm();
            switchAdminTab('add');
        });
    }
    
    // Load admin products list
    loadAdminProductsList();
}

function showAdminPanel() {
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');
    if (adminLogin) adminLogin.style.display = 'none';
    if (adminPanel) adminPanel.style.display = 'block';
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`${tabName}Tab`);
    if (targetTab) targetTab.classList.add('active');
    
    if (tabName === 'products') {
        loadAdminProductsList();
    }
}

// Image Upload with Validation
function setupImageUpload() {
    const imageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    const imageInfo = document.getElementById('imageInfo');
    
    if (!imageInput) return;
    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            if (imageInfo) {
                imageInfo.textContent = 'Error: Only JPG, PNG, and WebP images are allowed!';
                imageInfo.className = 'image-info error';
            }
            if (imagePreview) imagePreview.style.display = 'none';
            imageInput.value = '';
            return;
        }
        
        // Validate file size (2MB max)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            if (imageInfo) {
                imageInfo.textContent = `Error: Image size must be less than 2MB! (Current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`;
                imageInfo.className = 'image-info error';
            }
            if (imagePreview) imagePreview.style.display = 'none';
            imageInput.value = '';
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            if (imagePreview) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">`;
                imagePreview.style.display = 'block';
            }
            if (imageInfo) {
                imageInfo.textContent = `Image: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`;
                imageInfo.className = 'image-info success';
            }
        };
        reader.readAsDataURL(file);
    });
}

// Handle Product Form Submit
function handleProductSubmit(e) {
    e.preventDefault();
    
    const productId = document.getElementById('productId').value;
    const imageInput = document.getElementById('productImage');
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        discount: parseInt(document.getElementById('productDiscount').value) || 0,
        description: document.getElementById('productDescription').value,
        image: getCategoryEmoji(document.getElementById('productCategory').value)
    };
    
    // Handle image upload
    if (imageInput && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            productData.imageUrl = e.target.result; // Store as base64
            saveProduct(productData, productId);
        };
        reader.readAsDataURL(file);
    } else {
        // If editing and no new image, keep existing imageUrl
        if (productId) {
            const existingProduct = products.find(p => p.id === parseInt(productId));
            if (existingProduct && existingProduct.imageUrl) {
                productData.imageUrl = existingProduct.imageUrl;
            }
        }
        saveProduct(productData, productId);
    }
}

function saveProduct(productData, productId) {
    if (productId) {
        // Edit existing product
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Add new product
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...productData });
    }
    
    saveProducts();
    resetProductForm();
    loadAdminProductsList();
    loadFeaturedProducts();
    loadCatalogProducts();
    loadStickersSection();
    loadPostersSection();
    
    showNotification('Product saved successfully!', 'success');
    switchAdminTab('products');
}

function resetProductForm() {
    const form = document.getElementById('productForm');
    if (form) form.reset();
    const productId = document.getElementById('productId');
    if (productId) productId.value = '';
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
    }
    const imageInfo = document.getElementById('imageInfo');
    if (imageInfo) imageInfo.textContent = '';
    const formTitle = document.getElementById('productFormTitle');
    if (formTitle) formTitle.textContent = 'Add New Product';
    const cancelEdit = document.getElementById('cancelEdit');
    if (cancelEdit) cancelEdit.style.display = 'none';
}

function loadAdminProductsList() {
    const productsList = document.getElementById('adminProductsList');
    if (!productsList) return;
    
    if (products.length === 0) {
        productsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-secondary);">No products yet. Add your first product!</p>';
        return;
    }
    
    productsList.innerHTML = products.map(product => {
        const discount = product.discount || 0;
        const finalPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
        
        return `
            <div class="admin-product-item">
                <div class="admin-product-image">
                    ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="max-width: 80px; max-height: 80px; object-fit: cover; border-radius: 8px;">` : `<span style="font-size: 2rem;">${product.image || '🎌'}</span>`}
                </div>
                <div class="admin-product-info">
                    <h4>${product.name}</h4>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Price:</strong> ${product.price.toFixed(2)} TND ${discount > 0 ? `<span style="color: var(--accent-color);">(${discount}% off - ${finalPrice.toFixed(2)} TND)</span>` : ''}</p>
                    <p><strong>Description:</strong> ${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}</p>
                </div>
                <div class="admin-product-actions">
                    <button class="admin-btn admin-btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDiscount').value = product.discount || 0;
    document.getElementById('productDescription').value = product.description;
    const formTitle = document.getElementById('productFormTitle');
    if (formTitle) formTitle.textContent = 'Edit Product';
    
    // Show existing image if available
    if (product.imageUrl) {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            imagePreview.innerHTML = `<img src="${product.imageUrl}" alt="Current image" style="max-width: 100%; max-height: 200px; border-radius: 8px;">`;
            imagePreview.style.display = 'block';
        }
    }
    
    const cancelEdit = document.getElementById('cancelEdit');
    if (cancelEdit) cancelEdit.style.display = 'inline-block';
    
    switchAdminTab('add');
    const addTab = document.getElementById('addTab');
    if (addTab) addTab.scrollIntoView({ behavior: 'smooth' });
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        loadAdminProductsList();
        loadFeaturedProducts();
        loadCatalogProducts();
        loadStickersSection();
        loadPostersSection();
        showNotification('Product deleted successfully!', 'success');
    }
}

function getCategoryEmoji(category) {
    const emojis = {
        'stickers': '🎌',
        'books': '📖',
        'posters': '🖼️'
    };
    return emojis[category] || '🎌';
}

// Make functions globally available
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

// Update filter button aria-pressed states
function updateFilterButtonStates(activeCategory) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.category === activeCategory;
        btn.setAttribute('aria-pressed', isActive.toString());
    });
}
