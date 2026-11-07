/**
 * Navbar Component Class
 * Controls navbar behavior, scroll reactivity, and mobile menu
 */
export class Navbar {
    /**
     * @param {HTMLElement|string} element
     * @param {Object} options
     */
    constructor(element = '.navbar', options = {}) {
        this.navbar = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            scrollThreshold: 50,
            ...options
        };

        if (this.navbar) {
            this.mobileMenuBtn = this.navbar.querySelector('.mobile-menu-btn');
            this.navLinks = this.navbar.querySelector('.nav-links');
            this.init();
        }
    }

    init() {
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        if (this.mobileMenuBtn && this.navLinks) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());

            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }
    }

    handleScroll() {
        if (!this.navbar) return;
        if (window.scrollY > this.options.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        if (!this.navLinks || !this.mobileMenuBtn) return;
        this.navLinks.classList.toggle('active');

        const icon = this.mobileMenuBtn.querySelector('i');
        if (icon) {
            if (this.navLinks.classList.contains('active')) {
                icon.className = 'ph ph-x';
            } else {
                icon.className = 'ph ph-list';
            }
        }
    }

    closeMobileMenu() {
        if (!this.navLinks || !this.mobileMenuBtn) return;
        this.navLinks.classList.remove('active');
        const icon = this.mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'ph ph-list';
    }
}
