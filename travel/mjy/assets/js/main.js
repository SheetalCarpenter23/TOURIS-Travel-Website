// Active Navbar Highlight
const sections = document.querySelectorAll('section[id]');

function highlightNavbar() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.navbar-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', highlightNavbar);

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    const errors = [];

    inputs.forEach(input => {
        const errorElement = input.nextElementSibling?.classList.contains('error-message') 
            ? input.nextElementSibling 
            : document.createElement('div');
        
        if (!errorElement.classList.contains('error-message')) {
            errorElement.classList.add('error-message');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }

        if (!input.value.trim()) {
            isValid = false;
            errorElement.textContent = `${input.placeholder || 'This field'} is required`;
            input.classList.add('error');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            errorElement.textContent = 'Please enter a valid email address';
            input.classList.add('error');
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    });

    return isValid;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.classList.add('success-message');
            successMsg.textContent = 'Form submitted successfully!';
            form.appendChild(successMsg);
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                successMsg.remove();
            }, 3000);
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-btn');
if (searchInput) {
    searchInput.addEventListener('click', () => {
        const searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-content">
                <input type="text" placeholder="Search destinations..." class="search-input">
                <button class="close-search">×</button>
                <div class="search-results"></div>
            </div>
        `;
        document.body.appendChild(searchModal);

        const closeBtn = searchModal.querySelector('.close-search');
        closeBtn.addEventListener('click', () => searchModal.remove());

        const input = searchModal.querySelector('.search-input');
        input.focus();
    });
}

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});

// Date Picker Enhancement
const dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach(input => {
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    input.min = today;
});

// Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Learn More button
    const learnMoreBtn = document.querySelector('.hero .btn-primary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // About Us link handling
    const aboutUsLink = document.querySelector('a[href="#about"]');
    if (aboutUsLink) {
        aboutUsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Book Now buttons
    const bookNowButtons = document.querySelectorAll('.btn-primary:not(.hero .btn-primary)');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tourSearchSection = document.querySelector('.tour-search');
            if (tourSearchSection) {
                tourSearchSection.scrollIntoView({ behavior: 'smooth' });
                
                // Optional: Focus on the first input field
                const firstInput = tourSearchSection.querySelector('input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 800);
                }
                
                // Add highlight animation to the form
                tourSearchSection.classList.add('highlight-section');
                setTimeout(() => tourSearchSection.classList.remove('highlight-section'), 2000);
            }
        });
    });

    // Handle checkout date to be after checkin date
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            checkoutInput.min = checkinInput.value;
            if (checkoutInput.value && checkoutInput.value < checkinInput.value) {
                checkoutInput.value = checkinInput.value;
            }
        });
    }
});

// Enhanced About Us and Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const navOpenBtn = document.querySelector("[data-nav-open-btn]");
    const navCloseBtn = document.querySelector("[data-nav-close-btn]");
    const navbar = document.querySelector("[data-navbar]");
    const overlay = document.querySelector("[data-overlay]");
    const navLinks = document.querySelectorAll(".navbar-link");
    
    // Function to close mobile menu
    const closeNavbar = () => {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
    };

    // Function to handle smooth scrolling
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header.offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Handle all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            // Close mobile menu if open
            closeNavbar();
            
            // Smooth scroll to target section
            setTimeout(() => {
                smoothScroll(target);
            }, 300);

            // Update active link
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
        });
    });

    // Handle mobile menu open/close
    [navOpenBtn, navCloseBtn, overlay].forEach(elem => {
        elem?.addEventListener('click', () => {
            navbar.classList.toggle("active");
            overlay.classList.toggle("active");
        });
    });

    // Close mobile menu on window resize (if open)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992 && navbar.classList.contains("active")) {
            closeNavbar();
        }
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 10;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    });
}); 