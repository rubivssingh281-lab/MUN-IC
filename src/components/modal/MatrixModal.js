/**
 * MatrixModal Component Class
 * Subclass of Modal dedicated to Country & Portfolio Matrix display
 */
import { Modal } from './Modal.js';
import { events } from '../../core/state/EventBus.js';

export class MatrixModal extends Modal {
    constructor(element = '#matrixModal') {
        super(element);
        this.actionBtn = this.modal ? this.modal.querySelector('.modal-action-btn') : null;

        if (this.actionBtn) {
            this.actionBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Listen for global modal open events
        events.on('modal:open', (data) => {
            if (data.modalId === 'matrixModal') {
                this.open(data.committee);
            }
        });
    }

    /**
     * Optional highlight of a specific committee row
     */
    open(highlightCommittee = null) {
        super.open();
        if (highlightCommittee && highlightCommittee !== 'all') {
            const rows = this.modal.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.querySelector('td strong')?.textContent.trim();
                if (text === highlightCommittee) {
                    row.style.background = 'rgba(212, 175, 55, 0.15)';
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    row.style.background = '';
                }
            });
        }
    }
}
