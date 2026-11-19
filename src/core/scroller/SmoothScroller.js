/**
 * SmoothScroller Class
 * Wrapper around Lenis library providing start/stop/scrollTo controls
 *
 * Automatically delegates to browser-native momentum scrolling on mobile /
 * touch / low-power hardware to avoid 60fps rAF CPU thread thrashing.
 */
import { DeviceOptimizer } from '../utils/DeviceOptimizer.js';

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
        this.isMobileOptimized = DeviceOptimizer.shouldBypassVirtualScroll();
        this.init();
    }

    init() {
        // On touch / low-power mobile devices, use 100% native composited scrolling
        if (this.isMobileOptimized) {
            document.documentElement.style.scrollBehavior = 'smooth';
            return;
        }

        if (typeof window.Lenis === 'function') {
            this.lenis = new window.Lenis(this.options);

            const raf = (time) => {
                if (this.lenis) {
                    this.lenis.raf(time);
                    this.rafId = requestAnimationFrame(raf);
                }
            };
            this.rafId = requestAnimationFrame(raf);
        } else {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    start() {
        if (this.lenis) {
            this.lenis.start();
        } else {
            document.body.style.overflow = '';
        }
    }

    stop() {
        if (this.lenis) {
            this.lenis.stop();
        } else {
            document.body.style.overflow = 'hidden';
        }
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
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        if (this.lenis) {
            this.lenis.destroy();
            this.lenis = null;
        }
        document.documentElement.style.scrollBehavior = '';
        document.body.style.overflow = '';
    }
}
