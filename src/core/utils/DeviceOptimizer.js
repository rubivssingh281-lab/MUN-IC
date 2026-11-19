/**
 * Device & Performance Optimizer Utility
 * SAARTHI Model United Nations 2026
 *
 * Automatically detects low-end hardware, mobile touch environments,
 * and slow network connections to tune visual fidelity and preserve 60fps goodput.
 */
export const DeviceOptimizer = {
    /**
     * Cache detected hardware characteristics
     */
    state: {
        isTouch: false,
        isLowPower: false,
        isSlowNetwork: false,
        reducedMotion: false,
        initialized: false
    },

    /**
     * Inspect client environment and apply performance baseline classes
     */
    init() {
        if (this.state.initialized || typeof window === 'undefined') return this.state;

        const nav = typeof navigator !== 'undefined' ? navigator : {};
        const win = window;

        // 1. Detect touch / mobile pointer
        const isTouch = Boolean(
            win.matchMedia?.('(pointer: coarse)').matches ||
            'ontouchstart' in win ||
            (nav.maxTouchPoints && nav.maxTouchPoints > 0) ||
            win.innerWidth <= 768
        );

        // 2. Detect reduced motion preference
        const reducedMotion = Boolean(
            win.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        );

        // 3. Detect slow network (Save-Data mode, 2G, 3G)
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        const isSlowNetwork = Boolean(
            connection?.saveData === true ||
            (connection?.effectiveType && /^(slow-2g|2g|3g)$/.test(connection.effectiveType))
        );

        // 4. Detect low-power hardware (<= 4 logical cores, <= 4GB RAM)
        const logicalCores = nav.hardwareConcurrency || 4;
        const memoryGb = nav.deviceMemory || 4;
        const isLowPower = Boolean(
            isTouch && (logicalCores <= 4 || memoryGb <= 4 || isSlowNetwork || reducedMotion)
        );

        this.state = {
            isTouch,
            isLowPower,
            isSlowNetwork,
            reducedMotion,
            initialized: true
        };

        // 5. Apply DOM state classes on root element for high-performance CSS targeting
        const root = document.documentElement;
        if (isTouch) root.classList.add('is-touch-device');
        if (isLowPower) root.classList.add('is-low-power-device');
        if (isSlowNetwork) root.classList.add('is-slow-network');
        if (reducedMotion) root.classList.add('is-reduced-motion');

        return this.state;
    },

    /**
     * Check if smooth scrolling should be bypassed in favor of native momentum scrolling
     */
    shouldBypassVirtualScroll() {
        this.init();
        return this.state.isTouch || this.state.isLowPower || window.innerWidth <= 768;
    },

    /**
     * Check if heavy video playback should be disabled on splash screens
     */
    shouldDisableIntroVideo() {
        this.init();
        return this.state.isTouch || this.state.isLowPower || this.state.isSlowNetwork || this.state.reducedMotion;
    }
};

// Auto-run lightweight detection immediately on script parse
if (typeof document !== 'undefined') {
    DeviceOptimizer.init();
}
