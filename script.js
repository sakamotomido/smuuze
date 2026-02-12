// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.problem-card, .feature-card, .reason-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form validation
        const formData = new FormData(contactForm);
        let isValid = true;
        
        contactForm.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#FF0000';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });
        
        if (isValid) {
            // Show success message
            alert('お問い合わせありがとうございます。担当者より追ってご連絡いたします。');
            contactForm.reset();
        } else {
            alert('必須項目を入力してください。');
        }
    });
}

// Add floating animation to hero visuals
const createFloatingElements = () => {
    const heroVisuals = document.querySelector('.hero-visuals');
    if (!heroVisuals) return;
    
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#00B3B3', '#E8F8F8', '#B3E8E8'];
    
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'floating-shape';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
            opacity: 0.1;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroVisuals.appendChild(element);
    }
};

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -20px) rotate(90deg);
        }
        50% {
            transform: translate(-10px, 10px) rotate(180deg);
        }
        75% {
            transform: translate(30px, 20px) rotate(270deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize floating elements
createFloatingElements();

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: block;
            font-size: 24px;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-dark);
        `;
        
        menuButton.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        });
        
        document.querySelector('.header-content').prepend(menuButton);
    }
};

// Run on page load
window.addEventListener('load', () => {
    createMobileMenu();
});

// Recalculate on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav').style.display = 'block';
    }
});