/**
 * RegistrationPage Controller Class
 * SAARTHI Model United Nations 2026
 */
import { Navbar } from '../../src/components/navbar/Navbar.js';
import { Footer } from '../../src/components/footer/Footer.js';
import { SmoothScroller } from '../../src/core/scroller/SmoothScroller.js';
import { ScrollAnimator } from '../../src/core/animations/ScrollAnimator.js';
import { RegistrationForm } from '../../src/components/registration-form/RegistrationForm.js';
import { Toast } from '../../src/components/toast/Toast.js';
import { events } from '../../src/core/state/EventBus.js';

export class RegistrationPage {
    constructor() {
        this.scroller = null;
        this.navbar = null;
        this.footer = null;
        this.form = null;
        this.toast = null;
        this.animator = null;

        this.init();
    }

    init() {
        this.scroller = new SmoothScroller();
        this.navbar = new Navbar();
        this.footer = new Footer();
        this.form = new RegistrationForm();
        this.toast = new Toast();

        this.parseQueryParams();
        this.bindTrackChips();
        this.animator = new ScrollAnimator();
    }

    parseQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const track = params.get('track');
        const committee = params.get('committee');

        if (track) {
            events.emit('track:selected', { track });
            this.setActiveChip(track);
        }

        if (committee) {
            events.emit('committee:apply', { committee });
        }
    }

    bindTrackChips() {
        const chips = document.querySelectorAll('.track-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const track = chip.getAttribute('data-track');
                this.setActiveChip(track);
                events.emit('track:selected', { track });
            });
        });
    }

    setActiveChip(track) {
        const chips = document.querySelectorAll('.track-chip');
        chips.forEach(c => {
            if (c.getAttribute('data-track') === track) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RegistrationPage();
});
