// Form Solver AI - Main JavaScript

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the mobile menu
    initMobileMenu();
    
    // Initialize sticky navbar
    initStickyNavbar();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize image fallbacks
    initImageFallbacks();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize demo video click
    initDemoVideo();
    
    // Handle active navigation link highlighting
    highlightActiveNavLink();
    
    // Handle testimonial card hover effects
    initTestimonialHover();
    
    // Handle pricing card hover effects
    initPricingHover();
    
    // Handle button hover effects
    initButtonEffects();
    
    // Initialize hero quiz form
    initQuizForm();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Add animation class when opening
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('animate-fade-in-up');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Sticky navbar that changes appearance on scroll
function initStickyNavbar() {
    // Function emptied to remove navbar scroll effects
    // This prevents the navbar from changing appearance when scrolling
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't apply smooth scrolling to links that aren't actually anchors
            if (this.getAttribute('href') === '#' || this.getAttribute('role') === 'button') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for offset
                const navbar = document.querySelector('nav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20; // Extra 20px padding
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ accordion functionality with enhanced transition effects
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Make sure all FAQ answers are closed by default
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('active');
    });
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Toggle active class for CSS transitions
            const isActive = answer.classList.contains('active');
            
            // If it's already active, close it. Otherwise, open it.
            if (isActive) {
                answer.classList.remove('active');
                if (icon) {
                    icon.classList.remove('rotate-180');
                }
            } else {
                // Close all other FAQ items first (accordion behavior)
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('.faq-icon');
                        
                        if (otherAnswer) {
                            otherAnswer.classList.remove('active');
                        }
                        if (otherIcon) {
                            otherIcon.classList.remove('rotate-180');
                        }
                    }
                });
                
                // Then open this one
                answer.classList.add('active');
                if (icon) {
                    icon.classList.add('rotate-180');
                }
            }
        });
    });
    
    // Ensure FAQ is hidden on initial page load - add redundancy
    setTimeout(() => {
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.classList.remove('active');
        });
    }, 100);
}

// Handle image fallbacks if images fail to load
function initImageFallbacks() {
    const images = document.querySelectorAll('img[data-fallback]');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = this.getAttribute('data-fallback');
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const emailInput = form.querySelector('input[type="email"]');
            
            if (emailInput && !validateEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('border-red-500');
                
                // Add error message if it doesn't exist
                let errorMsg = emailInput.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('text-red-500')) {
                    errorMsg = document.createElement('p');
                    errorMsg.classList.add('text-red-500', 'text-sm', 'mt-1');
                    errorMsg.textContent = 'Please enter a valid email address';
                    emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
                }
            } else if (emailInput) {
                emailInput.classList.remove('border-red-500');
                
                // Remove error message if it exists
                const errorMsg = emailInput.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('text-red-500')) {
                    errorMsg.remove();
                }
            }
            
            if (isValid) {
                // Submit form - in a real app, you'd use AJAX here
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    const originalText = submitButton.textContent;
                    submitButton.textContent = 'Processing...';
                    submitButton.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        form.reset();
                        submitButton.textContent = 'Success!';
                        submitButton.classList.remove('bg-blue-600');
                        submitButton.classList.add('bg-green-600');
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            submitButton.textContent = originalText;
                            submitButton.disabled = false;
                            submitButton.classList.remove('bg-green-600');
                            submitButton.classList.add('bg-blue-600');
                        }, 2000);
                    }, 1500);
                }
            }
        });
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Demo video functionality
function initDemoVideo() {
    const videoContainer = document.querySelector('#video-container');
    const playButton = document.getElementById('play-button');
    
    if (playButton && videoContainer) {
        playButton.addEventListener('click', function() {
            // Use the exact YouTube iframe code provided by the user with specific width and height
            videoContainer.innerHTML = `
                <div class="flex justify-center">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/UZtHpF2lXZQ?si=Dn1_mOK8EjDkDuO5&autoplay=1" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `;
        });
    }
}

// Handle active navigation link highlighting
function highlightActiveNavLink() {
    // Function emptied to remove navbar highlighting when scrolling
    // This prevents the nav links from changing color when scrolling
}

// Handle testimonial card hover effects
function initTestimonialHover() {
    const testimonialCards = document.querySelectorAll('#testimonials .rounded-lg');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            testimonialCards.forEach(c => c.classList.remove('scale-105', 'shadow-xl', 'z-10'));
            this.classList.add('scale-105', 'shadow-xl', 'z-10');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('scale-105', 'shadow-xl', 'z-10');
        });
    });
}

// Handle pricing card hover effects
function initPricingHover() {
    const pricingCards = document.querySelectorAll('#pricing > div > div > div');
    
    pricingCards.forEach(card => {
        if (!card.classList.contains('scale-105')) { // Skip the featured card
            card.addEventListener('mouseenter', function() {
                this.classList.add('scale-105', 'shadow-xl', 'z-10');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('scale-105', 'shadow-xl', 'z-10');
            });
        }
    });
}

// Handle button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.bg-blue-600, .border-2.border-white');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('shadow-lg', 'transform', '-translate-y-1');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-lg', 'transform', '-translate-y-1');
        });
    });
}

// Quiz form functionality in hero section
function initQuizForm() {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        // Resize canvas to match window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        // Show canvas when needed
        canvas.classList.remove('hidden');
    }
    
    // Shuffle options for questions
    ['q1', 'q2'].forEach(id => {
        const fieldset = document.getElementById(id);
        if (fieldset) {
            const options = Array.from(fieldset.querySelectorAll('label'));
            options.sort(() => Math.random() - 0.5).forEach(option => fieldset.appendChild(option));
        }
    });
    
    // AI Fill button click
    const aiButton = document.getElementById('ai-button');
    if (aiButton) {
        aiButton.addEventListener('click', function() {
            // Check radio for first question (Andrew Wiles)
            const wilesRadio = document.querySelector('input[name="q1"][value="Wiles"]');
            if (wilesRadio) wilesRadio.checked = true;
            
            // Check checkboxes for second question (Nobel prizes)
            ['Penicillin', 'Radioactivity', 'Insulin'].forEach(value => {
                const checkbox = document.querySelector(`input[name="q2"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
            
            // Set dropdown for third question (Tungsten)
            const dropdown = document.getElementById('q3');
            if (dropdown) dropdown.value = 'Tungsten';
            
            // Show confetti animation
            if (typeof confetti === 'function') {
                const rect = this.getBoundingClientRect();
                confetti({ 
                    particleCount: 150, 
                    spread: 60, 
                    origin: { 
                        x: (rect.left + rect.width/2)/window.innerWidth, 
                        y: (rect.top + rect.height/2)/window.innerHeight 
                    }
                });
            }
        });
    }
    
    // Submit Quiz button click
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const quizForm = document.getElementById('quiz-form');
            const resultContainer = document.getElementById('result-container');
            
            if (!quizForm || !resultContainer) return;
            
            // Get form answers
            const answers = [
                document.querySelector('input[name="q1"]:checked')?.value,
                Array.from(document.querySelectorAll('input[name="q2"]:checked')).map(i => i.value),
                document.getElementById('q3')?.value
            ];
            
            const correct = ['Wiles', ['Penicillin', 'Radioactivity', 'Insulin'], 'Tungsten'];
            let score = 0;
            if (answers[0] === correct[0]) score++;
            if (answers[1].sort().join(',') === correct[1].sort().join(',')) score++;
            if (answers[2] === correct[2]) score++;
            
            // Save the height of the quiz form before hiding it for a smooth transition
            const formHeight = quizForm.offsetHeight;
            const formContainer = document.getElementById('form-container');
            if (formContainer) {
                formContainer.style.minHeight = `${formHeight}px`;
            }
            
            // Hide the form questions and show the result
            const formFields = quizForm.querySelectorAll('fieldset, .space-y-2, .flex.space-x-4');
            formFields.forEach(field => {
                field.style.display = 'none';
            });
            
            // Update and show the result container instead of replacing the whole form
            resultContainer.innerHTML = `
                <div class="py-4 text-center space-y-4">
                    <div class="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800">Form Submitted!</h2>
                    <p class="text-lg text-gray-600">Your score:</p>
                    <p class="text-3xl font-extrabold text-green-600">${score} / 3</p>
                    <button id="download-btn" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                        Get AI Form Solver Now ⬇️
                    </button>
                </div>
            `;
            
            // Show the result container
            resultContainer.classList.remove('hidden');
            
            // Add event listener to download button
            const downloadBtn = document.getElementById('download-btn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => {
                    window.location.href = 'https://chromewebstore.google.com/detail/form-solver-ai-auto-solve/bbfkijodpfkhikpabcdjgdjcadnjffok';
                });
            }
        });
    }
}