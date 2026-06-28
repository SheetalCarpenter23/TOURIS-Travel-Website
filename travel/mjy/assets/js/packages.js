// All Packages Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewAllPackagesBtn = document.querySelector('.package .btn-primary');
    const packagesModal = document.querySelector('.all-packages-modal');
    const closePackagesBtn = document.querySelector('.close-packages');
    const backBtn = document.querySelector('.all-packages-modal .back-btn');
    const packagesGrid = document.querySelector('.packages-grid');

    // Updated packages data with all destinations
    const allPackages = [
        {
            title: "Tropical Paradise - Bali",
            location: "Indonesia",
            duration: "6D/5N",
            price: "₹65,000",
            image: "./assets/images/packege-1.jpg",
            rating: 4.8,
            reviews: 120,
            category: "Beach",
            description: "Famous for its beaches, temples, and affordable luxury resorts. Experience the perfect blend of culture and relaxation."
        },
        {
            title: "Romantic Paris Tour",
            location: "France",
            duration: "7D/6N",
            price: "₹125,000",
            image: "./assets/images/packege-2.jpg",
            rating: 4.9,
            reviews: 95,
            category: "Heritage",
            description: "The city of love, iconic Eiffel Tower, art, fashion, and fine cuisine. Experience the magic of Paris."
        },
        {
            title: "Maldives Paradise",
            location: "Maldives",
            duration: "5D/4N",
            price: "₹95,000",
            image: "./assets/images/packege-3.jpg",
            rating: 5.0,
            reviews: 88,
            category: "Beach",
            description: "Overwater bungalows, crystal-clear water, perfect for honeymooners. Your dream tropical getaway."
        },
        {
            title: "Tokyo Explorer",
            location: "Japan",
            duration: "8D/7N",
            price: "₹115,000",
            image: "./assets/images/gallery-1.jpg",
            rating: 4.7,
            reviews: 76,
            category: "Culture",
            description: "Blend of tradition and tech, anime culture, cherry blossoms, and sushi. Discover Japan's unique charm."
        },
        {
            title: "Swiss Alps Adventure",
            location: "Switzerland",
            duration: "7D/6N",
            price: "₹135,000",
            image: "./assets/images/gallery-2.jpg",
            rating: 4.9,
            reviews: 92,
            category: "Adventure",
            description: "Snow-covered Alps, scenic train rides, chocolates, and skiing. Experience winter wonderland."
        },
        {
            title: "Dubai Extravaganza",
            location: "UAE",
            duration: "5D/4N",
            price: "₹85,000",
            image: "./assets/images/gallery-3.jpg",
            rating: 4.8,
            reviews: 105,
            category: "Luxury",
            description: "Luxury shopping, desert safaris, Burj Khalifa, and futuristic cityscape. Experience modern marvels."
        },
        {
            title: "Santorini Escape",
            location: "Greece",
            duration: "6D/5N",
            price: "₹105,000",
            image: "./assets/images/popular-1.jpg",
            rating: 4.9,
            reviews: 87,
            category: "Beach",
            description: "Whitewashed buildings with blue domes, cliffside views, sunsets. Romance meets beauty."
        },
        {
            title: "New York City Explorer",
            location: "USA",
            duration: "7D/6N",
            price: "₹145,000",
            image: "./assets/images/popular-2.jpg",
            rating: 4.7,
            reviews: 98,
            category: "City",
            description: "The city that never sleeps – Broadway, Times Square, Central Park. Experience the Big Apple."
        },
        {
            title: "Rome Historical Tour",
            location: "Italy",
            duration: "6D/5N",
            price: "₹115,000",
            image: "./assets/images/popular-3.jpg",
            rating: 4.8,
            reviews: 112,
            category: "Heritage",
            description: "Historical ruins like the Colosseum, Vatican City, and pasta! Journey through ancient history."
        },
        {
            title: "Sydney Adventure",
            location: "Australia",
            duration: "8D/7N",
            price: "₹155,000",
            image: "./assets/images/packege-2.jpg",
            rating: 4.6,
            reviews: 79,
            category: "City",
            description: "Opera House, Harbour Bridge, beautiful beaches and marine life. Experience Down Under."
        }
    ];

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .packages-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--gainsboro);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .back-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            background: none;
            border: none;
            color: var(--space-cadet);
            font-size: 1rem;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        .back-btn:hover {
            background-color: var(--gainsboro);
        }

        .back-btn ion-icon {
            font-size: 1.2rem;
        }

        .packages-header h2 {
            margin: 0;
            color: var(--space-cadet);
            font-size: 2rem;
            font-weight: 600;
        }

        @media (max-width: 768px) {
            .packages-header h2 {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(styles);

    // Event Listeners
    viewAllPackagesBtn.addEventListener('click', () => {
        packagesModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        displayPackages(allPackages);
    });

    function closeModal() {
        packagesModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    function scrollToPackages() {
        closeModal();
        const packagesSection = document.getElementById('package');
        packagesSection.scrollIntoView({ behavior: 'smooth' });
    }

    closePackagesBtn.addEventListener('click', closeModal);
    backBtn.addEventListener('click', scrollToPackages);

    packagesModal.addEventListener('click', (e) => {
        if (e.target === packagesModal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && packagesModal.style.display === 'block') {
            closeModal();
        }
    });

    // Filter change handlers
    const filters = document.querySelectorAll('.packages-filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            const filteredPackages = filterPackages(allPackages);
            displayPackages(filteredPackages);
        });
    });

    // Display packages with content at bottom of image
    function displayPackages(packages) {
        packagesGrid.innerHTML = packages.map(pkg => `
            <div class="package-card">
                <figure class="card-banner">
                    <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
                </figure>

                <div class="card-content">
                    <h3 class="h3 card-title">${pkg.title}</h3>

                    <p class="card-text">${pkg.description}</p>

                    <ul class="card-meta-list">
                        <li class="card-meta-item">
                            <div class="meta-box">
                                <ion-icon name="time"></ion-icon>
                                <p class="text">${pkg.duration}</p>
                            </div>
                        </li>

                        <li class="card-meta-item">
                            <div class="meta-box">
                                <ion-icon name="people"></ion-icon>
                                <p class="text">pax: 10</p>
                            </div>
                        </li>

                        <li class="card-meta-item">
                            <div class="meta-box">
                                <ion-icon name="location"></ion-icon>
                                <p class="text">${pkg.location}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="card-price">
                    <div class="wrapper">
                        <p class="reviews">(${pkg.reviews} reviews)</p>
                        <div class="card-rating">
                            ${getStarRating(pkg.rating)}
                        </div>
                    </div>

                    <p class="price">
                        ${pkg.price}
                        <span>/ per person</span>
                    </p>

                    <button class="btn btn-secondary book-now">Book Now</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to Book Now buttons
        const bookNowButtons = packagesGrid.querySelectorAll('.book-now');
        const bookingModal = document.querySelector('.booking-modal');
        
        bookNowButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.package-card');
                const packageTitle = card.querySelector('.card-title').textContent.trim();
                const packagePrice = card.querySelector('.price').textContent;
                
                // Close packages modal
                closeModal();
                
                // Open booking modal
                openBookingModal(packageTitle, packagePrice);
            });
        });
    }

    // Function to open booking modal
    function openBookingModal(packageTitle, packagePrice) {
        const bookingModal = document.querySelector('.booking-modal');
        const bookingForm = document.getElementById('bookingForm');
        const packageNameInput = document.getElementById('packageName');
        const basePriceSpan = document.getElementById('basePrice');
        const closeBtn = document.querySelector('.close-booking');
        const cancelBtn = document.querySelector('.cancel-booking');

        // Set package details
        packageNameInput.value = packageTitle;
        basePriceSpan.textContent = packagePrice;
        updateTotalPrice(parseInt(packagePrice.replace(/[^0-9]/g, '')), 1);

        // Show modal
        if (bookingModal) {
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        // Set minimum date to today for travel date input
        const travelDateInput = document.getElementById('travelDate');
        const today = new Date().toISOString().split('T')[0];
        travelDateInput.min = today;

        // Close modal handlers
        closeBtn.onclick = closeBookingModal;
        cancelBtn.onclick = closeBookingModal;
        window.onclick = (e) => {
            if (e.target === bookingModal) closeBookingModal();
        };

        // Form submission handler
        bookingForm.onsubmit = handleBookingSubmit;
    }

    // Function to close booking modal
    function closeBookingModal() {
        const bookingModal = document.querySelector('.booking-modal');
        const bookingForm = document.getElementById('bookingForm');
        bookingModal.style.display = 'none';
        document.body.style.overflow = '';
        bookingForm.reset();
        clearErrors();
    }

    // Function to update total price
    function updateTotalPrice(basePrice, travelers) {
        const total = basePrice * travelers;
        document.getElementById('basePrice').textContent = '₹' + basePrice;
        document.getElementById('travelerCount').textContent = travelers;
        document.getElementById('totalPrice').textContent = '₹' + total;
    }

    // Function to clear error messages
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => error.textContent = '');
    }

    // Function to handle booking form submission
    function handleBookingSubmit(e) {
        e.preventDefault();
        
        if (validateBookingForm()) {
            // Get form data
            const formData = {
                packageName: document.getElementById('packageName').value,
                name: document.getElementById('bookingName').value,
                email: document.getElementById('bookingEmail').value,
                travelers: document.getElementById('travelers').value,
                travelDate: document.getElementById('travelDate').value,
                specialRequests: document.getElementById('specialRequests').value,
                totalPrice: document.getElementById('totalPrice').textContent
            };

            // Show success message
            showBookingSuccess(formData);

            // Log booking data (replace with actual API call)
            console.log('Booking submitted:', formData);
        }
    }

    // Function to validate booking form
    function validateBookingForm() {
        let isValid = true;
        clearErrors();

        // Name validation
        const nameInput = document.getElementById('bookingName');
        if (!nameInput.value.trim()) {
            showError('nameError', 'Name is required');
            isValid = false;
        }

        // Email validation
        const emailInput = document.getElementById('bookingEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Travelers validation
        const travelersInput = document.getElementById('travelers');
        if (!travelersInput.value || travelersInput.value < 1) {
            showError('travelersError', 'Number of travelers is required');
            isValid = false;
        }

        // Travel date validation
        const dateInput = document.getElementById('travelDate');
        if (!dateInput.value) {
            showError('dateError', 'Travel date is required');
            isValid = false;
        } else {
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            if (selectedDate < today) {
                showError('dateError', 'Travel date cannot be in the past');
                isValid = false;
            }
        }

        return isValid;
    }

    // Function to show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Function to show booking success message
    function showBookingSuccess(formData) {
        const bookingModal = document.querySelector('.booking-modal');
        const bookingContent = bookingModal.querySelector('.booking-content');
        const bookingReference = generateBookingReference();

        bookingContent.innerHTML = `
            <div class="booking-success">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <h3>Booking Confirmed!</h3>
                <p>Thank you for booking ${formData.packageName}</p>
                <p>We have sent a confirmation email to ${formData.email}</p>
                <p>Your booking reference: ${bookingReference}</p>
                <button class="btn btn-primary" onclick="window.location.reload()">Done</button>
            </div>
        `;

        // Auto close after 3 seconds
        setTimeout(() => {
            closeBookingModal();
            window.location.reload();
        }, 3000);
    }

    // Function to generate booking reference
    function generateBookingReference() {
        return 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Filter packages based on selected filters
    function filterPackages(packages) {
        const categoryFilter = document.getElementById('packageCategoryFilter').value;
        const priceFilter = document.getElementById('packagePriceFilter').value;
        const typeFilter = document.getElementById('packageTypeFilter').value;
        const durationFilter = document.getElementById('packageDurationFilter').value;

        return packages.filter(pkg => {
            const matchesCategory = !categoryFilter || pkg.category === categoryFilter;
            const matchesType = !typeFilter || pkg.type === typeFilter;
            
            let matchesPrice = true;
            if (priceFilter) {
                const price = parseInt(pkg.price.replace(/[^0-9]/g, ''));
                switch(priceFilter) {
                    case '0-50000':
                        matchesPrice = price < 50000;
                        break;
                    case '50000-100000':
                        matchesPrice = price >= 50000 && price <= 100000;
                        break;
                    case '100000+':
                        matchesPrice = price > 100000;
                        break;
                }
            }

            let matchesDuration = true;
            if (durationFilter) {
                const days = parseInt(pkg.duration);
                switch(durationFilter) {
                    case '1-3':
                        matchesDuration = days <= 3;
                        break;
                    case '4-7':
                        matchesDuration = days > 3 && days <= 7;
                        break;
                    case '8+':
                        matchesDuration = days > 7;
                        break;
                }
            }

            return matchesCategory && matchesType && matchesPrice && matchesDuration;
        });
    }

    // Generate star rating HTML
    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += '<ion-icon name="star"></ion-icon>';
            } else if (i === fullStars && hasHalfStar) {
                starsHTML += '<ion-icon name="star-half"></ion-icon>';
            } else {
                starsHTML += '<ion-icon name="star-outline"></ion-icon>';
            }
        }
        
        return starsHTML;
    }
}); 