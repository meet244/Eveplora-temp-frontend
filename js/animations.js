// Form Solver AI - Animations JavaScript

// Setup animations when DOM is ready
function setupAnimations() {
    // Setup scroll animations
    setupScrollAnimations();
    
    // Hero animations removed as requested
    
    // Setup feature card hover animations
    setupFeatureCardAnimations();
    
    // Setup AI Solve button animation
    setupAiButtonAnimation();
}

// Throttle function to limit how often a function runs
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Animate elements when they become visible during scroll
function setupScrollAnimations() {
    // Get all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Make sure all elements start hidden
    animatedElements.forEach(element => {
        // Hide element initially
        if (!element.closest('#hero')) { // Don't hide hero elements
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
        }
    });
    
    // Initial check for elements in viewport
    animateElementsInViewport(animatedElements);
    
    // Add throttled scroll listener to window
    window.addEventListener('scroll', throttle(function() {
        animateOnScroll();
    }, 100)); // Throttle to run at most every 100ms
}

// Animates elements when they enter the viewport
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    animateElementsInViewport(animatedElements);
}

// Check if elements are in viewport and animate them
function animateElementsInViewport(elements) {
    elements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            // Add animation class based on data attribute
            const animationType = element.dataset.animation || 'fade-in';
            
            // Remove the initial hiding styles
            element.style.opacity = '';
            element.style.transform = '';
            
            // Add animation classes
            element.classList.add(animationType);
            element.classList.add('animated');
            
            // Add delay if specified
            if (element.dataset.delay) {
                element.style.animationDelay = element.dataset.delay;
            }
        }
    });
}

// Check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Element is considered in viewport when its top is within 85% of the viewport height
    // and its bottom is above 0 (meaning it hasn't scrolled past the top)
    return (
        rect.top <= windowHeight * 0.85 &&
        rect.bottom >= 0
    );
}

// Setup feature card animations
function setupFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('#features .bg-white');
    
    featureCards.forEach(card => {
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            this.classList.add('transform');
            this.classList.add('scale-105');
            this.classList.add('shadow-xl');
            this.classList.add('z-10');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('scale-105');
            this.classList.remove('shadow-xl');
            this.classList.remove('z-10');
        });
    });
}

// Add animation classes to CSS if they don't exist
function addAnimationStyles() {
    // Check if animation styles are already added
    if (document.getElementById('animation-styles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes blob {
            0% {
                transform: scale(1) translate(0px, 0px);
            }
            33% {
                transform: scale(1.1) translate(30px, -20px);
            }
            66% {
                transform: scale(0.9) translate(-20px, 20px);
            }
            100% {
                transform: scale(1) translate(0px, 0px);
            }
        }
        
        @keyframes pulseButton {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
                transform: scale(1);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
                transform: scale(1.05);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
                transform: scale(1);
            }
        }
        
        .ai-button-pulse {
            animation: pulseButton 1.5s infinite;
            position: relative;
            z-index: 5;
        }
        
        /* Hide elements before animation */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: none;
        }
        
        /* Animation classes for when elements are in viewport */
        .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-blob {
            animation: blob 7s infinite alternate;
            will-change: transform;
        }
        
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        
        .animation-delay-4000 {
            animation-delay: 4s;
        }
        
        /* Fix for hero section - these should be visible by default */
        #hero .animate-fade-in-up:not(.animate-on-scroll) {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(styleSheet);
}

// Setup AI Button animation that highlights the button until clicked
function setupAiButtonAnimation() {
    const aiButton = document.getElementById('ai-button');
    
    if (aiButton) {
        // Add pulsing animation to AI button
        aiButton.classList.add('ai-button-pulse');
        
        // Remove animation when button is clicked
        aiButton.addEventListener('click', function() {
            this.classList.remove('ai-button-pulse');
        });
        
        // Add a small tooltip to draw more attention
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap';
        tooltip.innerHTML = 'Click to auto-fill! <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-blue-600"></span>';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease-in-out';
        
        aiButton.style.position = 'relative';
        aiButton.appendChild(tooltip);
        
        // Show and hide tooltip periodically
        let showTooltip = true;
        const tooltipInterval = setInterval(() => {
            if (showTooltip) {
                tooltip.style.opacity = '1';
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                }, 3000);
            } else {
                tooltip.style.opacity = '0';
            }
            showTooltip = !showTooltip;
        }, 5000);
        
        // Clear interval and hide tooltip when button is clicked
        aiButton.addEventListener('click', function() {
            clearInterval(tooltipInterval);
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        });
    }
}

// Apply animation classes to elements based on their position in document
function applyAnimationClasses() {
    // Add animation classes to section titles and descriptions
    const sectionHeadings = document.querySelectorAll('section h2');
    const sectionDescriptions = document.querySelectorAll('section h2 + p');
    
    sectionHeadings.forEach(heading => {
        heading.classList.add('animate-on-scroll');
        heading.dataset.animation = 'animate-fade-in-up';
    });
    
    sectionDescriptions.forEach(desc => {
        desc.classList.add('animate-on-scroll');
        desc.dataset.animation = 'animate-fade-in-up';
        desc.dataset.delay = '0.2s';
    });
    
    // Skip adding animations to hero section elements
    
    // Add animations to feature cards
    const featureCards = document.querySelectorAll('#features .bg-white');
    featureCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.dataset.animation = 'animate-fade-in-up';
        card.dataset.delay = `${0.1 + (index * 0.1)}s`;
    });
    
    // Add animations to pricing cards
    const pricingCards = document.querySelectorAll('#pricing .bg-white');
    pricingCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.dataset.animation = 'animate-fade-in-up';
        card.dataset.delay = `${0.1 + (index * 0.1)}s`;
    });
    
    // Add animations to testimonial cards
    const testimonialCards = document.querySelectorAll('#testimonials .bg-white');
    testimonialCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.dataset.animation = 'animate-fade-in-up';
        card.dataset.delay = `${0.1 + (index * 0.1)}s`;
    });
    
    // Add animations to How It Works steps
    const howItWorksSteps = document.querySelectorAll('#how-it-works .flex-1');
    howItWorksSteps.forEach((step, index) => {
        step.classList.add('animate-on-scroll');
        step.dataset.animation = 'animate-fade-in-up';
        step.dataset.delay = `${0.2 + (index * 0.2)}s`;
    });
    
    // Add animations to FAQ items
    const faqItems = document.querySelectorAll('#faq .border');
    faqItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'animate-fade-in-up';
        item.dataset.delay = `${0.1 + (index * 0.1)}s`;
    });
}

// Initialize animations when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles
    addAnimationStyles();
    
    // Apply animation classes to elements
    applyAnimationClasses();
    
    // Setup animations
    setupAnimations();
    
    // Add a class to body when animations are ready
    document.body.classList.add('animations-ready');
    
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
});

function setupHeroAnimations() {
    // Function emptied to remove all hero animations
    // No animations will be applied to hero section elements
}

// Logo functionality removed to disable auto-scrolling
// Instead, we just apply grayscale effect which is handled by CSS
document.addEventListener("DOMContentLoaded", function() {
  const logosContainer = document.querySelector('.logos-container');
  
  if (logosContainer) {
    const logoScroll = document.querySelector('.logos-scroll');
    
    if (logoScroll) {
      // No animation or duplication of logos
      // Grayscale effect is applied via CSS class on each logo
    }
  }
});