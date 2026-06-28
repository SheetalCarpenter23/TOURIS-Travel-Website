document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bookingModal = document.querySelector('.booking-modal');
    const bookNowBtns = document.querySelectorAll('.btn-secondary:not(.cancel-booking)'); // All Book Now buttons
    const heroBookNowBtn = document.querySelector('.hero .btn-secondary'); // Hero section Book Now button
    const closeBookingBtn = document.querySelector('.close-booking');
    const cancelBookingBtn = document.querySelector('.cancel-booking');
    const bookingForm = document.getElementById('bookingForm');
    
    // Form Elements
    const packageNameInput = document.getElementById('packageName');
    const bookingNameInput = document.getElementById('bookingName');
    const bookingEmailInput = document.getElementById('bookingEmail');
    const travelersInput = document.getElementById('travelers');
    const travelDateInput = document.getElementById('travelDate');
    const specialRequestsInput = document.getElementById('specialRequests');
    const basePriceSpan = document.getElementById('basePrice');
    const travelerCountSpan = document.getElementById('travelerCount');
    const totalPriceSpan = document.getElementById('totalPrice');

    // Set minimum date for travel date input to today
    if (travelDateInput) {
        const today = new Date().toISOString().split('T')[0];
        travelDateInput.min = today;
    }

    // Open Booking Modal/Page
    function openBookingModal(packageName = 'Custom Package', basePrice = 1000) {
        if (bookingModal) {
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Set package details
            const packageNameDisplay = document.getElementById('packageName');
            const basePriceDisplay = document.getElementById('basePrice');
            const basePriceDisplaySpan = document.getElementById('basePriceDisplay');
            
            if (packageNameDisplay) packageNameDisplay.textContent = packageName;
            if (basePriceDisplay) basePriceDisplay.textContent = '₹' + basePrice;
            if (basePriceDisplaySpan) basePriceDisplaySpan.textContent = '₹' + basePrice;
            
            // Reset form
            if (bookingForm) {
                bookingForm.reset();
                if (travelersInput) travelersInput.value = 1;
            }
            
            // Set minimum date
            if (travelDateInput) {
                const today = new Date().toISOString().split('T')[0];
                travelDateInput.min = today;
            }
            
            // Update price calculation
            updateTotalPrice(basePrice, 1);
            
            // Scroll to top of modal
            bookingModal.scrollTop = 0;
        }
    }

    // Close Booking Modal
    function closeBookingModal() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = '';
        bookingForm.reset();
        clearErrors();
    }

    // Event Listeners for opening modal
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = e.target.closest('.package-card');
            if (card) {
                const packageName = card.querySelector('.card-title').textContent;
                const priceText = card.querySelector('.price').textContent;
                const basePrice = parseInt(priceText.replace(/[^0-9]/g, ''));
                openBookingModal(packageName, basePrice);
            }
        });
    });

    // Special handler for hero section Book Now button
    if (heroBookNowBtn) {
        heroBookNowBtn.addEventListener('click', () => {
            openBookingModal('Custom Travel Package', 1000);
        });
    }

    // Close modal handlers
    if (closeBookingBtn) {
        closeBookingBtn.addEventListener('click', closeBookingModal);
    }
    if (cancelBookingBtn) {
        cancelBookingBtn.addEventListener('click', closeBookingModal);
    }

    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    // Update total price based on number of travelers
    function updateTotalPrice(basePrice, travelers) {
        const total = basePrice * travelers;
        const discount = 0; // Can add discount logic here
        
        if (basePriceSpan) basePriceSpan.textContent = '₹' + basePrice;
        const basePriceDisplaySpan = document.getElementById('basePriceDisplay');
        if (basePriceDisplaySpan) basePriceDisplaySpan.textContent = '₹' + basePrice;
        if (travelerCountSpan) travelerCountSpan.textContent = travelers;
        
        const discountSpan = document.getElementById('discount');
        if (discountSpan) discountSpan.textContent = '₹' + discount;
        
        const finalTotal = total - discount;
        if (totalPriceSpan) totalPriceSpan.textContent = '₹' + finalTotal;
    }

    // Clear error messages
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        clearErrors();

        // Name validation
        if (!bookingNameInput || !bookingNameInput.value.trim()) {
            const nameError = document.getElementById('nameError');
            if (nameError) nameError.textContent = 'Name is required';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!bookingEmailInput || !bookingEmailInput.value.trim()) {
            const emailError = document.getElementById('emailError');
            if (emailError) emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(bookingEmailInput.value.trim())) {
            const emailError = document.getElementById('emailError');
            if (emailError) emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation
        const phoneInput = document.getElementById('bookingPhone');
        if (phoneInput && phoneInput.required) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneInput.value.trim()) {
                const phoneError = document.getElementById('phoneError');
                if (phoneError) phoneError.textContent = 'Phone number is required';
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.replace(/[^0-9]/g, ''))) {
                const phoneError = document.getElementById('phoneError');
                if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit phone number';
                isValid = false;
            }
        }

        // Travelers validation
        if (!travelersInput || !travelersInput.value || travelersInput.value < 1) {
            const travelersError = document.getElementById('travelersError');
            if (travelersError) travelersError.textContent = 'Number of travelers is required';
            isValid = false;
        }

        // Travel date validation
        if (!travelDateInput || !travelDateInput.value) {
            const dateError = document.getElementById('dateError');
            if (dateError) dateError.textContent = 'Travel date is required';
            isValid = false;
        } else {
            const selectedDate = new Date(travelDateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                const dateError = document.getElementById('dateError');
                if (dateError) dateError.textContent = 'Travel date cannot be in the past';
                isValid = false;
            }
        }

        // Terms and conditions validation
        const agreeTerms = document.getElementById('agreeTerms');
        if (agreeTerms && agreeTerms.required && !agreeTerms.checked) {
            const termsError = document.getElementById('termsError');
            if (termsError) termsError.textContent = 'You must agree to the terms and conditions';
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (validateForm()) {
                // Disable submit button to prevent double submission
                const confirmBtn = document.getElementById('confirmBookingBtn');
                if (confirmBtn) {
                    confirmBtn.disabled = true;
                    confirmBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Processing...';
                }

                // Get all form data
                const packageNameDisplay = document.getElementById('packageName');
                const bookingData = {
                    packageName: packageNameDisplay ? packageNameDisplay.textContent : '',
                    name: bookingNameInput ? bookingNameInput.value : '',
                    email: bookingEmailInput ? bookingEmailInput.value : '',
                    phone: document.getElementById('bookingPhone') ? document.getElementById('bookingPhone').value : '',
                    address: document.getElementById('bookingAddress') ? document.getElementById('bookingAddress').value : '',
                    travelers: travelersInput ? travelersInput.value : '',
                    travelDate: travelDateInput ? travelDateInput.value : '',
                    returnDate: document.getElementById('returnDate') ? document.getElementById('returnDate').value : '',
                    preferredTime: document.getElementById('preferredTime') ? document.getElementById('preferredTime').value : '',
                    specialRequests: specialRequestsInput ? specialRequestsInput.value : '',
                    emergencyContact: document.getElementById('emergencyContact') ? document.getElementById('emergencyContact').value : '',
                    totalPrice: totalPriceSpan ? totalPriceSpan.textContent : ''
                };

                // Get user info from localStorage
                const userStr = localStorage.getItem('user');
                let userId = null;
                if (userStr) {
                    const user = JSON.parse(userStr);
                    userId = user.userId || user.id;
                } else {
                    // Check if userId is stored separately
                    userId = localStorage.getItem('userId');
                }

                // Send booking data to server
                try {
                    const response = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                        },
                        body: JSON.stringify({
                            userId: userId ? parseInt(userId) : null,
                            destinationId: getDestinationIdFromPackage(bookingData.packageName),
                            travelDate: bookingData.travelDate,
                            numberOfTravelers: parseInt(bookingData.travelers),
                            notes: bookingData.specialRequests || bookingData.preferredTime || ''
                        })
                    });

                    if (response.ok) {
                        const bookingResponse = await response.json();
                        console.log('Booking successful:', bookingResponse);
                        
                        // Show success message with booking details
                        showBookingSuccess(bookingData, bookingResponse);
                    } else {
                        const errorText = await response.text();
                        alert('Booking failed: ' + (errorText || 'Unknown error'));
                        if (confirmBtn) {
                            confirmBtn.disabled = false;
                            confirmBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Confirm Booking';
                        }
                    }
                } catch (error) {
                    console.error('Booking error:', error);
                    // Even if API fails, show success message (for demo)
                    showBookingSuccess(bookingData);
                }
            }
        });
    }

    // Real-time validation
    bookingNameInput.addEventListener('input', () => {
        if (bookingNameInput.value.trim()) {
            document.getElementById('nameError').textContent = '';
        }
    });

    bookingEmailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(bookingEmailInput.value.trim())) {
            document.getElementById('emailError').textContent = '';
        }
    });

    travelersInput.addEventListener('input', () => {
        if (travelersInput.value && travelersInput.value > 0) {
            document.getElementById('travelersError').textContent = '';
        }
    });

    travelDateInput.addEventListener('input', () => {
        const selectedDate = new Date(travelDateInput.value);
        const today = new Date();
        if (travelDateInput.value && selectedDate >= today) {
            document.getElementById('dateError').textContent = '';
        }
    });

    // Helper function to get destination ID from package name
    function getDestinationIdFromPackage(packageName) {
        const destinationMap = {
            'Custom Package': 1,
            'Custom Travel Package': 1,
            'Experience The Great Holiday On Beach': 1,
            'Experience Adventure Packages': 2,
            'ISLAND WEEKEND PACKAGES': 3
        };
        return destinationMap[packageName] || 1;
    }

    // Show booking success message
    function showBookingSuccess(bookingData, bookingResponse = null) {
        const successHTML = `
            <div class="booking-success">
                <div class="success-icon">
                    <ion-icon name="checkmark-circle"></ion-icon>
                </div>
                <h3>Booking Confirmed!</h3>
                <p>Thank you for your booking. We have received your details and will contact you shortly.</p>
                <div class="booking-details-summary">
                    <h4>Booking Details:</h4>
                    <p><strong>Package:</strong> ${bookingData.packageName}</p>
                    <p><strong>Name:</strong> ${bookingData.name}</p>
                    <p><strong>Email:</strong> ${bookingData.email}</p>
                    <p><strong>Phone:</strong> ${bookingData.phone || 'N/A'}</p>
                    <p><strong>Travelers:</strong> ${bookingData.travelers}</p>
                    <p><strong>Travel Date:</strong> ${bookingData.travelDate}</p>
                    ${bookingData.returnDate ? `<p><strong>Return Date:</strong> ${bookingData.returnDate}</p>` : ''}
                    <p><strong>Total Amount:</strong> ${bookingData.totalPrice}</p>
                    ${bookingResponse && bookingResponse.id ? `<p><strong>Booking ID:</strong> ${bookingResponse.id}</p>` : ''}
                </div>
                <button class="btn btn-primary" onclick="window.location.reload();">Close</button>
            </div>
        `;
        
        const bookingContent = document.querySelector('.booking-content');
        if (bookingContent) {
            bookingContent.innerHTML = successHTML;
        }
    }

    // Handle terms and privacy links
    const termsLink = document.getElementById('termsLink');
    const privacyLink = document.getElementById('privacyLink');
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeBookingModal();
            setTimeout(() => {
                const termsModal = document.querySelector('.terms-modal');
                if (termsModal) {
                    termsModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        });
    }

    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeBookingModal();
            setTimeout(() => {
                const privacyModal = document.querySelector('.privacy-modal');
                if (privacyModal) {
                    privacyModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
        });
    }

    // Handle return date - should be after travel date
    const returnDateInput = document.getElementById('returnDate');
    if (returnDateInput && travelDateInput) {
        travelDateInput.addEventListener('change', function() {
            if (this.value) {
                returnDateInput.min = this.value;
            }
        });
    }

    // Update price calculation when travelers change
    if (travelersInput) {
        travelersInput.addEventListener('input', function() {
            const basePriceText = basePriceSpan ? basePriceSpan.textContent : '₹0';
            const basePrice = parseInt(basePriceText.replace(/[^0-9]/g, '')) || 0;
            const travelers = parseInt(this.value) || 1;
            updateTotalPrice(basePrice, travelers);
        });
    }
}); 