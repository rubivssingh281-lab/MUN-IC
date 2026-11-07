/**
 * CommitteesPage Controller Class
 * SAARTHI Model United Nations 2026
 */
import { Navbar } from '../../src/components/navbar/Navbar.js';
import { Footer } from '../../src/components/footer/Footer.js';
import { SmoothScroller } from '../../src/core/scroller/SmoothScroller.js';
import { ScrollAnimator } from '../../src/core/animations/ScrollAnimator.js';
import { CommitteeCard } from '../../src/components/committee-card/CommitteeCard.js';
import { MatrixModal } from '../../src/components/modal/MatrixModal.js';
import { Toast } from '../../src/components/toast/Toast.js';
import { COMMITTEES_DATA } from '../../src/core/config/ConferenceData.js';
import { events } from '../../src/core/state/EventBus.js';

export class CommitteesPage {
    constructor() {
        this.scroller = null;
        this.navbar = null;
        this.footer = null;
        this.matrixModal = null;
        this.toast = null;
        this.animator = null;
        this.currentFilter = 'all';

        this.init();
    }

    init() {
        this.scroller = new SmoothScroller();
        this.navbar = new Navbar();
        this.footer = new Footer();
        this.matrixModal = new MatrixModal();
        this.toast = new Toast();

        this.renderCommittees();
        this.bindFilters();
        this.bindEvents();
        this.animator = new ScrollAnimator();
    }

    renderCommittees(filter = 'all') {
        const grid = document.getElementById('committeesGrid');
        if (!grid) return;

        let filtered = COMMITTEES_DATA;
        if (filter === 'un') {
            filtered = COMMITTEES_DATA.filter(c => ['UNGA', 'WHO', 'UNCSW', 'UNHRC', 'NATO'].includes(c.id));
        } else if (filter === 'indian') {
            filtered = COMMITTEES_DATA.filter(c => ['AIPPM', 'MAHABHARATA'].includes(c.id));
        } else if (filter === 'crisis') {
            filtered = COMMITTEES_DATA.filter(c => c.badge?.type === 'special' || c.id === 'NATO');
        }

        grid.innerHTML = filtered.map(data => {
            const card = new CommitteeCard(data);
            return card.render();
        }).join('');

        // Rebind card button events
        CommitteeCard.bindEvents(grid);

        // Update link for apply button to point to registration page
        grid.querySelectorAll('.apply-del-btn').forEach(btn => {
            const comm = btn.getAttribute('data-comm');
            btn.href = `../registration/index.html?committee=${comm}`;
        });
    }

    bindFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                this.renderCommittees(filter);
            });
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
    new CommitteesPage();
});
