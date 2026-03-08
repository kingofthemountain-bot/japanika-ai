// Main JavaScript for Japanika website

// Logo alternation feature
function alternateLogo() {
    const logoImages = document.querySelectorAll('.logo-image');
    if (logoImages.length === 0) return;
    
    // Get current count from localStorage, default to 0
    let logoCount = parseInt(localStorage.getItem('japanika-logo-count') || '0');
    
    // Increment counter
    logoCount++;
    
    // Determine which logo to show (odd = upgraded, even = original)
    const logoPath = logoCount % 2 === 1 
        ? 'images/logo/japanika-logo-upgraded.png' 
        : 'images/logo/japanika-logo-original.png';
    
    // Update all logo images on the page
    logoImages.forEach(img => {
        img.src = logoPath;
    });
    
    // Save the new count
    localStorage.setItem('japanika-logo-count', logoCount.toString());
    
    console.log(`Logo switched to: ${logoPath} (count: ${logoCount})`);
}

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize logo alternation
    alternateLogo();
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
        }
    });

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinksElements = document.querySelectorAll('.nav-link');
    
    navLinksElements.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', observeElements);

// Navbar scroll effect
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scroll down
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scroll up
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#order') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
