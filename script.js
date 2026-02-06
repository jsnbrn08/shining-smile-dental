// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('.iconify');
    if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-icon', 'heroicons:x-mark');
    } else {
        icon.setAttribute('data-icon', 'heroicons:bars-3');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile menu if open
        navMenu.classList.remove('active');
        mobileMenuToggle.querySelector('.iconify').setAttribute('data-icon', 'heroicons:bars-3');
    });
});

// ===================================
// APPOINTMENT MODAL
// ===================================
const appointmentModal = document.getElementById('appointmentModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const bookNowBtn = document.getElementById('bookNowBtn');
const heroBookBtn = document.getElementById('heroBookBtn');
const appointmentForm = document.getElementById('appointmentForm');

// Open modal
function openModal() {
    appointmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = '';
}

bookNowBtn.addEventListener('click', openModal);
heroBookBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Schedule a Visit button in About section
const scheduleVisitBtn = document.getElementById('scheduleVisitBtn');
if (scheduleVisitBtn) {
    scheduleVisitBtn.addEventListener('click', openModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentModal.classList.contains('active')) {
        closeModal();
    }
});

// Set minimum date to today
const appointmentDate = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
appointmentDate.setAttribute('min', today);

// Handle appointment form submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData);

    // Show success message
    showNotification('Appointment request submitted successfully! We will contact you shortly to confirm.', 'success');

    // Reset form and close modal
    appointmentForm.reset();
    closeModal();

    // Log data (in production, this would be sent to a server)
    console.log('Appointment Data:', data);
});

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');

    // Reset form
    contactForm.reset();

    // Log data (in production, this would be sent to a server)
    console.log('Contact Form Data:', data);
});

// ===================================
// TESTIMONIALS SLIDER
// ===================================
const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentSlide = 0;
const totalSlides = testimonialCards.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    const offset = -currentSlide * 100;
    testimonialsTrack.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play slider
let sliderInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
testimonialsTrack.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

testimonialsTrack.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 5000);
});

// ===================================
// SERVICE MODAL
// ===================================
const serviceModal = document.getElementById('serviceModal');
const serviceModalOverlay = document.getElementById('serviceModalOverlay');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalBack = document.getElementById('serviceModalBack');
const serviceModalBook = document.getElementById('serviceModalBook');
const serviceModalTitle = document.getElementById('serviceModalTitle');
const serviceModalIcon = document.getElementById('serviceModalIcon');
const serviceModalBody = document.getElementById('serviceModalBody');

// Service data with detailed information
const servicesData = {
    'General Dentistry': {
        icon: 'medical-icon:i-dental',
        description: 'Comprehensive dental care for the whole family, focusing on prevention and maintaining optimal oral health.',
        overview: 'Our general dentistry services form the foundation of good oral health. We believe in preventive care and early detection to help you avoid more serious dental problems down the road.',
        benefits: [
            'Early detection of dental problems',
            'Prevention of tooth decay and gum disease',
            'Maintenance of overall oral health',
            'Cost-effective preventive care',
            'Personalized oral hygiene education',
            'Comfortable, stress-free environment'
        ],
        procedures: [
            'Comprehensive dental examinations',
            'Professional teeth cleaning and scaling',
            'Digital X-rays and diagnostics',
            'Fluoride treatments',
            'Dental sealants',
            'Cavity fillings and restorations',
            'Gum disease treatment',
            'Oral cancer screenings'
        ],
        highlight: {
            title: 'Preventive Care Saves Money',
            text: 'Regular checkups and cleanings can help you avoid costly procedures in the future. We recommend visits every 6 months.'
        }
    },
    'Cosmetic Dentistry': {
        icon: 'mdi:tooth-outline',
        description: 'Transform your smile with our advanced cosmetic procedures designed to enhance the appearance of your teeth.',
        overview: 'A beautiful smile can boost your confidence and make a lasting impression. Our cosmetic dentistry services combine artistry with advanced dental techniques to give you the smile you\'ve always wanted.',
        benefits: [
            'Enhanced smile aesthetics',
            'Improved self-confidence',
            'Natural-looking results',
            'Long-lasting transformations',
            'Minimally invasive procedures',
            'Customized treatment plans'
        ],
        procedures: [
            'Professional teeth whitening',
            'Porcelain veneers',
            'Dental bonding',
            'Smile makeovers',
            'Gum contouring',
            'Tooth reshaping',
            'Composite fillings',
            'Full mouth reconstruction'
        ],
        highlight: {
            title: 'Most Popular Service',
            text: 'Our professional teeth whitening can brighten your smile by up to 8 shades in just one visit!'
        }
    },
    'Dental Implants': {
        icon: 'game-icons:tooth',
        description: 'Permanent, natural-looking tooth replacement solution that restores both function and aesthetics.',
        overview: 'Dental implants are the gold standard for replacing missing teeth. They look, feel, and function just like natural teeth, providing a permanent solution that can last a lifetime with proper care.',
        benefits: [
            'Permanent tooth replacement',
            'Natural look and feel',
            'Improved chewing ability',
            'Prevents bone loss',
            'No damage to adjacent teeth',
            'High success rate (95%+)',
            'Boosts self-confidence',
            'Long-term cost-effective'
        ],
        procedures: [
            'Single tooth implants',
            'Multiple tooth implants',
            'Full arch restoration',
            'Implant-supported dentures',
            'All-on-4 treatment',
            'Bone grafting (if needed)',
            'Sinus lift procedures',
            'Same-day implants'
        ],
        highlight: {
            title: 'Lifetime Solution',
            text: 'With proper care, dental implants can last a lifetime, making them the most cost-effective long-term solution for missing teeth.'
        }
    },
    'Orthodontics': {
        icon: 'mdi:tooth-outline',
        description: 'Straighten your teeth and correct bite issues with modern orthodontic solutions including braces and clear aligners.',
        overview: 'Straight teeth aren\'t just about aesthetics – they\'re easier to clean, less prone to wear, and can improve your overall oral health. We offer both traditional and modern orthodontic solutions to fit your lifestyle.',
        benefits: [
            'Straighter, more attractive smile',
            'Improved bite function',
            'Easier teeth cleaning',
            'Reduced wear on teeth',
            'Better jaw alignment',
            'Increased self-confidence',
            'Prevention of future dental issues'
        ],
        procedures: [
            'Traditional metal braces',
            'Ceramic braces',
            'Clear aligners (Invisalign)',
            'Lingual braces',
            'Retainers',
            'Bite correction',
            'Early intervention for children',
            'Adult orthodontics'
        ],
        highlight: {
            title: 'Clear Aligner Technology',
            text: 'Our clear aligners are virtually invisible and removable, allowing you to straighten your teeth without anyone noticing!'
        }
    },
    'Root Canal Therapy': {
        icon: 'healthicons:dental-root-canal-outline',
        description: 'Save infected or damaged teeth with gentle, pain-free root canal treatment using advanced techniques.',
        overview: 'Root canal therapy has an unfair reputation for being painful. With modern techniques and anesthesia, the procedure is no more uncomfortable than getting a filling, and it can save your natural tooth.',
        benefits: [
            'Saves your natural tooth',
            'Eliminates tooth pain',
            'Prevents infection spread',
            'Restores normal chewing',
            'Natural appearance maintained',
            'Cost-effective vs. extraction',
            'High success rate (95%+)'
        ],
        procedures: [
            'Root canal treatment',
            'Endodontic retreatment',
            'Apicoectomy (root-end surgery)',
            'Pulpotomy',
            'Dental trauma treatment',
            'Cracked tooth treatment',
            'Internal bleaching',
            'Emergency root canal'
        ],
        highlight: {
            title: 'Pain-Free Treatment',
            text: 'Modern root canal therapy is virtually painless and can be completed in just one or two comfortable visits.'
        }
    },
    'Emergency Care': {
        icon: 'mdi:tooth-outline',
        description: 'Immediate dental care for urgent situations including severe pain, trauma, and dental emergencies.',
        overview: 'Dental emergencies can happen at any time. We offer same-day emergency appointments to address your urgent dental needs and provide immediate relief from pain and discomfort.',
        benefits: [
            'Same-day appointments',
            'Immediate pain relief',
            'Prevent further damage',
            'Save damaged teeth',
            '24/7 emergency line',
            'Experienced emergency team',
            'Advanced diagnostic tools'
        ],
        procedures: [
            'Emergency tooth extractions',
            'Treatment for knocked-out teeth',
            'Broken tooth repair',
            'Lost filling/crown replacement',
            'Abscess treatment',
            'Severe toothache relief',
            'Soft tissue injuries',
            'Jaw injury treatment'
        ],
        highlight: {
            title: 'We\'re Here When You Need Us',
            text: 'Call our emergency line anytime for immediate assistance. We prioritize emergency cases and offer same-day appointments.'
        }
    }
};

// Open service modal
function openServiceModal(serviceName) {
    const serviceData = servicesData[serviceName];
    if (!serviceData) return;

    // Update icon
    const iconElement = serviceModalIcon.querySelector('.iconify');
    iconElement.setAttribute('data-icon', serviceData.icon);

    // Update title
    serviceModalTitle.textContent = serviceName;

    // Build modal body content
    let bodyHTML = `
        <p><strong>${serviceData.description}</strong></p>
        
        <h3>Overview</h3>
        <p>${serviceData.overview}</p>
        
        <h3>Benefits</h3>
        <ul>
            ${serviceData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
        
        <h3>Our Procedures</h3>
        <ul>
            ${serviceData.procedures.map(procedure => `<li>${procedure}</li>`).join('')}
        </ul>
        
        <div class="service-highlight-box">
            <h4>${serviceData.highlight.title}</h4>
            <p>${serviceData.highlight.text}</p>
        </div>
    `;

    serviceModalBody.innerHTML = bodyHTML;

    // Show modal
    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close service modal
function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for service modal
serviceModalClose.addEventListener('click', closeServiceModal);
serviceModalOverlay.addEventListener('click', closeServiceModal);
serviceModalBack.addEventListener('click', closeServiceModal);
serviceModalBook.addEventListener('click', () => {
    closeServiceModal();
    openModal(); // Open appointment modal
});

// Close service modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
        closeServiceModal();
    }
});

// Service cards interaction
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceCard = link.closest('.service-card');
        const serviceTitle = serviceCard.querySelector('.service-title').textContent;
        openServiceModal(serviceTitle);
    });
});

// ===================================
// LEARN MORE BUTTON
// ===================================
const learnMoreBtn = document.getElementById('learnMoreBtn');

learnMoreBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="iconify notification-icon" data-icon="${getNotificationIcon(type)}"></span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">
            <span class="iconify" data-icon="ph:x"></span>
        </button>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        maxWidth: '400px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'hsl(142, 71%, 45%)' :
            type === 'error' ? 'hsl(0, 84%, 60%)' :
                'hsl(200, 70%, 45%)',
        color: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: '3000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        animation: 'slideInRight 0.3s ease-out',
        fontWeight: '500'
    });

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            .notification-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'ph:check-circle-fill';
        case 'error':
            return 'ph:x-circle-fill';
        case 'info':
            return 'ph:info-fill';
        default:
            return 'ph:check-circle-fill';
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .team-card, .feature-item, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// PHONE LINK FUNCTIONALITY
// ===================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // On desktop, show notification instead of trying to call
        if (window.innerWidth > 768) {
            e.preventDefault();
            showNotification('Call us at (123) 456-7890 to book your appointment!', 'info');
        }
    });
});

// ===================================
// SOCIAL LINKS
// ===================================
const socialLinks = document.querySelectorAll('.social-link, .social-link-large, .footer-social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Follow us on social media for updates and dental tips!', 'info');
    });
});

// ===================================
// FOOTER LINKS
// ===================================
const footerLinks = document.querySelectorAll('.footer-bottom-links a');
footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = link.textContent;
        showNotification(`${linkText} page - Coming soon!`, 'info');
    });
});

// ===================================
// SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.getElementById('services');
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ===================================
// FORM VALIDATION ENHANCEMENTS
// ===================================
const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    // Add visual feedback on focus
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });

    // Real-time validation feedback
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.style.borderColor = 'hsl(142, 71%, 45%)';
        } else if (input.value.length > 0) {
            input.style.borderColor = 'hsl(0, 84%, 60%)';
        } else {
            input.style.borderColor = '';
        }
    });
});

// ===================================
// PREVENT FORM DOUBLE SUBMISSION
// ===================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    let isSubmitting = false;

    form.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;

        // Re-enable after 2 seconds
        setTimeout(() => {
            isSubmitting = false;
        }, 2000);
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images when they come into view
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Add keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Focus trap for modal
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

appointmentModal.addEventListener('keydown', (e) => {
    if (!appointmentModal.classList.contains('active')) return;

    const focusable = appointmentModal.querySelectorAll(focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🦷 Shining Smile Dental', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #10b981;');
console.log('%cAll interactive features are ready.', 'font-size: 12px; color: #6b7280;');

// ===================================
// INITIALIZE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    setActiveNavLink();

    // Add loaded class to body for animations
    document.body.classList.add('loaded');

    console.log('✅ All systems initialized');
});
