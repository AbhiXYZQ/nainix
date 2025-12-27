// ========================================= //
// ========= SAFE NAVIGATION TOGGLE ======== //
// ========================================= //

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
    
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    
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

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .btn2, .btn3, .card2, .data-card, .btn-home');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorCircle.classList.add('hover-shrink'));
        el.addEventListener('mouseleave', () => cursorCircle.classList.remove('hover-shrink'));
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
    const slider = document.getElementById('pageSlider');
    if (!slider) return;

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

document.addEventListener('DOMContentLoaded', () => { updateCost(); });

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

    if(form) { form.addEventListener("submit", handleSubmit); }
});

// ========================================= //
// ========= BLOG FILTER & SEARCH ========== //
// ========================================= //

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const blogCards = document.querySelectorAll('.blog-card, .featured-post');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.getAttribute('data-filter');

                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || category === cardCategory) {
                        card.style.display = ''; 
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchText = e.target.value.toLowerCase();
            blogCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                if (titleElement) {
                    const title = titleElement.innerText.toLowerCase();
                    if (title.includes(searchText)) card.style.display = '';
                    else card.style.display = 'none';
                }
            });
        });
    }
});

// ========================================= //
// ========= PRELOADER / LOADING SCREEN ==== //
// ========================================= //

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0'; 
            setTimeout(() => { preloader.style.display = 'none'; }, 500); 
        }, 800); 
    }
});

// ========================================= //
// ========= WINTER WIZARD LOGIC (FINAL) === //
// ========================================= //

// 1. EmailJS Initialize
(function(){
    if(typeof emailjs !== 'undefined') {
        emailjs.init("BrTwSa9S0SWqsPJI5"); // Public Key
        console.log("✅ EmailJS Ready");
    }
})();

// 2. Open/Close Modal
function openModal() { 
    const modal = document.getElementById('orderModal');
    if(modal) modal.classList.add('active'); 
}
function closeModal() { 
    const modal = document.getElementById('orderModal');
    if(modal) modal.classList.remove('active'); 
}

// 3. Connect Badge
document.addEventListener("DOMContentLoaded", function() {
    const offerBadge = document.getElementById('cyber-loot-box');
    if(offerBadge) {
        offerBadge.removeAttribute('href'); 
        offerBadge.addEventListener('click', openModal);
    }
});

// 4. Validation Logic
window.validateStep1 = function() {
    const nameVal = document.getElementById('fname').value;
    const emailVal = document.getElementById('femail').value;
    const phoneVal = document.getElementById('fphone').value;

    if(nameVal.length < 3) { alert("⚠️ Naam likhna zaroori hai!"); return; }
    if(!emailVal.includes('@')) { alert("⚠️ Sahi Email likhein."); return; }
    if(phoneVal.length !== 10) { alert("⚠️ Phone number 10 digit ka hona chahiye."); return; }

    showStep(2);
};

window.showStep = function(stepIndex) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById('step' + stepIndex).classList.add('active');
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        if(index + 1 === stepIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
};

// 5. DIRECT SUBMIT FUNCTION (No Reload)
window.submitWinterForm = function(btnElement) {
    console.log("🚀 Button Clicked - Starting Process...");

    const agreeBox = document.getElementById('agreeBox');
    if(!agreeBox.checked) {
        alert("⚠️ Please tick the Video Review box.");
        return;
    }

    const form = document.getElementById('winter-form');
    const loader = document.getElementById('submit-loading');
    
    btnElement.style.display = 'none'; 
    if(loader) {
        loader.style.display = 'block';
        loader.innerText = "Processing Request...";
    }

    const orderID = "ND-" + Math.floor(100000 + Math.random() * 900000);
    let oldInput = form.querySelector('input[name="order_id"]');
    if(oldInput) oldInput.remove();

    let idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "order_id";
    idInput.value = orderID;
    form.appendChild(idInput);

    const serviceID = "nainixdev_freewebsite";
    const templateID = "template_xh8t16o";

    if(typeof emailjs !== 'undefined') {
        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                form.style.display = 'none';
                const rewardScreen = document.getElementById('reward-screen');
                const rewardBody = document.querySelector('.reward-body');
                
                if(rewardBody && !rewardBody.querySelector('.order-id-display')) {
                    const idTag = document.createElement('div');
                    idTag.className = 'order-id-display';
                    idTag.innerHTML = `<p style="margin-top:10px; color:#00ffff; border:1px dashed #00ffff; padding:5px; display:inline-block;">Order ID: <strong>${orderID}</strong></p>`;
                    rewardBody.insertBefore(idTag, rewardBody.querySelector('.contact-promise'));
                }
                if(rewardScreen) rewardScreen.style.display = 'block';

            }, (err) => {
                console.error("❌ FAILED:", err);
                alert("Error: Email nahi gaya. " + JSON.stringify(err));
                btnElement.style.display = 'block';
                if(loader) loader.style.display = 'none';
            });
    } else {
        alert("Error: Email system load nahi hua. Page refresh karein.");
    }
};

// ========================================= //
// ========= SCROLL PROGRESS BAR ========== //
// ========================================= //

window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollTop;
    const heightWin = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = (scrollTotal / heightWin) * 100;
    
    const bar = document.querySelector('.scroll-progress');
    if(bar) bar.style.width = scrollValue + "%";
});