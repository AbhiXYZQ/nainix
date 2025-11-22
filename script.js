// Hamburger Menu Toggle for Mobile
document.getElementById('navToggle').addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // This part is for CSS-driven animations, ensuring display:flex is triggered.
    if (!navMenu.classList.contains('active')) {
        // No extra JS needed if using CSS for the animation
    }
});

// Fade-In Animation for Sections on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.cardText, .welcome, .iconCard, .aboutMe, .mission, .values, .data, .projects, .testimonials, .service, .portfolio, .contact, .gallery, .footer');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        // Initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});

// ========================================= //
// ========= Animated Counter Script ========= //
// ========================================= //

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-number');
    const statsSection = document.querySelector('.data');
    let animationStarted = false;

    const startCounterAnimation = () => {
        if (animationStarted) return;
        animationStarted = true;

        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Animation duration in ms
            const increment = target / (duration / 10);

            const updateCounter = () => {
                const current = +counter.innerText;
                
                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    };

    // Use the existing Intersection Observer from your script
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Check for the stats section to start the counter
            if (entry.isIntersecting && entry.target.classList.contains('data')) {
                startCounterAnimation();
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    };

    const observerOptions = {
        root: null,
        threshold: 0.4 // Trigger when 40% of the section is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (statsSection) {
        observer.observe(statsSection);
    }
});

// ========================================= //
// ========= Custom Cursor Script ========== //
// ========================================= //

document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    // Move cursor on mousemove
    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
    });
    
    // Animate the cursor with a slight delay
    function animateCursor() {
        // Update dot position instantly
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        // Update circle position with a delay (lerp for smoothness)
        // Lerp (Linear Interpolation): creates a smoother follow effect
        circleX += (dotX - circleX) * 0.15;
        circleY += (dotY - circleY) * 0.15;
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Add hover effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn2, .btn3, .card2, .data-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorCircle.classList.add('hover-shrink');
        });
        el.addEventListener('mouseleave', () => {
            cursorCircle.classList.remove('hover-shrink');
        });
    });
});

// ========================================= //
// ========= PRICE ESTIMATOR LOGIC ========= //
// ========================================= //

let currentBasePrice = 5000; // Default Portfolio Price
let pagePrice = 500; // Cost per page
let addonTotal = 0;

function selectType(element) {
    // Remove active class from all cards
    document.querySelectorAll('.type-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to clicked card
    element.classList.add('active');
    
    // Update base price
    currentBasePrice = parseInt(element.getAttribute('data-value'));
    updateCost();
}

function toggleAddon(element) {
    element.classList.toggle('selected');
    updateCost();
}

function updateCost() {
    // 1. Get Page Count
    const pageCount = parseInt(document.getElementById('pageSlider').value);
    document.getElementById('pageCountDisplay').innerText = pageCount;
    
    // 2. Calculate Addons
    addonTotal = 0;
    document.querySelectorAll('.addon-btn.selected').forEach(btn => {
        addonTotal += parseInt(btn.getAttribute('data-cost'));
    });
    
    // 3. Total Calculation
    // Logic: Base Price + (Pages * Page Price) + Addons
    const total = currentBasePrice + (pageCount * pagePrice) + addonTotal;
    
    // 4. Update Display with Animation
    const priceDisplay = document.getElementById('totalPrice');
    
    // Simple format for currency
    priceDisplay.innerText = total.toLocaleString('en-IN');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateCost();
});

// ========================================= //
// ========= AJAX FORM SUBMISSION ========== //
// ========================================= //

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
        event.preventDefault(); // Browser ko form submit karne se roko
        
        var status = document.getElementById("my-form-status");
        var btnText = form.querySelector(".btn-text");
        var data = new FormData(event.target);

        // Button Text Change (Loading effect)
        var originalText = btnText.innerText;
        btnText.innerText = "SCANNING...";
        status.style.opacity = "0.7";
        status.style.pointerEvents = "none"; // Click disable karein

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json' // Formspree ko bolo JSON return kare, HTML page nahi
            }
        }).then(response => {
            if (response.ok) {
                // SUCCESS: Ab hum manually redirect karenge
                window.location.href = "thankyou.html"; 
            } else {
                // ERROR
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
                // Button Reset
                btnText.innerText = originalText;
                status.style.opacity = "1";
                status.style.pointerEvents = "auto";
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
            // Button Reset
            btnText.innerText = originalText;
            status.style.opacity = "1";
            status.style.pointerEvents = "auto";
        });
    }

    if(form) {
        form.addEventListener("submit", handleSubmit);
    }
});