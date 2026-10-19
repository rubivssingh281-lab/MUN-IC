document.addEventListener("DOMContentLoaded", () => {
    // Lenis Smooth Scroll Initialization
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });
    
    // Pause lenis while loading
    lenis.stop();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Loading Screen Logic
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            document.body.classList.remove('loading-active');
            
            // Start scrolling again
            lenis.start();
            
            // Wait for slide up animation to finish before removing from DOM
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1200);
        }
    }, 5500);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'ph ph-x';
                } else {
                    icon.className = 'ph ph-list';
                }
            }
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'ph ph-list';
            });
        });
    }

    // Toast Notification Utility
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    function showToast(message) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // Modal Handlers
    const matrixModal = document.getElementById('matrixModal');
    const brochureModal = document.getElementById('brochureModal');
    const closeMatrixModal = document.getElementById('closeMatrixModal');
    const closeBrochureModal = document.getElementById('closeBrochureModal');
    const previewBrochureBtn = document.getElementById('previewBrochureBtn');
    const downloadBrochureBtn = document.getElementById('downloadBrochureBtn');

    function openModal(modal) {
        if (modal) modal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    // Matrix View Trigger
    document.querySelectorAll('.view-matrix-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(matrixModal);
        });
    });

    // Brochure View Trigger
    document.querySelectorAll('.open-brochure-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(brochureModal);
        });
    });

    // Modal Close Buttons
    if (closeMatrixModal) closeMatrixModal.addEventListener('click', () => closeModal(matrixModal));
    if (closeBrochureModal) closeBrochureModal.addEventListener('click', () => closeModal(brochureModal));
    if (previewBrochureBtn) previewBrochureBtn.addEventListener('click', () => closeModal(brochureModal));

    // Close on overlay click
    [matrixModal, brochureModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [matrixModal, brochureModal].forEach(modal => {
                if (modal && modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });

    // Modal action button scroll to registration
    document.querySelectorAll('.modal-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(matrixModal);
        });
    });

    // Brochure Download Simulated Action
    if (downloadBrochureBtn) {
        downloadBrochureBtn.addEventListener('click', () => {
            showToast("Downloading SAARTHI 2026 Brochure (PDF)...");
            closeModal(brochureModal);
        });
    }

    // Form Track Selection Shortcuts
    const delTypeSelect = document.getElementById('delType');
    const preferredCommitteeSelect = document.getElementById('preferredCommittee');

    document.querySelectorAll('.select-form-track').forEach(btn => {
        btn.addEventListener('click', function () {
            const track = this.getAttribute('data-type');
            if (delTypeSelect && track) {
                delTypeSelect.value = track;
            }
        });
    });

    // Committee "Apply Now" buttons
    document.querySelectorAll('.apply-del-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const comm = this.getAttribute('data-comm');
            if (delTypeSelect) delTypeSelect.value = 'individual';
            if (preferredCommitteeSelect && comm) {
                preferredCommitteeSelect.value = comm;
            }
        });
    });

    // Registration Form Submit Handler
    const registrationForm = document.getElementById('mainRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName')?.value || 'Delegate';
            showToast(`Thank you, ${fullName}! Your application has been recorded. Check your email for next steps.`);
            registrationForm.reset();
        });
    }

    // Intersection Observer for scroll animations (fade-up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-up class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.card, .section-header, .conference-banner, .profile-card, .registration-container, .about-quote-box');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });
});
