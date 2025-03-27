// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function showError(input, message) {
    const formControl = input.parentElement;
    input.classList.add('error');
    
    // Remove existing error message if any
    const existingError = formControl.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    formControl.appendChild(errorDiv);
}

function removeError(input) {
    input.classList.remove('error');
    const formControl = input.parentElement;
    const errorDiv = formControl.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        removeError(nameInput);
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else {
        removeError(emailInput);
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else {
        removeError(messageInput);
    }

    if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
        successMessage.role = 'alert';
        successMessage.innerHTML = `
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline"> Your message has been sent successfully.</span>
        `;
        contactForm.appendChild(successMessage);

        // Reset form
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});

// Portfolio modal functionality
function openModal(projectId) {
    const modalContent = {
        project1: {
            title: "Brand Campaign",
            description: "A series of short videos created for social media marketing campaign. The project included content strategy, storyboarding, filming, and post-production.",
            details: [
                "Platform: Instagram Reels, TikTok",
                "Duration: 15-30 seconds each",
                "Style: Fast-paced, engaging with custom transitions",
                "Results: 500K+ views, 50K+ engagements"
            ]
        },
        project2: {
            title: "Product Launch",
            description: "Promotional video series for new product launch, focusing on feature highlights and user benefits.",
            details: [
                "Platform: TikTok, YouTube Shorts",
                "Duration: 60 seconds",
                "Style: Professional, product-focused",
                "Results: 200K+ views, 15K+ clicks"
            ]
        },
        project3: {
            title: "Travel Vlog",
            description: "Created an engaging travel series for a luxury travel agency, showcasing destinations and experiences.",
            details: [
                "Platform: Instagram Reels",
                "Duration: 30 seconds each",
                "Style: Cinematic, storytelling",
                "Results: 300K+ views, 25K+ saves"
            ]
        }
    };

    const project = modalContent[projectId];
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div class="modal-content bg-white rounded-lg max-w-2xl w-full p-6 relative">
                <button onclick="closeModal()" class="modal-close absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
                <h3 class="text-2xl font-bold mb-4">${project.title}</h3>
                <p class="text-gray-600 mb-6">${project.description}</p>
                <div class="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 class="font-semibold mb-2">Project Details:</h4>
                    <ul class="space-y-2">
                        ${project.details.map(detail => `<li class="text-gray-600">• ${detail}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (modal && e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-fade', 'visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section-fade');
    sectionObserver.observe(section);
});

// Handle errors gracefully
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Implement fallback functionality or show user-friendly error message
});