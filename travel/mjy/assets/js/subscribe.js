document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.querySelector('.footer-form form');
    const emailInput = document.querySelector('.footer-form .input-field');
    const subscribePopup = document.querySelector('.subscribe-popup');

    // Add styles for the popup
    const styles = document.createElement('style');
    styles.textContent = `
        .subscribe-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--white);
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            text-align: center;
            animation: popupFadeIn 0.3s ease-out;
            min-width: 300px;
        }

        @keyframes popupFadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }

        .popup-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }

        .popup-icon {
            font-size: 3rem;
            color: #4CAF50;
            animation: iconScale 0.5s ease-out;
        }

        @keyframes iconScale {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }

        .popup-icon ion-icon {
            width: 64px;
            height: 64px;
        }

        .subscribe-popup h3 {
            color: var(--space-cadet);
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
        }

        .subscribe-popup p {
            color: var(--battleship-gray);
            margin: 0;
            font-size: 1rem;
            line-height: 1.5;
        }

        .subscribe-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .input-field.error {
            border-color: #ff4444;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        .error-message {
            color: #ff4444;
            font-size: 0.875rem;
            margin-top: 5px;
            display: none;
        }
    `;
    document.head.appendChild(styles);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'subscribe-overlay';
    document.body.appendChild(overlay);

    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);

    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset previous error states
        emailInput.classList.remove('error');
        errorMessage.style.display = 'none';

        // Basic email validation
        const email = emailInput.value.trim();
        if (!email) {
            showError('Please enter your email address');
            return;
        }
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Show success popup
        showSubscribePopup();

        // Reset form
        subscribeForm.reset();
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(message) {
        emailInput.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function showSubscribePopup() {
        overlay.style.display = 'block';
        subscribePopup.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Hide popup after 3 seconds
        setTimeout(() => {
            hideSubscribePopup();
        }, 3000);
    }

    function hideSubscribePopup() {
        overlay.style.display = 'none';
        subscribePopup.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Close popup when clicking overlay
    overlay.addEventListener('click', hideSubscribePopup);

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && subscribePopup.style.display === 'block') {
            hideSubscribePopup();
        }
    });
}); 