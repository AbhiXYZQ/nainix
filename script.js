// ========================================= //
// ========= SAFE NAVIGATION TOGGLE ======== //
// ========================================= //

// Hum pehle check karenge ki element exist karta hai ya nahi
const navToggle = document.getElementById('navToggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// ========================================= //
// ========= FADE-IN ANIMATION ============= //
// ========================================= //

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.cardText, .welcome, .iconCard, .aboutMe, .mission, .values, .data, .projects, .testimonials, .service, .portfolio, .contact, .gallery, .footer, .thankyou-section');
    
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
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});

// ========================================= //
// ========= ANIMATED COUNTER SCRIPT ======= //
// ========================================= //

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.data');
    // Agar stats section nahi hai (jaise thankyou page par), to code run mat karo
    if (!statsSection) return;

    const counters = document.querySelectorAll('.counter-number');
    let animationStarted = false;

    const startCounterAnimation = () => {
        if (animationStarted) return;
        animationStarted = true;

        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 2000; 
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

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('data')) {
                startCounterAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
});

// ========================================= //
// ========= CUSTOM CURSOR SCRIPT ========== //
// ========================================= //

document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    // Agar HTML me cursor div nahi hain, to return kar jao
    if (!cursorDot || !cursorCircle) return;

    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
    });
    
    function animateCursor() {
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        circleX += (dotX - circleX) * 0.15;
        circleY += (dotY - circleY) * 0.15;
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Added .btn-home for hover effect on Thank You page
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn2, .btn3, .card2, .data-card, .btn-home');
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

let currentBasePrice = 5000; 
let pagePrice = 500; 
let addonTotal = 0;

function selectType(element) {
    document.querySelectorAll('.type-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    currentBasePrice = parseInt(element.getAttribute('data-value'));
    updateCost();
}

function toggleAddon(element) {
    element.classList.toggle('selected');
    updateCost();
}

function updateCost() {
    // Check if elements exist (Important fix)
    const slider = document.getElementById('pageSlider');
    if (!slider) return; // Agar slider nahi hai to calculation mat karo

    const pageCount = parseInt(slider.value);
    document.getElementById('pageCountDisplay').innerText = pageCount;
    
    addonTotal = 0;
    document.querySelectorAll('.addon-btn.selected').forEach(btn => {
        addonTotal += parseInt(btn.getAttribute('data-cost'));
    });
    
    const total = currentBasePrice + (pageCount * pagePrice) + addonTotal;
    const priceDisplay = document.getElementById('totalPrice');
    if (priceDisplay) priceDisplay.innerText = total.toLocaleString('en-IN');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCost();
});

// ========================================= //
// ========= AJAX FORM SUBMISSION ========== //
// ========================================= //

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById("my-form-status");
        var btnText = form.querySelector(".btn-text");
        var data = new FormData(event.target);

        var originalText = btnText.innerText;
        btnText.innerText = "SCANNING...";
        status.style.opacity = "0.7";
        status.style.pointerEvents = "none";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                window.location.href = "thankyou.html"; 
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
                btnText.innerText = originalText;
                status.style.opacity = "1";
                status.style.pointerEvents = "auto";
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
            btnText.innerText = originalText;
            status.style.opacity = "1";
            status.style.pointerEvents = "auto";
        });
    }

    if(form) {
        form.addEventListener("submit", handleSubmit);
    }
});