/**
 * Hero Component Class
 * Controls hero metadata tokens, banner stats, and smooth CTA scrolls
 */
import { AppConfig } from '../../core/config/AppConfig.js';
import { events } from '../../core/state/EventBus.js';

export class Hero {
    /**
     * @param {HTMLElement|string} element
     */
    constructor(element = '#home') {
        this.hero = typeof element === 'string' ? document.querySelector(element) : element;
        this.init();
    }

    init() {
        if (!this.hero) return;
        this.bindActions();
    }

    bindActions() {
        const ctaButtons = this.hero.querySelectorAll('.hero-actions a[href^="#"]');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = btn.getAttribute('href');
                if (target && target.length > 1) {
                    events.emit('navigate:hash', target);
                }
            });
        });
    }
}
