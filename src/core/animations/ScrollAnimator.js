/**
 * ScrollAnimator Class
 * Uses IntersectionObserver to trigger smooth entry animations on viewport entrance
 */
export class ScrollAnimator {
    /**
     * @param {string} selector - Selector for animatable elements
     * @param {Object} options - IntersectionObserver options
     */
    constructor(selector = '.card, .section-header, .conference-banner, .profile-card, .registration-container, .about-quote-box', options = {}) {
        this.selector = selector;
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
            ...options
        };

        this.observer = null;
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: make all elements immediately visible if unsupported
            document.querySelectorAll(this.selector).forEach(el => el.classList.add('visible'));
            return;
        }

        this.observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, this.options);

        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll(this.selector);
        elements.forEach(el => {
            el.classList.add('fade-up');
            this.observer.observe(el);
        });
    }

    refresh() {
        if (this.observer) {
            this.observeElements();
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}
