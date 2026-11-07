/**
 * CommitteeCard Component Class
 * Generates HTML and binds action listeners for Matrix modals and Apply buttons
 */
import { events } from '../../core/state/EventBus.js';

export class CommitteeCard {
    /**
     * @param {Object} data - Committee item data
     */
    constructor(data) {
        this.data = data;
    }

    render() {
        const badgeHtml = this.data.badge 
            ? `<span class="committee-badge ${this.data.badge.type}">${this.data.badge.text}</span>` 
            : '';

        return `
            <div class="card committee-card" data-committee-id="${this.data.id}">
                ${badgeHtml}
                <div class="committee-icon">
                    <i class="ph ${this.data.icon} text-gold"></i>
                </div>
                <h4 class="text-gold">${this.data.name}</h4>
                <p class="committee-fullname">(${this.data.fullName})</p>
                <p class="committee-desc">${this.data.description}</p>
                <div class="card-actions">
                    <button class="btn btn-primary btn-sm view-matrix-btn" data-committee="${this.data.id}">View Matrix</button>
                    <a href="#registration" class="btn btn-outline btn-sm apply-del-btn" data-comm="${this.data.id}">Apply Now</a>
                </div>
            </div>
        `;
    }

    /**
     * Attach global delegate listeners to committee card actions
     */
    static bindEvents(container = document) {
        container.querySelectorAll('.view-matrix-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const committee = btn.getAttribute('data-committee');
                events.emit('modal:open', { modalId: 'matrixModal', committee });
            });
        });

        container.querySelectorAll('.apply-del-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const comm = this.getAttribute('data-comm');
                events.emit('committee:apply', { committee: comm });
            });
        });
    }
}
