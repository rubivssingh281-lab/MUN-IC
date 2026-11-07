/**
 * EventBus Class
 * Publish-Subscribe mediator for decoupled component communication
 */
export class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * Subscribe to an event
     * @param {string} event
     * @param {Function} callback
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} event
     * @param {Function} callback
     */
    off(event, callback) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(callback);
        }
    }

    /**
     * Emit an event to all subscribers
     * @param {string} event
     * @param {*} payload
     */
    emit(event, payload) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(cb => {
                try {
                    cb(payload);
                } catch (err) {
                    console.error(`[EventBus] Error in listener for event "${event}":`, err);
                }
            });
        }
    }
}

// Global default singleton instance
export const events = new EventBus();
