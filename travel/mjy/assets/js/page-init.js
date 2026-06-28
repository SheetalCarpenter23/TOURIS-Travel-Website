// Page Initialization - Ensure UI is visible and modals are hidden
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all modals are hidden on page load
    const allModals = [
        '.booking-modal',
        '.contact-modal',
        '.search-modal',
        '.all-packages-modal',
        '.sign-in-modal',
        '.terms-modal',
        '.faq-modal',
        '.privacy-modal',
        '.destinations-modal',
        '.subscribe-popup'
    ];

    allModals.forEach(modalSelector => {
        const modal = document.querySelector(modalSelector);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
    });

    // Ensure body is visible and scrollable
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');

    // Ensure overlay is hidden
    const overlay = document.querySelector('.overlay, .sign-in-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }

    // Ensure main content is visible
    const main = document.querySelector('main');
    if (main) {
        main.style.display = '';
        main.style.visibility = '';
        main.style.opacity = '';
    }

    // Ensure header is visible
    const header = document.querySelector('.header');
    if (header) {
        header.style.display = '';
        header.style.visibility = '';
        header.style.opacity = '';
    }

    // Remove any loading screens or blockers
    const loaders = document.querySelectorAll('.loader, .loading, .page-loader');
    loaders.forEach(loader => {
        loader.style.display = 'none';
    });

    console.log('Page initialized - UI should be visible');
});

// Also run on window load to ensure everything is set
window.addEventListener('load', function() {
    // Double check all modals are hidden
    document.querySelectorAll('[class*="modal"], [class*="popup"]').forEach(element => {
        if (element.classList.contains('modal') || element.classList.contains('popup')) {
            if (!element.classList.contains('always-visible')) {
                element.style.display = 'none';
            }
        }
    });

    // Ensure body scroll is enabled
    document.body.style.overflow = '';
    document.body.style.overflowX = '';
    document.body.style.overflowY = '';
});

