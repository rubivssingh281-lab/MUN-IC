/**
 * Loader Component Class
 * Manages intro video splash, delay timers, and scroller unlock
 */
import { AppConfig } from '../../core/config/AppConfig.js';
import { events } from '../../core/state/EventBus.js';

export class Loader {
    /**
     * @param {HTMLElement|string} element
     * @param {Object} options
     */
    constructor(element = '#loader', options = {}) {
        this.loader = typeof element === 'string' ? document.querySelector(element) : element;
        this.options = {
            delay: AppConfig.loader.autoDismissDelay,
            fadeOut: AppConfig.loader.fadeOutDuration,
            ...options
        };

        this.timeoutId = null;
        this.init();
    }

    init() {
        if (!this.loader) {
            document.body.classList.remove('loading-active');
            events.emit('loader:dismissed');
            return;
        }

        document.body.classList.add('loading-active');

        this.timeoutId = setTimeout(() => {
            this.dismiss();
        }, this.options.delay);
    }

    dismiss() {
        if (!this.loader) return;
        this.loader.classList.add('hidden');
        document.body.classList.remove('loading-active');

        events.emit('loader:dismissed');

        setTimeout(() => {
            if (this.loader) {
                this.loader.style.display = 'none';
            }
        }, this.options.fadeOut);
    }

    destroy() {
        if (this.timeoutId) clearTimeout(this.timeoutId);
    }
}
