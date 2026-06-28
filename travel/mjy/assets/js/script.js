'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]"); // Overlay element
const navOpenBtn = document.querySelector("[data-nav-open-btn]"); // Open button
const navbar = document.querySelector("[data-navbar]"); // Navbar
const navCloseBtn = document.querySelector("[data-nav-close-btn]"); // Close button
const navLinks = document.querySelectorAll("[data-nav-link]"); // Navbar links

const navElemArr = [navOpenBtn, navCloseBtn, overlay]; // In buttons ko ek array me rakha gaya

// Function jo navbar toggle karne ka kaam karti hai
const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active"); // Navbar ko active ya inactive karna
      overlay.classList.toggle("active"); // Overlay ko active ya inactive karna
    });
  }
}

navToggleEvent(navElemArr); // Navbar open/close buttons aur overlay ke liye event listener
navToggleEvent(navLinks); // Navbar links ke liye event listener

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]"); // Header element
const goTopBtn = document.querySelector("[data-go-top]"); // Go to top button

window.addEventListener("scroll", function () {
  // Scroll hone par check kiya jaata hai ki 200px se zyada scroll kiya gaya hai ya nahi
  if (window.scrollY >= 200) {
    header.classList.add("active"); // Agar 200px se zyada scroll kiya, toh header ko active karo
    goTopBtn.classList.add("active"); // Go-to-top button ko active karo
  } else {
    header.classList.remove("active"); // Agar 200px se kam scroll kiya, toh header ko remove karo
    goTopBtn.classList.remove("active"); // Go-to-top button ko remove karo
  }
});

/**
 * Form handling
 */
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    alert('Form submitted successfully!');
    form.reset();
  });
});

/**
 * Smooth scroll for all anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});

/**
 * Book Now button handling
 */
const bookNowButtons = document.querySelectorAll('.btn-primary');
bookNowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tourSearchSection = document.querySelector('.tour-search');
    if (tourSearchSection) {
      tourSearchSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/**
 * Search button functionality
 */
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const tourSearchSection = document.querySelector('.tour-search');
    if (tourSearchSection) {
      tourSearchSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Search Modal Functionality
const searchModal = document.querySelector('.search-modal');
const searchInput = document.querySelector('.search-input');
const searchSuggestions = document.querySelector('.search-suggestions');
const recentList = document.querySelector('.recent-list');
const nearbyList = document.querySelector('.nearby-list');
const closeSearchBtn = document.querySelector('.close-search');

// Sample data (replace with actual data from your backend)
const destinations = [
    { name: 'Paris, France', category: 'city', price: 'luxury' },
    { name: 'Bali, Indonesia', category: 'beach', price: 'moderate' },
    { name: 'Swiss Alps', category: 'mountain', price: 'luxury' },
    { name: 'Bangkok, Thailand', category: 'cultural', price: 'budget' },
    // Add more destinations as needed
];

let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Open search modal
function openSearchModal() {
    searchModal.style.display = 'block';
    searchInput.focus();
    displayRecentSearches();
    displayNearbyDestinations();
}

// Close search modal
function closeSearchModal() {
    searchModal.style.display = 'none';
    searchInput.value = '';
    searchSuggestions.style.display = 'none';
}

// Display recent searches
function displayRecentSearches() {
    recentList.innerHTML = recentSearches
        .map(search => `<div class="recent-item">${search}</div>`)
        .join('');
}

// Display nearby destinations
function displayNearbyDestinations() {
    // In a real application, you would get this data based on user's location
    const nearbyDests = destinations.slice(0, 3);
    nearbyList.innerHTML = nearbyDests
        .map(dest => `<div class="nearby-item">${dest.name}</div>`)
        .join('');
}

// Filter destinations based on search input and filters
function filterDestinations(searchTerm) {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    return destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || dest.category === categoryFilter;
        const matchesPrice = !priceFilter || dest.price === priceFilter;
        // Add date filtering logic if needed
        return matchesSearch && matchesCategory && matchesPrice;
    });
}

// Handle search input
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm.length > 0) {
        const filteredResults = filterDestinations(searchTerm);
        
        if (filteredResults.length > 0) {
            searchSuggestions.innerHTML = filteredResults
                .map(dest => `<div class="suggestion-item">${dest.name}</div>`)
                .join('');
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.innerHTML = '<div class="no-results">No destinations found</div>';
            searchSuggestions.style.display = 'block';
        }
    } else {
        searchSuggestions.style.display = 'none';
    }
});

// Handle suggestion click
searchSuggestions.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-item')) {
        const selectedDestination = e.target.textContent;
        searchInput.value = selectedDestination;
        
        // Add to recent searches
        if (!recentSearches.includes(selectedDestination)) {
            recentSearches.unshift(selectedDestination);
            if (recentSearches.length > 5) recentSearches.pop();
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
        
        // Close suggestions and modal
        searchSuggestions.style.display = 'none';
        closeSearchModal();
        
        // Navigate to destination page (implement as needed)
        console.log(`Navigating to: ${selectedDestination}`);
    }
});

// Event listeners
closeSearchBtn.addEventListener('click', closeSearchModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearchModal();
});

// Close modal when clicking outside
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
});

// Prevent clicks inside modal from closing it
document.querySelector('.search-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Filter change handlers
document.getElementById('categoryFilter').addEventListener('change', () => {
    if (searchInput.value.trim()) {
        const event = new Event('input');
        searchInput.dispatchEvent(event);
    }
});

document.getElementById('priceFilter').addEventListener('change', () => {
    if (searchInput.value.trim()) {
        const event = new Event('input');
        searchInput.dispatchEvent(event);
    }
});

document.getElementById('dateFilter').addEventListener('change', () => {
    if (searchInput.value.trim()) {
        const event = new Event('input');
        searchInput.dispatchEvent(event);
    }
});

/**
 * Booking Modal Functionality
 */
class BookingSystem {
    constructor() {
        this.modal = document.querySelector('.booking-modal');
        this.form = document.getElementById('bookingForm');
        this.packageNameInput = document.getElementById('packageName');
        this.travelersInput = document.getElementById('travelers');
        this.basePriceSpan = document.getElementById('basePrice');
        this.travelerCountSpan = document.getElementById('travelerCount');
        this.totalPriceSpan = document.getElementById('totalPrice');
        this.currentPackagePrice = 0;

        this.initializeEventListeners();
        this.setupFormValidation();
    }

    initializeEventListeners() {
        // Book Now buttons in package cards (main page packages section)
        const bookButtons = document.querySelectorAll('.package .package-card .btn-secondary, .package-card .btn-secondary');
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openBookingModal(e);
            });
        });

        // Close button
        const closeBtn = document.querySelector('.close-booking');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeBookingModal());
        }

        // Cancel button
        const cancelBtn = document.querySelector('.cancel-booking');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeBookingModal());
        }

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeBookingModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeBookingModal();
            }
        });

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleBookingSubmit(e));

        // Number of travelers change
        this.travelersInput.addEventListener('input', () => this.updatePriceCalculation());
    }

    setupFormValidation() {
        const nameInput = document.getElementById('bookingName');
        const emailInput = document.getElementById('bookingEmail');
        const travelersInput = document.getElementById('travelers');
        const dateInput = document.getElementById('travelDate');

        // Name validation
        nameInput.addEventListener('input', () => {
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim().length < 3) {
                this.showError(nameInput, nameError, 'Name must be at least 3 characters long');
            } else {
                this.hideError(nameInput, nameError);
            }
        });

        // Email validation
        emailInput.addEventListener('input', () => {
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                this.showError(emailInput, emailError, 'Please enter a valid email address');
            } else {
                this.hideError(emailInput, emailError);
            }
        });

        // Travelers validation
        travelersInput.addEventListener('input', () => {
            const travelersError = document.getElementById('travelersError');
            const value = parseInt(travelersInput.value);
            if (isNaN(value) || value < 1 || value > 10) {
                this.showError(travelersInput, travelersError, 'Please enter a number between 1 and 10');
            } else {
                this.hideError(travelersInput, travelersError);
            }
        });

        // Date validation
        dateInput.addEventListener('input', () => {
            const dateError = document.getElementById('dateError');
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                this.showError(dateInput, dateError, 'Please select a future date');
            } else {
                this.hideError(dateInput, dateError);
            }
        });
    }

    showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.classList.remove('visible');
        errorElement.textContent = '';
    }

    openBookingModal(e) {
        e.preventDefault();
        e.stopPropagation();
        const packageCard = e.target.closest('.package-card');
        if (packageCard) {
            // Get package details
            const packageTitle = packageCard.querySelector('.card-title')?.textContent.trim() || 'Custom Package';
            const priceElement = packageCard.querySelector('.price');
            const priceText = priceElement?.textContent || '$0';
            const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 1000;

            // Set package details in the modal
            if (this.packageNameInput) this.packageNameInput.value = packageTitle;
            this.currentPackagePrice = price;
            if (this.basePriceSpan) this.basePriceSpan.textContent = `$${price}`;
            if (this.travelersInput) this.travelersInput.value = 1;
            this.updatePriceCalculation();

            // Set minimum date to today
            const travelDateInput = document.getElementById('travelDate');
            if (travelDateInput) {
                const today = new Date().toISOString().split('T')[0];
                travelDateInput.min = today;
            }

            // Show modal with animation (centered)
            if (this.modal) {
                this.modal.style.display = 'flex';
                setTimeout(() => {
                    this.modal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden';
            }
        }
    }

    closeBookingModal() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.form.reset();
            document.body.style.overflow = '';
        }, 300);
    }

    updatePriceCalculation() {
        const travelers = parseInt(this.travelersInput.value) || 0;
        const totalPrice = this.currentPackagePrice * travelers;
        
        this.travelerCountSpan.textContent = travelers;
        this.totalPriceSpan.textContent = `$${totalPrice}`;
    }

    handleBookingSubmit(e) {
        e.preventDefault();

        // Check for validation errors
        const errorMessages = document.querySelectorAll('.error-message.visible');
        if (errorMessages.length > 0) {
            return;
        }

        // Get form data
        const formData = {
            packageName: this.packageNameInput.value,
            name: document.getElementById('bookingName').value,
            email: document.getElementById('bookingEmail').value,
            travelDate: document.getElementById('travelDate').value,
            travelers: this.travelersInput.value,
            specialRequests: document.getElementById('specialRequests').value,
            totalPrice: this.totalPriceSpan.textContent
        };

        // Show success message
        this.showBookingSuccess(formData);

        // In a real application, you would send this data to your server
        console.log('Booking submitted:', formData);
    }

    showBookingSuccess(formData) {
        const bookingReference = this.generateBookingReference();
        this.modal.querySelector('.booking-content').innerHTML = `
            <div class="booking-success">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <h3>Booking Confirmed!</h3>
                <p>Thank you for booking ${formData.packageName}</p>
                <p>We have sent a confirmation email to ${formData.email}</p>
                <p>Your booking reference: ${bookingReference}</p>
                <button class="btn btn-primary" onclick="window.location.reload()">Done</button>
            </div>
        `;
    }

    generateBookingReference() {
        return 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}

// Initialize booking system - Only initialize, don't auto-open modal
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure page-init.js has run first
    setTimeout(() => {
        // Ensure booking modal is hidden on page load
        const bookingModal = document.querySelector('.booking-modal');
        if (bookingModal) {
            bookingModal.style.display = 'none';
            bookingModal.classList.remove('active');
        }
        // Initialize the booking system
        new BookingSystem();
    }, 100);
});

// Star Rating Functionality
function initializeStarRatings() {
    const cardRatings = document.querySelectorAll('.card-rating');
    
    cardRatings.forEach(ratingContainer => {
        const reviewsElement = ratingContainer.closest('.wrapper').querySelector('.reviews');
        const reviewCount = parseInt(reviewsElement.textContent.match(/\d+/)[0]);
        const rating = calculateRating(reviewCount);
        
        // Clear existing stars
        ratingContainer.innerHTML = '';
        
        // Add new dynamic stars
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('ion-icon');
            if (i <= rating) {
                star.setAttribute('name', 'star');
            } else if (i - 0.5 <= rating) {
                star.setAttribute('name', 'star-half');
            } else {
                star.setAttribute('name', 'star-outline');
            }
            
            // Add hover effect
            star.addEventListener('mouseover', () => {
                updateStars(ratingContainer, i);
            });
            
            // Reset on mouse out
            star.addEventListener('mouseout', () => {
                updateStars(ratingContainer, rating);
            });
            
            ratingContainer.appendChild(star);
        }
    });
}

function calculateRating(reviews) {
    // This is a simple algorithm to calculate rating based on number of reviews
    // You can modify this based on your actual rating calculation logic
    const baseRating = 4.0;
    const reviewFactor = Math.min(reviews / 50, 1); // Cap at 50 reviews
    return baseRating + (reviewFactor * 1.0); // Max rating of 5.0
}

function updateStars(container, activeRating) {
    const stars = container.querySelectorAll('ion-icon');
    stars.forEach((star, index) => {
        if (index + 1 <= activeRating) {
            star.setAttribute('name', 'star');
        } else {
            star.setAttribute('name', 'star-outline');
        }
    });
}

// Initialize star ratings when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStarRatings();
});
