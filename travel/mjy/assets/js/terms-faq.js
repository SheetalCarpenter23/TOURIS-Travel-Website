// Terms & Conditions and FAQ Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Terms & Conditions Modal
    const termsLink = document.getElementById('termsConditionsLink');
    const termsModal = document.querySelector('.terms-modal');
    const closeTermsBtn = document.querySelector('.close-terms');
    const closeTermsBtnAlt = document.querySelector('.close-terms-btn');

    // FAQ Modal
    const faqLink = document.getElementById('faqLink');
    const faqModal = document.querySelector('.faq-modal');
    const closeFaqBtn = document.querySelector('.close-faq');
    const closeFaqBtnAlt = document.querySelector('.close-faq-btn');

    // Privacy Policy Modal
    const privacyLink = document.getElementById('privacyPolicyLink');
    const privacyModal = document.querySelector('.privacy-modal');
    const closePrivacyBtn = document.querySelector('.close-privacy');
    const closePrivacyBtnAlt = document.querySelector('.close-privacy-btn');

    // Terms & Conditions Functions
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openTermsModal();
        });
    }

    function openTermsModal() {
        if (termsModal) {
            termsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeTermsModal() {
        if (termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    if (closeTermsBtn) {
        closeTermsBtn.addEventListener('click', closeTermsModal);
    }

    if (closeTermsBtnAlt) {
        closeTermsBtnAlt.addEventListener('click', closeTermsModal);
    }

    // Close Terms modal when clicking outside
    if (termsModal) {
        termsModal.addEventListener('click', function(e) {
            if (e.target === termsModal) {
                closeTermsModal();
            }
        });
    }

    // FAQ Functions
    if (faqLink) {
        faqLink.addEventListener('click', function(e) {
            e.preventDefault();
            openFaqModal();
        });
    }

    function openFaqModal() {
        if (faqModal) {
            faqModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFaqModal() {
        if (faqModal) {
            faqModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    if (closeFaqBtn) {
        closeFaqBtn.addEventListener('click', closeFaqModal);
    }

    if (closeFaqBtnAlt) {
        closeFaqBtnAlt.addEventListener('click', closeFaqModal);
    }

    // Close FAQ modal when clicking outside
    if (faqModal) {
        faqModal.addEventListener('click', function(e) {
            if (e.target === faqModal) {
                closeFaqModal();
            }
        });
    }

    // Privacy Policy Functions
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openPrivacyModal();
        });
    }

    function openPrivacyModal() {
        if (privacyModal) {
            privacyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closePrivacyModal() {
        if (privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    if (closePrivacyBtn) {
        closePrivacyBtn.addEventListener('click', closePrivacyModal);
    }

    if (closePrivacyBtnAlt) {
        closePrivacyBtnAlt.addEventListener('click', closePrivacyModal);
    }

    // Close Privacy modal when clicking outside
    if (privacyModal) {
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                closePrivacyModal();
            }
        });
    }

    // Close modals on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTermsModal();
            closeFaqModal();
            closePrivacyModal();
        }
    });

    // FAQ Accordion functionality (optional - for better UX)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer && answer.style.display === 'block';
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Toggle current answer
            if (answer) {
                if (!isOpen) {
                    answer.style.display = 'block';
                    this.classList.add('active');
                }
            }
        });
    });
});

