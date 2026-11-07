/**
 * Modal Base Class
 * Handles accessibility, outside click, ESC key, and transition lifecycle
 */
export class Modal {
    /**
     * @param {HTMLElement|string} element
     */
    constructor(element) {
        this.modal = typeof element === 'string' ? document.querySelector(element) : element;
        this.closeBtn = this.modal ? this.modal.querySelector('.modal-close-btn') : null;
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Close on close button click
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Close on overlay backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        if (!this.modal) return;
        this.modal.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}
