// Product Data Array
// Add your Amazon affiliate products here
const products = [
    {
        id: 1,
        name: "Apple AirPods Pro (2nd Gen)",
        description: "Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio",
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop",
        link: "https://amazon.com/airpods-pro",
        category: "Audio"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        description: "AI-powered smartphone with 200MP camera and S Pen",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop",
        link: "https://amazon.com/galaxy-s24",
        category: "Smartphones"
    },
    {
        id: 3,
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise cancellation with premium sound quality",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
        link: "https://amazon.com/sony-wh1000xm5",
        category: "Audio"
    },
    {
        id: 4,
        name: "MacBook Pro 14-inch M3",
        description: "Powerful performance with M3 chip, stunning Liquid Retina XDR display",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
        link: "https://amazon.com/macbook-pro-m3",
        category: "Laptops"
    },
    {
        id: 5,
        name: "iPad Pro 12.9-inch",
        description: "M2 chip, Liquid Retina XDR display, Apple Pencil support",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
        link: "https://amazon.com/ipad-pro",
        category: "Tablets"
    },
    {
        id: 6,
        name: "Apple Watch Series 9",
        description: "Advanced health features, always-on Retina display, ECG app",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
        link: "https://amazon.com/apple-watch-9",
        category: "Wearables"
    },
    {
        id: 7,
        name: "DJI Mini 4 Pro Drone",
        description: "4K HDR video, omnidirectional obstacle sensing, 34-min flight time",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop",
        link: "https://amazon.com/dji-mini-4-pro",
        category: "Drones"
    },
    {
        id: 8,
        name: "Logitech MX Master 3S",
        description: "Wireless performance mouse with ultra-fast scrolling",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        link: "https://amazon.com/logitech-mx-master",
        category: "Accessories"
    },
    {
        id: 9,
        name: "Anker PowerCore 20000mAh",
        description: "High-capacity portable charger with fast charging technology",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
        link: "https://amazon.com/anker-powercore",
        category: "Accessories"
    },
    {
        id: 10,
        name: "GoPro HERO12 Black",
        description: "Waterproof action camera with 5.3K60 video and HyperSmooth 6.0",
        image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=500&h=500&fit=crop",
        link: "https://amazon.com/gopro-hero12",
        category: "Cameras"
    },
    {
        id: 11,
        name: "Kindle Paperwhite Signature",
        description: "Premium e-reader with auto-adjusting front light and wireless charging",
        image: "https://images.unsplash.com/photo-1592422746942-e73b0f79b9b7?w=500&h=500&fit=crop",
        link: "https://amazon.com/kindle-paperwhite",
        category: "E-Readers"
    },
    {
        id: 12,
        name: "Bose QuietComfort Earbuds II",
        description: "Personalized noise cancellation and premium sound in a compact design",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
        link: "https://amazon.com/bose-qc-earbuds",
        category: "Audio"
    }
];

// Function to generate product cards
function generateProductCards(productsArray = products) {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) return;
    
    // Clear existing content
    productGrid.innerHTML = '';
    
    // Generate cards for each product
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="product-button">
                    View on Amazon →
                </a>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        generateProductCards(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        generateProductCards(filtered);
    }
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    generateProductCards();
    
    // Add filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            filterProducts(category);
        });
    });
});
