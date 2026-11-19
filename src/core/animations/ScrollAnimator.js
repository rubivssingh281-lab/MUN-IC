/**
 * ScrollAnimator Class
 * Uses IntersectionObserver to trigger smooth entry animations on viewport entrance
 *
 * Automatically bypasses heavy observer logic on low-power devices and honors
 * reduced motion preferences.
 */
import { DeviceOptimizer } from '../utils/DeviceOptimizer.js';

export class ScrollAnimator {
    /**
     * @param {string} selector - Selector for animatable elements
     * @param {Object} options - IntersectionObserver options
     */
    constructor(selector = '.card, .section-header, .conference-banner, .profile-card, .registration-container, .about-quote-box', options = {}) {
        this.selector = selector;
        this.options = {
            root: null,
            rootMargin: '40px 0px',
            threshold: 0.05,
            ...options
        };

        this.observer = null;
        this.init();
    }

    init() {
        const elements = document.querySelectorAll(this.selector);
        if (!elements.length) return;

        // On low-power hardware or reduced motion, reveal elements immediately
        if (DeviceOptimizer.state.isLowPower || DeviceOptimizer.state.reducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach(el => {
                el.classList.add('visible');
            });
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

        elements.forEach(el => {
            el.classList.add('fade-up');
            this.observer.observe(el);
        });
    }

    refresh() {
        if (this.observer) {
            const elements = document.querySelectorAll(this.selector);
            elements.forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('fade-up');
                    this.observer.observe(el);
                }
            });
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}
