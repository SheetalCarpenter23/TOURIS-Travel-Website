// Sample destination data (you can replace this with your actual data)
const destinations = [
    { name: 'Goa', type: 'Beach', price: '20000', category: 'Popular' },
    { name: 'Manali', type: 'Mountain', price: '15000', category: 'Adventure' },
    { name: 'Kerala', type: 'Nature', price: '25000', category: 'Family' },
    { name: 'Rajasthan', type: 'Culture', price: '30000', category: 'Heritage' },
    { name: 'Andaman', type: 'Island', price: '40000', category: 'Honeymoon' }
];

class SmartSearch {
    constructor() {
        this.searchModal = null;
        this.recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        this.currentLocation = null;
        this.init();
    }

    init() {
        // Initialize search when search button is clicked
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.createSearchModal());
        }

        // Get user's location
        this.getUserLocation();
    }

    createSearchModal() {
        // Create and append search modal
        this.searchModal = document.createElement('div');
        this.searchModal.className = 'search-modal';
        this.searchModal.innerHTML = `
            <div class="search-content">
                <div class="search-header">
                    <div class="search-filters">
                        <select class="filter-select" id="categoryFilter">
                            <option value="">All Categories</option>
                            <option value="Popular">Popular</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Family">Family</option>
                            <option value="Heritage">Heritage</option>
                            <option value="Honeymoon">Honeymoon</option>
                        </select>
                        <select class="filter-select" id="priceFilter">
                            <option value="">All Prices</option>
                            <option value="0-15000">Under ₹15,000</option>
                            <option value="15000-25000">₹15,000 - ₹25,000</option>
                            <option value="25000+">Above ₹25,000</option>
                        </select>
                    </div>
                    <button class="close-search">×</button>
                </div>
                <div class="search-input-wrapper">
                    <input type="text" placeholder="Search destinations..." class="search-input">
                    <div class="search-suggestions"></div>
                </div>
                <div class="recent-searches"></div>
                <div class="nearby-destinations"></div>
                <div class="search-results"></div>
            </div>
        `;

        document.body.appendChild(this.searchModal);

        // Initialize event listeners
        this.initializeEventListeners();
        this.showRecentSearches();
        if (this.currentLocation) {
            this.showNearbyDestinations();
        }
    }

    initializeEventListeners() {
        const searchInput = this.searchModal.querySelector('.search-input');
        const closeBtn = this.searchModal.querySelector('.close-search');
        const categoryFilter = this.searchModal.querySelector('#categoryFilter');
        const priceFilter = this.searchModal.querySelector('#priceFilter');

        // Close button
        closeBtn.addEventListener('click', () => this.closeSearchModal());

        // Search input
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Filters
        categoryFilter.addEventListener('change', () => this.handleSearch(searchInput.value));
        priceFilter.addEventListener('change', () => this.handleSearch(searchInput.value));

        // Close on outside click
        this.searchModal.addEventListener('click', (e) => {
            if (e.target === this.searchModal) {
                this.closeSearchModal();
            }
        });
    }

    handleSearch(query) {
        const categoryFilter = this.searchModal.querySelector('#categoryFilter').value;
        const priceFilter = this.searchModal.querySelector('#priceFilter').value;
        const suggestionsContainer = this.searchModal.querySelector('.search-suggestions');
        const resultsContainer = this.searchModal.querySelector('.search-results');

        // Clear previous results
        suggestionsContainer.innerHTML = '';
        resultsContainer.innerHTML = '';

        if (!query.trim()) {
            this.showRecentSearches();
            return;
        }

        // Filter destinations
        let filteredDestinations = destinations.filter(dest => {
            const matchesQuery = dest.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = !categoryFilter || dest.category === categoryFilter;
            const matchesPrice = this.checkPriceRange(dest.price, priceFilter);
            return matchesQuery && matchesCategory && matchesPrice;
        });

        // Show suggestions
        if (filteredDestinations.length > 0) {
            const suggestions = filteredDestinations.map(dest => `
                <div class="suggestion-item" data-name="${dest.name}">
                    <strong>${this.highlightText(dest.name, query)}</strong>
                    <span>${dest.category} | ₹${dest.price}</span>
                </div>
            `).join('');
            suggestionsContainer.innerHTML = suggestions;

            // Add click handlers to suggestions
            suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectDestination(item.dataset.name);
                });
            });
        } else {
            suggestionsContainer.innerHTML = '<div class="no-results">No matching destinations found</div>';
        }
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    selectDestination(name) {
        // Add to recent searches
        if (!this.recentSearches.includes(name)) {
            this.recentSearches.unshift(name);
            if (this.recentSearches.length > 5) {
                this.recentSearches.pop();
            }
            localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        }

        // Close modal and perform search
        this.closeSearchModal();
        // Here you can add logic to navigate to the destination page
        console.log(`Selected destination: ${name}`);
    }

    showRecentSearches() {
        const recentContainer = this.searchModal.querySelector('.recent-searches');
        if (this.recentSearches.length > 0) {
            const recentHTML = `
                <h3>Recent Searches</h3>
                <div class="recent-list">
                    ${this.recentSearches.map(search => `
                        <div class="recent-item" data-name="${search}">${search}</div>
                    `).join('')}
                </div>
            `;
            recentContainer.innerHTML = recentHTML;

            // Add click handlers
            recentContainer.querySelectorAll('.recent-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectDestination(item.dataset.name);
                });
            });
        }
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                },
                error => {
                    console.log('Error getting location:', error);
                }
            );
        }
    }

    showNearbyDestinations() {
        const nearbyContainer = this.searchModal.querySelector('.nearby-destinations');
        // In a real application, you would use the currentLocation to fetch nearby destinations
        // For demo purposes, we'll show some sample destinations
        nearbyContainer.innerHTML = `
            <h3>Nearby Destinations</h3>
            <div class="nearby-list">
                <div class="nearby-item">Sample Nearby Location 1</div>
                <div class="nearby-item">Sample Nearby Location 2</div>
            </div>
        `;
    }

    checkPriceRange(price, range) {
        if (!range) return true;
        price = parseInt(price);
        switch (range) {
            case '0-15000':
                return price <= 15000;
            case '15000-25000':
                return price > 15000 && price <= 25000;
            case '25000+':
                return price > 25000;
            default:
                return true;
        }
    }

    closeSearchModal() {
        if (this.searchModal) {
            this.searchModal.remove();
            this.searchModal = null;
        }
    }
}

// Initialize smart search
document.addEventListener('DOMContentLoaded', () => {
    new SmartSearch();
}); 