/**
 * LeadershipPage Controller Class
 * SAARTHI Model United Nations 2026
 */
import { Navbar } from '../../src/components/navbar/Navbar.js';
import { Footer } from '../../src/components/footer/Footer.js';
import { SmoothScroller } from '../../src/core/scroller/SmoothScroller.js';
import { ScrollAnimator } from '../../src/core/animations/ScrollAnimator.js';
import { ProfileCard } from '../../src/components/profile-card/ProfileCard.js';
import { LEADERSHIP_DATA } from '../../src/core/config/ConferenceData.js';

export class LeadershipPage {
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
        this.renderProfiles();
        this.animator = new ScrollAnimator();
    }

    renderProfiles() {
        const container = document.getElementById('leadershipGrid');
        if (!container) return;

        container.innerHTML = LEADERSHIP_DATA.map(member => {
            const memberWithRelativeImage = {
                ...member,
                image: `../../${member.image}`
            };
            const card = new ProfileCard(memberWithRelativeImage);
            return card.render();
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LeadershipPage();
});
