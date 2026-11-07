/**
 * ResourcesPage Controller Class
 * SAARTHI Model United Nations 2026
 */
import { Navbar } from '../../src/components/navbar/Navbar.js';
import { Footer } from '../../src/components/footer/Footer.js';
import { SmoothScroller } from '../../src/core/scroller/SmoothScroller.js';
import { ScrollAnimator } from '../../src/core/animations/ScrollAnimator.js';
import { ResourceCard } from '../../src/components/resource-card/ResourceCard.js';
import { MatrixModal } from '../../src/components/modal/MatrixModal.js';
import { BrochureModal } from '../../src/components/modal/BrochureModal.js';
import { Toast } from '../../src/components/toast/Toast.js';
import { RESOURCES_DATA } from '../../src/core/config/ConferenceData.js';
import { events } from '../../src/core/state/EventBus.js';

export class ResourcesPage {
    constructor() {
        this.scroller = null;
        this.navbar = null;
        this.footer = null;
        this.matrixModal = null;
        this.brochureModal = null;
        this.toast = null;
        this.animator = null;

        this.init();
    }

    init() {
        this.scroller = new SmoothScroller();
        this.navbar = new Navbar();
        this.footer = new Footer();
        this.matrixModal = new MatrixModal();
        this.brochureModal = new BrochureModal();
        this.toast = new Toast();

        this.renderResources();
        this.bindEvents();
        this.animator = new ScrollAnimator();
    }

    renderResources() {
        const grid = document.getElementById('resourcesGrid');
        if (!grid) return;

        grid.innerHTML = RESOURCES_DATA.map(data => {
            const card = new ResourceCard(data);
            return card.render();
        }).join('');

        // Rebind click events
        ResourceCard.bindEvents(grid);

        // Adjust application links to point to the dedicated registration page
        grid.querySelectorAll('.select-form-track').forEach(btn => {
            const track = btn.getAttribute('data-type');
            btn.href = `../registration/index.html?track=${track}`;
        });
    }

    bindEvents() {
        // Modal action button navigate to registration
        const modalRegisterBtn = document.querySelector('.modal-action-btn');
        if (modalRegisterBtn) {
            modalRegisterBtn.href = '../registration/index.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResourcesPage();
});
