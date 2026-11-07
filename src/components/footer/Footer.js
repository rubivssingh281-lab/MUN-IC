/**
 * Footer Component Class
 * Manages copyright, links, and conference metadata updates
 */
import { AppConfig } from '../../core/config/AppConfig.js';

export class Footer {
    /**
     * @param {HTMLElement|string} element
     */
    constructor(element = '.footer') {
        this.footer = typeof element === 'string' ? document.querySelector(element) : element;
        this.init();
    }

    init() {
        if (!this.footer) return;
        this.updateYear();
    }

    updateYear() {
        const bottom = this.footer.querySelector('.footer-bottom p');
        if (bottom && !bottom.textContent.includes(String(AppConfig.year))) {
            bottom.innerHTML = `&copy; ${AppConfig.year} SAARTHI Model United Nations. All Rights Reserved.`;
        }
    }
}
