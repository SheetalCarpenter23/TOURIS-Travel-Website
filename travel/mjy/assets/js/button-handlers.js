// Comprehensive Button Handlers - All buttons responsive and working
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SIGN IN BUTTON ==========
    const signInBtn = document.querySelector('.header-bottom .btn-primary');
    if (signInBtn && signInBtn.textContent.trim() === 'Sign In') {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const signInModal = document.querySelector('.sign-in-modal');
            if (signInModal) {
                signInModal.style.display = 'flex';
                signInModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // ========== HERO SECTION BUTTONS ==========
    // Learn More Button
    const learnMoreBtn = document.querySelector('.hero .btn-primary');
    if (learnMoreBtn && learnMoreBtn.textContent.includes('Learn more')) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Hero Book Now Button
    const heroBookNowBtn = document.querySelector('.hero .btn-secondary');
    if (heroBookNowBtn && heroBookNowBtn.textContent.includes('Book now')) {
        heroBookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const bookingModal = document.querySelector('.booking-modal');
            if (bookingModal) {
                bookingModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Set default values
                const packageNameInput = document.getElementById('packageName');
                const basePriceSpan = document.getElementById('basePrice');
                if (packageNameInput) packageNameInput.value = 'Custom Travel Package';
                if (basePriceSpan) basePriceSpan.textContent = '₹1000';
            }
        });
    }

    // ========== MORE DESTINATIONS BUTTON ==========
    const moreDestBtn = document.querySelector('.popular .btn-primary');
    if (moreDestBtn) {
        moreDestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const destinationsModal = document.querySelector('.destinations-modal');
            const allPackagesModal = document.querySelector('.all-packages-modal');
            
            if (destinationsModal) {
                destinationsModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } else if (allPackagesModal) {
                allPackagesModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // ========== VIEW ALL PACKAGES BUTTON ==========
    const viewAllPackagesBtn = document.querySelector('.package .btn-primary');
    if (viewAllPackagesBtn && viewAllPackagesBtn.textContent.includes('View All')) {
        viewAllPackagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const allPackagesModal = document.querySelector('.all-packages-modal');
            if (allPackagesModal) {
                allPackagesModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // ========== CONTACT US BUTTON ==========
    const contactUsBtn = document.querySelector('.cta .btn-secondary');
    if (contactUsBtn && contactUsBtn.textContent.includes('Contact')) {
        contactUsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactModal = document.querySelector('.contact-modal');
            if (contactModal) {
                contactModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // ========== SEARCH BUTTON ==========
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchModal = document.querySelector('.search-modal');
            if (searchModal) {
                searchModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Focus on search input
                const searchInput = searchModal.querySelector('.search-input');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });
    }

    // ========== CLOSE MODAL HANDLERS ==========
    // Close all modals when clicking outside
    document.querySelectorAll('.booking-modal, .contact-modal, .search-modal, .all-packages-modal, .sign-in-modal, .terms-modal, .faq-modal, .privacy-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.booking-modal, .contact-modal, .search-modal, .all-packages-modal, .sign-in-modal, .terms-modal, .faq-modal, .privacy-modal').forEach(modal => {
                if (modal.style.display === 'flex' || modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // ========== RESPONSIVE BUTTON STYLING ==========
    // Ensure all buttons are clickable and responsive
    document.querySelectorAll('.btn, button').forEach(btn => {
        // Add touch support for mobile
        btn.style.touchAction = 'manipulation';
        btn.style.webkitTapHighlightColor = 'transparent';
        
        // Ensure buttons are visible and clickable
        if (btn.offsetWidth === 0 && btn.offsetHeight === 0) {
            console.warn('Button may be hidden:', btn);
        }
    });

    // ========== NAVIGATION LINKS ==========
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Close mobile menu if open
                    const navbar = document.querySelector('[data-navbar]');
                    const overlay = document.querySelector('[data-overlay]');
                    if (navbar && navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        if (overlay) overlay.classList.remove('active');
                    }
                }
            }
        });
    });
});

