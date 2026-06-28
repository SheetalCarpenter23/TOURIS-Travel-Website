document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactModal = document.querySelector('.contact-modal');
    const contactBtn = document.querySelector('.cta .btn-secondary');
    const closeContactBtn = document.querySelector('.close-contact');
    const closeContactBtnAlt = document.querySelector('.close-contact-btn');
    const contactForm = document.getElementById('contactForm');

    // Form Elements
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const contactSubject = document.getElementById('contactSubject');
    const contactMessage = document.getElementById('contactMessage');

    // Error Elements
    const nameError = document.getElementById('contactNameError');
    const emailError = document.getElementById('contactEmailError');
    const phoneError = document.getElementById('contactPhoneError');
    const subjectError = document.getElementById('contactSubjectError');
    const messageError = document.getElementById('contactMessageError');

    // Open Contact Modal
    contactBtn.addEventListener('click', () => {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close Contact Modal
    function closeModal() {
        contactModal.style.display = 'none';
        document.body.style.overflow = '';
        contactForm.reset();
        clearErrors();
    }

    closeContactBtn.addEventListener('click', closeModal);
    closeContactBtnAlt.addEventListener('click', closeModal);

    // Close modal when clicking outside
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // Clear error messages
    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
    }

    // Validate form
    function validateForm() {
        let isValid = true;
        clearErrors();

        // Name validation
        if (!contactName.value.trim()) {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (contactName.value.trim().length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!contactEmail.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(contactEmail.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!contactPhone.value.trim()) {
            phoneError.textContent = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(contactPhone.value.trim())) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        // Subject validation
        if (!contactSubject.value.trim()) {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        }

        // Message validation
        if (!contactMessage.value.trim()) {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (contactMessage.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';

            // Insert success message before the form
            contactForm.parentNode.insertBefore(successMessage, contactForm);
            contactForm.style.display = 'none';

            // Close modal after 3 seconds
            setTimeout(() => {
                closeModal();
                // Remove success message and show form again
                successMessage.remove();
                contactForm.style.display = 'block';
            }, 3000);

            // Send form data to server
            const formData = {
                name: contactName.value,
                email: contactEmail.value,
                message: contactMessage.value + (contactSubject.value ? '\nSubject: ' + contactSubject.value : '')
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Contact form submitted successfully:', result);
                } else {
                    const errorData = await response.json();
                    console.error('Contact form error:', errorData);
                }
            } catch (error) {
                console.error('Contact form submission error:', error);
            }
        }
    });

    // Real-time validation
    contactName.addEventListener('input', () => {
        if (contactName.value.trim().length >= 3) {
            nameError.textContent = '';
        }
    });

    contactEmail.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(contactEmail.value.trim())) {
            emailError.textContent = '';
        }
    });

    contactPhone.addEventListener('input', () => {
        const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(contactPhone.value.trim())) {
            phoneError.textContent = '';
        }
    });

    contactSubject.addEventListener('input', () => {
        if (contactSubject.value.trim()) {
            subjectError.textContent = '';
        }
    });

    contactMessage.addEventListener('input', () => {
        if (contactMessage.value.trim().length >= 10) {
            messageError.textContent = '';
        }
    });
}); 