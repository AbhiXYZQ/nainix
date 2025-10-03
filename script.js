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