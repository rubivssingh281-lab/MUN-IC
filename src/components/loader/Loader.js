/**
 * Loader Component Class
 * Manages intro splash, delay timers, tap-to-skip, and scroller unlock
 *
 * Automatically sheds heavy video playback and compresses display timing
 * on mobile / low-end hardware.
 */
import { AppConfig } from '../../core/config/AppConfig.js';
import { events } from '../../core/state/EventBus.js';
import { DeviceOptimizer } from '../../core/utils/DeviceOptimizer.js';

export class Loader {
    /**
     * @param {HTMLElement|string} element
     * @param {Object} options
     */
    constructor(element = '#loader', options = {}) {
        this.loader = typeof element === 'string' ? document.querySelector(element) : element;
        this.isMobile = DeviceOptimizer.shouldDisableIntroVideo();

        const configuredDelay = this.isMobile
            ? (AppConfig.loader.autoDismissDelayMobile || 850)
            : AppConfig.loader.autoDismissDelay;

        this.options = {
            delay: configuredDelay,
            fadeOut: AppConfig.loader.fadeOutDuration || 350,
            ...options
        };

        this.timeoutId = null;
        this.failsafeId = null;
        this.isDismissed = false;
        this.init();
    }

    init() {
        if (!this.loader) {
            document.body.classList.remove('loading-active');
            events.emit('loader:dismissed');
            return;
        }

        document.body.classList.add('loading-active');

        // Low-end / mobile optimization: unload heavy video decoder to save RAM & GPU
        const video = this.loader.querySelector('.loader-video');
        if (video) {
            if (this.isMobile) {
                try {
                    video.pause();
                    video.src = '';
                    video.load();
                } catch {
                    // Ignore abort errors
                }
                video.style.display = 'none';
            }
        }

        // Tap-to-skip: allow user to click/tap anywhere to immediately dismiss
        this.loader.addEventListener('click', () => this.dismiss(), { once: true });
        this.loader.addEventListener('touchend', () => this.dismiss(), { once: true });

        // Skip button if present
        const skipBtn = document.getElementById('loaderSkipBtn');
        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.dismiss();
            });
        }

        // Scheduled auto-dismiss
        this.timeoutId = setTimeout(() => {
            this.dismiss();
        }, this.options.delay);

        // Strict failsafe timeout (1.5s on mobile, 4s on desktop)
        const failsafeLimit = this.isMobile ? 1500 : 4000;
        this.failsafeId = setTimeout(() => {
            if (!this.isDismissed) this.dismiss();
        }, failsafeLimit);
    }

    dismiss() {
        if (!this.loader || this.isDismissed) return;
        this.isDismissed = true;

        if (this.timeoutId) clearTimeout(this.timeoutId);
        if (this.failsafeId) clearTimeout(this.failsafeId);

        this.loader.classList.add('hidden');
        document.body.classList.remove('loading-active');

        events.emit('loader:dismissed');

        setTimeout(() => {
            if (this.loader) {
                this.loader.style.display = 'none';
            }
        }, this.options.fadeOut);
    }

    destroy() {
        if (this.timeoutId) clearTimeout(this.timeoutId);
        if (this.failsafeId) clearTimeout(this.failsafeId);
    }
}
