/**
 * Toast Component Class (Singleton)
 * Shows non-blocking temporary notifications
 */
import { events } from '../../core/state/EventBus.js';

export class Toast {
    /**
     * @param {HTMLElement|string} element
     */
    constructor(element = '#toastNotification') {
        this.toast = typeof element === 'string' ? document.querySelector(element) : element;
        this.messageEl = this.toast ? this.toast.querySelector('#toastMessage') : null;
        this.timeoutId = null;

        this.init();
    }

    init() {
        if (!this.toast) {
            this.createDOM();
        }

        // Listen for global toast events
        events.on('toast:show', (message) => {
            this.show(message);
        });
    }

    createDOM() {
        this.toast = document.createElement('div');
        this.toast.id = 'toastNotification';
        this.toast.className = 'toast-notice';
        this.toast.innerHTML = `
            <i class="ph ph-check-circle"></i>
            <span id="toastMessage"></span>
        `;
        document.body.appendChild(this.toast);
        this.messageEl = this.toast.querySelector('#toastMessage');
    }

    show(message, duration = 3500) {
        if (!this.toast) return;

        if (this.messageEl) {
            this.messageEl.textContent = message;
        }

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.toast.classList.add('show');

        this.timeoutId = setTimeout(() => {
            this.hide();
        }, duration);
    }

    hide() {
        if (!this.toast) return;
        this.toast.classList.remove('show');
    }
}
