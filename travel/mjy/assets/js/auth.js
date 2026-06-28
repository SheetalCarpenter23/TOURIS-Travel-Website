document.addEventListener('DOMContentLoaded', function() {
    const signInModal = document.querySelector('.sign-in-modal');
    const signInOverlay = document.querySelector('.sign-in-overlay');
    const signInBtn = document.querySelector('.header-bottom .btn-primary');
    const closeSignInBtn = document.querySelector('.close-sign-in');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('modalTitle');

    // Function to open modal
    function openModal() {
        if (signInModal) {
            signInModal.style.display = 'flex';
            signInModal.classList.add('active');
        }
        if (signInOverlay) {
            signInOverlay.classList.add('active');
        }
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        if (signInModal) {
            signInModal.style.display = 'none';
            signInModal.classList.remove('active');
        }
        if (signInOverlay) {
            signInOverlay.classList.remove('active');
        }
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    // Show modal when Sign In button is clicked
    signInBtn.addEventListener('click', openModal);

    // Close modal when close button is clicked
    closeSignInBtn.addEventListener('click', closeModal);

    // Close modal when clicking overlay
    signInOverlay.addEventListener('click', closeModal);

    // Switch to registration form
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        modalTitle.textContent = 'Register';
    });

    // Switch to login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        modalTitle.textContent = 'Sign In';
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Clear previous error messages
        clearErrors();

        // Basic validation
        if (!email || !password) {
            if (!email) showError('loginEmailError', 'Email is required');
            if (!password) showError('loginPasswordError', 'Password is required');
            return;
        }

        try {
            // Make API call to backend
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const user = {
                    userId: data.userId,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    token: data.token,
                    isLoggedIn: true
                };
                
                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', data.token);
                
                // Update UI to show logged in state
                updateUIForLoggedInUser(user);
                
                // Close modal
                closeModal();
                
                // Show success message
                alert('Successfully logged in!');
            } else {
                const errorData = await response.json();
                showError('loginEmailError', errorData.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('loginEmailError', 'An error occurred. Please try again.');
        }
    });

    // Handle registration form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Clear previous error messages
        clearErrors();

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            if (!name) showError('registerNameError', 'Name is required');
            if (!email) showError('registerEmailError', 'Email is required');
            if (!password) showError('registerPasswordError', 'Password is required');
            if (!confirmPassword) showError('confirmPasswordError', 'Please confirm your password');
            return;
        }

        if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            return;
        }

        try {
            // Make API call to backend
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const user = {
                    userId: data.userId,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    token: data.token,
                    isLoggedIn: true
                };
                
                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', data.token);
                
                // Update UI to show logged in state
                updateUIForLoggedInUser(user);
                
                // Close modal
                closeModal();
                
                // Show success message
                alert('Successfully registered and logged in!');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || errorData.email || 'Registration failed. Please try again.';
                showError('registerEmailError', errorMessage);
            }
        } catch (error) {
            console.error('Registration error:', error);
            showError('registerEmailError', 'Registration failed. Please try again.');
        }
    });

    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function updateUIForLoggedInUser(user) {
        const signInBtn = document.querySelector('.header-bottom .btn-primary');
        signInBtn.textContent = 'My Account';
        // You can add more UI updates here
    }

    // Check if user is already logged in on page load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        updateUIForLoggedInUser(user);
    }

    // Handle escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && signInModal.classList.contains('active')) {
            closeModal();
        }
    });
}); 