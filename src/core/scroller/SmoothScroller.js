/**
 * SmoothScroller Class
 * Wrapper around Lenis library providing start/stop/scrollTo controls
 */
export class SmoothScroller {
    /**
     * @param {Object} options
     */
    constructor(options = {}) {
        this.options = {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            ...options
        };

        this.lenis = null;
        this.rafId = null;
        this.init();
    }

    init() {
        if (typeof window.Lenis === 'function') {
            this.lenis = new window.Lenis(this.options);

            const raf = (time) => {
                this.lenis.raf(time);
                this.rafId = requestAnimationFrame(raf);
            };
            this.rafId = requestAnimationFrame(raf);
        } else {
            console.warn('[SmoothScroller] Lenis library not detected on window.');
        }
    }

    start() {
        if (this.lenis) this.lenis.start();
    }

    stop() {
        if (this.lenis) this.lenis.stop();
    }

    scrollTo(target, options = {}) {
        if (this.lenis && target) {
            this.lenis.scrollTo(target, options);
        } else if (target) {
            const el = typeof target === 'string' ? document.querySelector(target) : target;
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.lenis) this.lenis.destroy();
    }
}
