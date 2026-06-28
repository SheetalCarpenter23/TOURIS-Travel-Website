// Destinations API Integration
// This file handles fetching destinations from the backend API

document.addEventListener('DOMContentLoaded', async function() {
    // Fetch destinations from API
    try {
        const response = await fetch('/api/destinations');
        if (response.ok) {
            const destinations = await response.json();
            renderDestinations(destinations);
        } else {
            console.error('Failed to fetch destinations');
            // Fallback to static destinations if API fails
            loadStaticDestinations();
        }
    } catch (error) {
        console.error('Error fetching destinations:', error);
        // Fallback to static destinations if API fails
        loadStaticDestinations();
    }
});

/**
 * Render destinations dynamically on the page
 */
function renderDestinations(destinations) {
    // Find the destinations container (adjust selector based on your HTML structure)
    const destinationsContainer = document.querySelector('.popular .popular-list') || 
                                  document.querySelector('.packages-grid') ||
                                  document.querySelector('.destinations-grid');
    
    if (!destinationsContainer) {
        console.warn('Destinations container not found');
        return;
    }

    // Clear existing content or append
    destinationsContainer.innerHTML = '';

    // Render each destination
    destinations.forEach(destination => {
        const destinationCard = createDestinationCard(destination);
        destinationsContainer.appendChild(destinationCard);
    });
}

/**
 * Create a destination card element
 */
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'package-card'; // Adjust class name based on your CSS

    card.innerHTML = `
        <figure class="card-img">
            <img src="${destination.imageUrl || './assets/images/gallery-1.jpg'}" 
                 alt="${destination.destinationName}" loading="lazy">
        </figure>
        <div class="card-content">
            <div class="card-rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
            </div>
            <h3 class="card-title">${destination.destinationName}</h3>
            <p class="card-text">${destination.description || ''}</p>
            <div class="card-price">
                <span class="price">₹${destination.price || 0}</span>
                <span class="duration">${destination.duration || ''}</span>
            </div>
            <button class="btn-secondary" data-destination-id="${destination.id}">
                Book Now
            </button>
        </div>
    `;

    // Add event listener for Book Now button
    const bookNowBtn = card.querySelector('.btn-secondary');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            const destinationId = this.getAttribute('data-destination-id');
            openBookingModal(destination.destinationName, destination.price, destinationId);
        });
    }

    return card;
}

/**
 * Open booking modal with destination details
 */
function openBookingModal(destinationName, price, destinationId) {
    // This function should be defined in booking.js
    // If it exists, call it; otherwise, trigger the booking modal manually
    if (typeof window.openBookingModal === 'function') {
        window.openBookingModal(destinationName, price, destinationId);
    } else {
        // Fallback: trigger existing booking modal
        const bookingModal = document.querySelector('.booking-modal');
        if (bookingModal) {
            bookingModal.style.display = 'block';
            const packageNameInput = document.getElementById('packageName');
            const basePriceSpan = document.getElementById('basePrice');
            if (packageNameInput) packageNameInput.value = destinationName;
            if (basePriceSpan) basePriceSpan.textContent = '₹' + price;
            
            // Store destination ID for booking
            bookingModal.setAttribute('data-destination-id', destinationId);
        }
    }
}

/**
 * Fallback: Load static destinations if API fails
 */
function loadStaticDestinations() {
    console.log('Loading static destinations as fallback');
    // The existing destinations.js will handle this
}




