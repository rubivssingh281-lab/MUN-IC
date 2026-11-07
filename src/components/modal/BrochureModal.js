/**
 * BrochureModal Component Class
 * Subclass of Modal for conference prospectus & PDF download action
 */
import { Modal } from './Modal.js';
import { events } from '../../core/state/EventBus.js';

export class BrochureModal extends Modal {
    constructor(element = '#brochureModal') {
        super(element);
        this.downloadBtn = this.modal ? this.modal.querySelector('#downloadBrochureBtn') : null;
        this.previewBtn = this.modal ? this.modal.querySelector('#previewBrochureBtn') : null;

        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => {
                events.emit('toast:show', 'Downloading SAARTHI 2026 Brochure (PDF)...');
                this.close();
            });
        }

        if (this.previewBtn) {
            this.previewBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Listen for global modal open events
        events.on('modal:open', (data) => {
            if (data.modalId === 'brochureModal') {
                this.open();
            }
        });
    }
}
