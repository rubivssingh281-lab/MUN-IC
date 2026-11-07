/**
 * ResourceCard Component Class
 * Renders resource downloads and specialized application track gateways
 */
import { events } from '../../core/state/EventBus.js';

export class ResourceCard {
    /**
     * @param {Object} data - Resource data object
     */
    constructor(data) {
        this.data = data;
    }

    render() {
        const actionBtn = this.data.actionType === 'modal'
            ? (this.data.actionTarget === 'matrix' 
                ? `<button class="btn btn-primary btn-sm view-matrix-btn" data-committee="all">${this.data.actionText}</button>`
                : `<button class="btn btn-primary btn-sm open-brochure-modal">${this.data.actionText}</button>`)
            : `<a href="${this.data.actionTarget}" class="btn btn-primary btn-sm select-form-track" data-type="${this.data.track}">${this.data.actionText}</a>`;

        return `
            <div class="card resource-card">
                <div class="resource-card-header">
                    <div class="resource-icon">
                        <i class="ph ${this.data.icon}"></i>
                    </div>
                    <span class="resource-badge">${this.data.badge}</span>
                </div>
                <h4 class="text-gold">${this.data.title}</h4>
                <p class="resource-subtitle">${this.data.subtitle}</p>
                <p class="resource-desc">${this.data.description}</p>
                ${actionBtn}
            </div>
        `;
    }

    /**
     * Bind click events for track selection & modal opening
     */
    static bindEvents(container = document) {
        container.querySelectorAll('.select-form-track').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const track = this.getAttribute('data-type');
                events.emit('track:selected', { track });
            });
        });

        container.querySelectorAll('.open-brochure-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                events.emit('modal:open', { modalId: 'brochureModal' });
            });
        });
    }
}
