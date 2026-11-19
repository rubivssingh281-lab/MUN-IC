/**
 * Main Application Orchestrator
 * SAARTHI Model United Nations 2026
 */
import { DeviceOptimizer } from './src/core/utils/DeviceOptimizer.js';
import { SmoothScroller } from './src/core/scroller/SmoothScroller.js';
import { ScrollAnimator } from './src/core/animations/ScrollAnimator.js';
import { Navbar } from './src/components/navbar/Navbar.js';
import { Footer } from './src/components/footer/Footer.js';
import { Loader } from './src/components/loader/Loader.js';
import { Hero } from './src/components/hero/Hero.js';
import { CommitteeCard } from './src/components/committee-card/CommitteeCard.js';
import { ResourceCard } from './src/components/resource-card/ResourceCard.js';
import { MatrixModal } from './src/components/modal/MatrixModal.js';
import { BrochureModal } from './src/components/modal/BrochureModal.js';
import { Toast } from './src/components/toast/Toast.js';
import { RegistrationForm } from './src/components/registration-form/RegistrationForm.js';
import { events } from './src/core/state/EventBus.js';

export class App {
    constructor() {
        this.scroller = null;
        this.animator = null;
        this.navbar = null;
        this.footer = null;
        this.loader = null;
        this.hero = null;
        this.matrixModal = null;
        this.brochureModal = null;
        this.toast = null;
        this.form = null;

        this.init();
    }

    init() {
        // 1. Initialize Smooth Scroller
        this.scroller = new SmoothScroller();

        // 2. Initialize Core Components
        this.navbar = new Navbar();
        this.footer = new Footer();
        this.hero = new Hero();
        this.matrixModal = new MatrixModal();
        this.brochureModal = new BrochureModal();
        this.toast = new Toast();
        this.form = new RegistrationForm();

        // 3. Bind Component Events
        CommitteeCard.bindEvents(document);
        ResourceCard.bindEvents(document);

        // 4. Initialize Scroll Animations
        this.animator = new ScrollAnimator();

        // 5. Initialize Loader (stops scroll until dismissed)
        this.loader = new Loader('#loader');
        this.scroller.stop();

        events.on('loader:dismissed', () => {
            this.scroller.start();
        });

        // 6. Handle Smooth Scroll for Anchor Links
        this.bindAnchorLinks();

        // 7. Handle Hash Navigation Events from EventBus
        events.on('navigate:hash', (hash) => {
            this.scrollToHash(hash);
        });
    }

    bindAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                e.preventDefault();
                this.scrollToHash(targetId);
            });
        });
    }

    scrollToHash(hash) {
        const target = document.querySelector(hash);
        if (target && this.scroller) {
            this.scroller.scrollTo(target);
        } else if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.__SAARTHI_APP__ = new App();
});
