/**
 * RegistrationForm Component Class
 * Manages form tracks, committee auto-selection, validation and submission lifecycle
 */
import { events } from '../../core/state/EventBus.js';

export class RegistrationForm {
    /**
     * @param {HTMLElement|string} element
     */
    constructor(element = '#mainRegistrationForm') {
        this.form = typeof element === 'string' ? document.querySelector(element) : element;
        this.delTypeSelect = this.form ? this.form.querySelector('#delType') : null;
        this.preferredCommitteeSelect = this.form ? this.form.querySelector('#preferredCommittee') : null;

        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Listen for track shortcut selections from Resource Cards
        events.on('track:selected', ({ track }) => {
            if (this.delTypeSelect && track) {
                this.delTypeSelect.value = track;
            }
        });

        // Listen for committee selection from Committee Cards
        events.on('committee:apply', ({ committee }) => {
            if (this.delTypeSelect) this.delTypeSelect.value = 'individual';
            if (this.preferredCommitteeSelect && committee) {
                this.preferredCommitteeSelect.value = committee;
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const fullNameInput = this.form.querySelector('#fullName');
        const fullName = fullNameInput ? fullNameInput.value.trim() : 'Delegate';

        events.emit('toast:show', `Thank you, ${fullName}! Your application has been recorded. Check your email for next steps.`);
        this.form.reset();
    }
}
