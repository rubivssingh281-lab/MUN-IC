/**
 * AboutPage Controller Class
 * SAARTHI Model United Nations 2026
 */
import { Navbar } from '../../src/components/navbar/Navbar.js';
import { Footer } from '../../src/components/footer/Footer.js';
import { SmoothScroller } from '../../src/core/scroller/SmoothScroller.js';
import { ScrollAnimator } from '../../src/core/animations/ScrollAnimator.js';

export class AboutPage {
    constructor() {
        this.scroller = null;
        this.navbar = null;
        this.footer = null;
        this.animator = null;
        this.init();
    }

    init() {
        this.scroller = new SmoothScroller();
        this.navbar = new Navbar();
        this.footer = new Footer();
        this.animator = new ScrollAnimator();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AboutPage();
});
